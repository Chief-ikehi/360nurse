# 360Nurse - Healthcare Platform

360Nurse is a nurse-led remote patient monitoring platform designed to deliver quality healthcare in underserved regions, with a core focus on Africa. This project is a demonstration of the platform's capabilities.

## Features

- **Remote Patient Monitoring**: Simulated tracking of patient vitals with automatic alerts
- **Emergency Dispatch System**: GPS-enabled detection of nearest emergency service
- **Facility Console**: Dashboard for hospitals and clinics to manage patients and nurses
- **Nurse Verification**: Process for verifying freelance/home-care nurses

## Technology Stack

- **Frontend**: React, Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/360nurse.git
cd 360nurse
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/360nurse?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:

```bash
npx prisma db push
```

5. Seed the database with initial data:

```bash
npm run seed
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Demo Accounts

The seed script creates the following demo accounts:

- **Admin**: admin@360nurse.com / admin123
- **Patient**: patient@example.com / patient123
- **Nurse**: nurse@example.com / nurse123
- **Facility Admin**: facilityadmin@example.com / facilityadmin123

## Deployment

This project is configured for deployment on Render. The `render.yaml` file contains the configuration for the web service and database.

## Project Structure

- `/src/app`: Next.js App Router pages and API routes
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and services
- `/src/context`: React context providers
- `/prisma`: Database schema and migrations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This project is a demonstration and does not include actual integration with wearable devices or emergency services.
- The simulated vital signs and alerts are generated for demonstration purposes only.
