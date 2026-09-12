**Doctor Letter Flow System**

A web-based doctor letter generation system that allows doctors to access the application, select predefined letter templates, enter patient details, edit letters, preview them, generate professional PDFs, and manage previously generated letters.

Features

- Doctor access using mobile number

- Predefined letter templates

- Dynamic patient-detail forms based on the selected template

- Rich-text letter editor using TipTap

- Professional medical letterhead

      Clinic logo
      
      Clinic name and address
      
      Doctor name
      
      Letter title
      
      Doctor signature

- Letter preview before PDF generation

- A4 PDF generation using Puppeteer

- PDF storage in private Amazon S3

- Secure pre-signed PDF download URLs

- Letter history

- Search, filter, and sort generated letters

- Reuse previously generated letters

- Delete letters

- Responsive editor and preview pages

- PostgreSQL database for application data

**Application Flow**

Doctor Access
      |
      v
Template Selection
      |
      v
Patient Details
      |
      v
Letter Editor
      |
      v
Preview
      |
      v
Confirm & Generate PDF
      |
      +-------> Amazon S3
      |
      v
Letter History

**Technology Stack**

Frontend

React

Vite

React Router

Axios

TipTap

CSS

Backend

Node.js

Express.js

PostgreSQL

Puppeteer

AWS SDK for JavaScript

Storage

Amazon S3

S3 pre-signed URLs for secure PDF access

Project Structure

doctor-letter-flow-system/
|
+-- backend/
|   +-- src/
|   |   +-- services/
|   |   |   +-- pdfService.js
|   |   |   +-- s3Service.js
|   |   +-- database.js
|   |   +-- app.js
|   +-- .env
|   +-- .gitignore
|   +-- package.json
|
+-- frontend/
|   +-- src/
|   |   +-- components/
|   |   |   +-- LetterPreview.jsx
|   |   |   +-- RichTextEditor.jsx
|   |   |   +-- ...
|   |   +-- extensions/
|   |   |   +-- DivExtension.js
|   |   +-- pages/
|   |   |   +-- DoctorAccess.jsx
|   |   |   +-- Templates.jsx
|   |   |   +-- PatientDetails.jsx
|   |   |   +-- LetterEditor.jsx
|   |   |   +-- Preview.jsx
|   |   |   +-- History.jsx
|   |   +-- services/
|   |   |   +-- api.js
|   |   +-- utils/
|   |   |   +-- doctor.js
|   |   +-- App.jsx
|   |   +-- index.css
|   +-- .gitignore
|   +-- package.json
|
+-- README.md

Prerequisites

Install:

Node.js

npm

PostgreSQL

AWS account with an S3 bucket

Verify Node.js and npm:

node --version
npm --version

Make sure PostgreSQL is running before starting the backend.

Database Setup

Create the PostgreSQL database:

CREATE DATABASE "HospitalManagement";

The application stores doctor, template, and generated-letter information in PostgreSQL.

The doctors table includes clinic information such as:

Doctor name

Mobile number

Clinic name

Clinic address

Logo URL

Signature URL

If the clinic address column does not exist:

ALTER TABLE doctors ADD COLUMN clinic_address TEXT;

Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create backend/.env:

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=HospitalManagement
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD

AWS_REGION=ap-southeast-2
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET_NAME=YOUR_S3_BUCKET_NAME

Never commit .env or AWS credentials to Git.

Your .gitignore should contain:

.env

If credentials are accidentally exposed, revoke/rotate them in AWS immediately.

AWS S3 Setup

Create a private S3 bucket for generated PDFs.

Generated files use a structure similar to:

doctors/
└── <doctor_id>/
    └── <letter_type>/
        └── <year>/
            └── <month>/
                └── letter-<unique_id>.pdf

The bucket should remain private. The application generates a pre-signed URL when a doctor needs to download a PDF.

The backend requires appropriate S3 permissions for uploading and reading generated PDFs. Grant only the permissions required by the application.

Start the Backend

From backend:

npm start

Backend:

http://localhost:5000

API base URL:

http://localhost:5000/api

Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Vite will normally provide:

http://localhost:5173

Application Routes

Route

Purpose

/login

Doctor access

