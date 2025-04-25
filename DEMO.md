# 360Nurse Demo Guide

This guide provides instructions for running and demonstrating the 360Nurse healthcare platform.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
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

4. Run the demo script:
```bash
npm run presentation
```

This will:
- Seed the database with demo data
- Start the development server

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

Use these accounts to demonstrate different user roles:

| Role | Email | Password |
|------|-------|----------|
| Patient | patient@example.com | patient123 |
| Nurse | nurse@example.com | nurse123 |
| Facility Admin | facilityadmin@example.com | facilityadmin123 |

## Demo Flow

### 1. Patient Experience
1. Log in as a patient
2. View the dashboard with vital signs
3. Generate new vital signs
4. View historical data in the vitals page
5. Create an emergency alert
6. View alerts history

### 2. Nurse Experience
1. Log in as a nurse
2. View assigned patients
3. Check patient vital signs
4. Respond to patient alerts

### 3. Facility Admin Experience
1. Log in as a facility admin
2. View facility dashboard
3. Explore nurse and patient management options

## Key Features to Highlight

- **Real-time Vital Signs Monitoring**: Show how vital signs are updated and displayed
- **Alert System**: Demonstrate the creation and management of alerts
- **Role-Based Access**: Show how different users have different capabilities
- **Responsive Design**: Demonstrate the application on different screen sizes

## Troubleshooting

- If you encounter database connection issues, verify your PostgreSQL connection string
- If login fails, ensure the database was properly seeded with `npm run seed`
- For any other issues, check the console logs for error messages
