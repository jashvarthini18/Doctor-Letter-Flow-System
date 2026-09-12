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

**Frontend**

- React

- Vite

- React Router

- Axios

- TipTap

- CSS

**Backend**

- Node.js

- Express.js

- PostgreSQL

- Puppeteer

- AWS SDK for JavaScript

**Storage**

- Amazon S3

- S3 pre-signed URLs for secure PDF access
