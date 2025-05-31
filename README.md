PlaySync
A modern sports management system designed to streamline turf bookings for futsal grounds, cricket fields, and more. PlaySync synchronizes physical (walk-in/phone) and app-based bookings in real time, minimizing manual data entry and preventing scheduling conflicts.

Features

Real-Time Booking Sync: Seamlessly integrates physical and app-based bookings using a cloud-based backend.
Staff Portal: Simple web/mobile interface for staff to log walk-in or phone bookings with minimal effort.
Customer App: User-friendly mobile app for booking turfs, viewing availability, and making payments.
QR Code Integration: Generate and scan QR codes for quick booking confirmation and turf access.
Payment Gateway: Supports online payments (e.g., Esewa, Khalti) and cash handling for walk-ins.
Analytics Dashboard: Provides turf managers with insights into booking trends and conflict resolution.

Tech Stack

Frontend: React Native (mobile app), Nextjs (staff web portal)
Backend: Node.js/Express, PostgreSQL
Real-Time Sync: WebSocket, Supabase
Payment Integration: Esewa, Khalti
Hosting: AWS/Heroku
IoT (Optional): Raspberry Pi for QR scanners or smart locks

Installation
Prerequisites

Node.js (>= 16.x)
PostgreSQL (>= 13.x)
Firebase account (for real-time sync)
Git

Setup

Clone the Repository
git clone https://github.com/raphael0002/PlaySync.git
cd PlaySync

Install Dependencies

# Backend

cd backend
npm install

# Frontend (Customer App)

cd ../frontend
npm install

# Staff Portal

cd ../portal
npm install

Configure Environment VariablesCreate a .env file in the backend directory:
DATABASE_URL=postgresql://user:password@localhost:5432/PlaySync
FIREBASE_CONFIG=your-firebase-config-json
PAYMENT_GATEWAY_KEY=your-payment-gateway-key

Run Database Migrations
cd backend
npm run migrate

Start the Application

# Backend

cd backend
npm run start

# Frontend (Customer App)

cd ../frontend/app
npm run start

# Staff Portal

cd ../portal
npm run start

Usage

Customer Booking:

Download the PlaySync app from Google Play or App Store.
Browse available turfs, select a time slot, and pay online.
Receive a QR code for turf access.

Staff Workflow:

Access the staff portal at http://localhost:3000/portal.
Log walk-in/phone bookings using the simplified interface.
Scan customer QR codes to confirm bookings.

Admin Dashboard:

View booking analytics and resolve conflicts at http://localhost:3000/admin.

Contributing
We welcome contributions! Please follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

See CONTRIBUTING.md for details.
Roadmap

Add IoT support for smart locks and gate sensors.
Implement SMS/IVR for phone bookings.
Introduce multi-language support for the app.
Enhance analytics with predictive booking patterns.

License
This project is licensed under the MIT License. See LICENSE for details.
Contact
For support or inquiries, reach out to us at support@PlaySync.com or join our Discord community.

🌟 Star this repository if you find it useful! Follow us on X for updates.
