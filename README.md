# Car Dealer Application

This is a Next.js application that allows users to filter vehicles by type and model year, and view the results on a separate page.

## Features

- Filter vehicles by type and model year
- View vehicle models based on selected criteria
- Responsive design using Tailwind CSS

## Prerequisites

- Node.js (version 18 or later)
- pnpm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Azur4ok/car-dealer-app.git
cd car-dealer-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add the necessary environment variables.

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build, run:

```bash
pnpm build
```

Then, to start the production server:

```bash
pnpm start
```

## Project Structure

- `app/`: Contains the main pages of the application
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configuration

## Technologies Used

- Next.js
- React
- Tailwind CSS
- pnpm (package manager)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.