/

Template selection

/patient-details

Enter patient information

/editor

Edit the letter

/preview

Preview the letter

/history

View generated letters

Main API Endpoints

Doctor Access

POST /api/doctors/access

Example:

{
  "mobile_number": "9876543210"
}

Templates

GET /api/templates
GET /api/templates/:id

Doctor Profile

GET /api/doctors/:id/profile

Generate PDF

POST /api/letters/generate

Example:

{
  "doctor_id": 1,
  "template_id": 1,
  "patient_name": "Patient Name",
  "letter_type": "Referral Letter",
  "content_html": "<p>Letter content</p>"
}

The backend:

Receives the edited HTML.

Generates an A4 PDF using Puppeteer.

Uploads the PDF to S3.

Stores the letter information in PostgreSQL.

Returns a secure signed download URL.

Letter History

GET /api/letters?doctor_id=1
GET /api/letters/:id
GET /api/letters/:id/download
DELETE /api/letters/:id

Letter Templates

The system supports structured templates including:

Referral Letter

Fields:

Patient name

Consulting doctor

Diagnosis

Date

Thank You Letter

Fields:

Patient name

Consulting doctor

Date

Medical Certificate

Fields:

Patient name

Diagnosis

Duration

Date

More templates can be added through the template records stored in the database.

Letter Editor

The editor uses TipTap and supports rich-text editing such as:

Bold

Italic

Headings

Bullet lists

Numbered lists

Text alignment

Structured HTML content

The letter is displayed in an A4-style editor layout.

Professional Letterhead

Generated letters use a professional layout containing:

+--------------------------------------+
| Logo                 Clinic Name     |
|                      Clinic Address  |
|                                      |
|              Doctor Name             |
|--------------------------------------|
|                                      |
|             LETTER TITLE             |
|                                      |
| Date: dd month year                  |
|                                      |
| Letter content                       |
|                                      |
|                                      |
|                         Signature    |
|                         Doctor Name  |
+--------------------------------------+

The PDF page size is A4:

210 mm × 297 mm

Security

Environment Variables

Database passwords and AWS credentials must be stored in environment variables and never hard-coded.

S3

Keep the bucket private and use pre-signed URLs for PDF downloads.

CORS

During development, the backend can allow the frontend to communicate through CORS. For production, restrict CORS to the actual frontend domain.

Database

Use a dedicated PostgreSQL user with only the permissions required by the application.

Production Secrets

Use hosting-provider environment variables or a secure secrets manager for production credentials.

Running the Complete Application

Terminal 1 — Backend

cd backend
npm install
npm start

Terminal 2 — Frontend

cd frontend
npm install
npm run dev

Then open the frontend URL displayed by Vite.

Typical User Workflow

Doctor opens the application.

Doctor enters their registered mobile number.

Doctor selects a letter template.

Doctor enters the required patient details.

The system creates the letter from the selected template.

Doctor edits the letter.

Doctor previews the letter.

Doctor confirms PDF generation.

Backend generates the PDF.

PDF is uploaded to private S3 storage.

A signed download URL is returned.

Doctor opens/downloads the PDF.

The generated letter becomes available in Letter History.

Development Notes

Keep frontend and backend running separately during development.

PostgreSQL must be running before the backend starts.

AWS configuration must be valid before PDF generation.

If an S3 NoSuchKey error occurs, verify that the S3 object key stored in the database matches the actual object path.

Keep the S3 bucket private.

Never commit .env files or AWS credentials.

Ensure the production environment supports Puppeteer/Chromium.

Production Deployment Checklist

Before deployment:

Set production environment variables.

Use a production PostgreSQL database.

Configure a private S3 bucket.

Configure restricted IAM permissions.

Restrict backend CORS.

Enable HTTPS.

Configure the production frontend API URL.

Verify Puppeteer/Chromium support on the backend host.

Test PDF generation and S3 downloads.

Verify mobile responsiveness.

Rotate development credentials if they were exposed.

Future Improvements

Potential enhancements:

OTP-based doctor authentication

Role-based access control

Patient record integration

Additional customizable templates

PDF branding customization

Audit logs

Automated testing

Application monitoring

Improved authentication and authorization
