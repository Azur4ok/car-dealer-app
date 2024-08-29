'use client'
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString());

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`);
        const data = await response.json();
        setVehicleTypes(data.Results);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };

    fetchVehicleTypes();
  }, []);

  const isNextButtonEnabled = selectedType !== '' && selectedYear !== '';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Car Dealer Filter
        </h1>

        <div className="mb-4">
          <label
            htmlFor="vehicleType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a vehicle type</option>
            <Suspense
              fallback={<div className="text-lg text-center">Loading...</div>}
            >
              {vehicleTypes.map((type) => (
                <option key={type.MakeId} value={type.MakeId}>
                  {type.MakeName}
                </option>
              ))}
            </Suspense>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="modelYear"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Model Year
          </label>
          <select
            id="modelYear"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <Suspense
              fallback={<div className="text-lg text-center">Loading...</div>}
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Suspense>
          </select>
        </div>

        <Link
          href={
            isNextButtonEnabled
              ? `/result/${selectedType}/${selectedYear}`
              : '#'
          }
          passHref
        >
          <button
            disabled={!isNextButtonEnabled}
            className={`w-full py-2 px-4 rounded-md ${
              isNextButtonEnabled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;