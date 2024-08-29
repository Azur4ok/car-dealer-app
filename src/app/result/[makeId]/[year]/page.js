import { Suspense } from 'react';
import { NavigationButton } from './../../../../components/NavigationButton';

async function fetchVehicleTypes() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const data = await response.json();
  return data.Results;
}

async function fetchVehicleModels(makeId, year) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await response.json();
    return { result: data.Results, err: null };
  } catch (error) {
    return { result: [], err: error };
  }
}

export async function generateStaticParams() {
  const vehicleTypes = await fetchVehicleTypes();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  );

  const params = [];

  for (const vehicleType of vehicleTypes) {
    for (const year of years) {
      params.push({
        makeId: vehicleType.MakeId.toString(),
        year: year,
      });
    }
  }

  return params;
}

function VehicleModels({ models }) {
  if (models.length === 0) {
    return (
      <p className="text-xl text-center text-gray-600">
        No models found for this make and year.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model, index) => (
        <li
          key={`${model.Model_ID}-${index}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl  mb-2">{model.Model_Name}</h2>
          <p className="text-gray-600">Model ID: {model.Model_ID}</p>
        </li>
      ))}
    </ul>
  );
}

export default async function ResultPage({ params }) {
  const { makeId, year } = params;

  const { result, err } = await fetchVehicleModels(makeId, year);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Vehicle Models for{' '}
          {result && result.length > 0 ? result[0]['Make_Name'] : ''} in Year{' '}
          {year}
        </h1>
        <NavigationButton href='/'>
          <button className="my-2 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-md">
            Go home
          </button>
        </NavigationButton>
        <Suspense
          fallback={<div className="text-xl text-center">Loading...</div>}
        >
          {err === null ? (
            <VehicleModels models={result} />
          ) : (
            <p className="text-xl text-center text-gray-600">
              No models found for this make and year.
            </p>
          )}
        </Suspense>
      </div>
    </div>
  );
}
