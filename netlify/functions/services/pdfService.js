// const puppeteer = require("puppeteer");

// async function generatePDF(html) {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: [
//             "--no-sandbox",
//             "--disable-setuid-sandbox",
//         ],
//     });

//     try {
//         const page = await browser.newPage();

//         await page.setViewport({
//             width: 794,
//             height: 1123,
//             deviceScaleFactor: 1,
//         });

//         await page.setContent(
//             `
//             <!DOCTYPE html>

//             <html>

//             <head>

//                 <meta charset="UTF-8">

//                 <style>

//                     /* =================================================
//                        A4 PAGE
//                        ================================================= */

//                     @page {
//                         size: A4;
//                         margin: 0;
//                     }

//                     * {
//                         box-sizing: border-box;
//                     }

//                     html,
//                     body {
//                         width: 210mm;
//                         margin: 0;
//                         padding: 0;

//                         background: #ffffff;
//                     }

//                     body {
//                         font-family: Arial, Helvetica, sans-serif;

//                         font-size: 14px;
//                         font-weight: 400;

//                         line-height: 1.7;

//                         color: #1e293b;
//                     }


//                     /* =================================================
//                        LETTER DOCUMENT
//                        ================================================= */

//                     .letter-document {
//                         width: 210mm;

//                         height: 297mm;

//                         margin: 0;
//                         padding: 20mm;

//                         box-sizing: border-box;

//                         background: #ffffff;

//                         font-family: Arial, Helvetica, sans-serif;

//                         font-size: 14px;
//                         font-weight: 400;

//                         line-height: 1.7;

//                         color: #1e293b;

//                         overflow: hidden;
//                     }


//                     /* =================================================
//                        HEADER
//                        ================================================= */

//                     .letter-document .letter-header {
//                         display: flex;

//                         width: 100%;

//                         margin: 0 0 12px 0;
//                         padding: 0;

//                         align-items: flex-start;
//                         justify-content: space-between;

//                         box-sizing: border-box;

//                         break-inside: avoid;
//                         page-break-inside: avoid;
//                     }


//                     /* =================================================
//                        LOGO
//                        ================================================= */

//                     .letter-document .clinic-logo-section {
//                         width: 90px;
//                         min-width: 90px;

//                         margin: 0;
//                         padding: 0;

//                         display: flex;

//                         align-items: flex-start;
//                         justify-content: flex-start;

//                         flex-shrink: 0;
//                     }

//                     .letter-document .clinic-logo-section img,
//                     .letter-document img.clinic-logo,
//                     .letter-document img[alt="Clinic Logo"] {
//                         display: block !important;

//                         width: 90px !important;
//                         height: 90px !important;

//                         min-width: 90px !important;
//                         min-height: 90px !important;

//                         max-width: 90px !important;
//                         max-height: 90px !important;

//                         margin: 0 !important;
//                         padding: 0 !important;

//                         object-fit: contain !important;
//                     }


//                     /* =================================================
//                        CLINIC DETAILS
//                        ================================================= */

//                     .letter-document .clinic-details {
//                         flex: 1;
//                         min-width: 0;

//                         margin: 0;
//                         padding: 3px 0 0 25px;

//                         text-align: right;
//                     }

//                     .letter-document .clinic-name {
//                         margin: 0 0 6px 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 21px !important;
//                         font-weight: 700 !important;

//                         line-height: 1.3 !important;

//                         color: #1e293b !important;

//                         text-align: right !important;
//                     }

//                     .letter-document .clinic-address {
//                         margin: 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 12px !important;
//                         font-weight: 400 !important;

//                         line-height: 1.5 !important;

//                         color: #475569 !important;

//                         text-align: right !important;

//                         // white-space: pre-line !important;
//                     }


//                     /* =================================================
//                        DOCTOR NAME
//                        ================================================= */

//                     .letter-document .doctor-name {
//                         display: block !important;

//                         width: 100% !important;

//                         margin: 8px 0 10px 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 14px !important;
//                         font-weight: 700 !important;

//                         line-height: 1.5 !important;

//                         color: #1e293b !important;

//                         text-align: center !important;

//                         text-transform: none !important;

//                         break-inside: avoid !important;
//                         page-break-inside: avoid !important;
//                     }


//                     /* =================================================
//                        HEADER LINE
//                        ================================================= */

//                     .letter-document .header-line {
//                         display: block !important;

//                         width: 100% !important;
//                         height: 1px !important;

//                         margin: 0 0 20px 0 !important;
//                         padding: 0 !important;

//                         background: #3b82f6 !important;

//                         border: 0 !important;

//                         break-inside: avoid !important;
//                         page-break-inside: avoid !important;
//                         border-radius: 2px;
//                     }


//                     /* =================================================
//                        LETTER TITLE
//                        ALWAYS 14PX + CENTER
//                        ================================================= */

//                     .letter-document .letter-title,
//                     .letter-document h1.letter-title,
//                     .letter-document h1 {
//                         display: block !important;

//                         width: 100% !important;

//                         margin: 0 0 25px 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 14px !important;
//                         font-weight: 700 !important;

//                         line-height: 1.7 !important;

//                         color: #1e293b !important;

//                         text-align: center !important;

//                         text-transform: uppercase !important;

//                         letter-spacing: 0.4px !important;

//                         break-inside: avoid !important;
//                         page-break-inside: avoid !important;
//                     }


//                     /* =================================================
//                        LETTER BODY
//                        ================================================= */

//                     .letter-document .letter-body {
//                         width: 100% !important;

//                         margin: 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 14px !important;
//                         font-weight: 400 !important;

//                         line-height: 1.7 !important;

//                         color: #1e293b !important;

//                         text-align: left !important;
//                     }

//                     .letter-document .letter-body p {
//                         margin: 0 0 16px 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 14px !important;
//                         font-weight: 400 !important;

//                         line-height: 1.7 !important;

//                         color: #1e293b !important;

//                         text-align: left !important;
//                     }

//                     .letter-document .letter-body strong {
//                         font-weight: 700 !important;

//                         color: #1e293b !important;
//                     }


//                     /* =================================================
//                        DATE
//                        ================================================= */

//                     .letter-document .letter-date {
//                         margin: 0 0 16px 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 14px !important;
//                         font-weight: 400 !important;

//                         line-height: 1.7 !important;

//                         color: #1e293b !important;

//                         text-align: left !important;
//                     }


//                     /* =================================================
//                        SIGNATURE - RIGHT
//                        ================================================= */

//                     .letter-document .doctor-signature-section {
//                         width: 220px !important;

//                         margin: 50px 0 0 auto !important;
//                         padding: 0 !important;

//                         text-align: right !important;

//                         break-inside: avoid !important;
//                         page-break-inside: avoid !important;
//                     }

//                     .letter-document .doctor-signature-section img,
//                     .letter-document .doctor-signature,
//                     .letter-document img[alt="Doctor Signature"] {
//                         display: block !important;

//                         width: 130px !important;
//                         height: 55px !important;

//                         min-width: 130px !important;
//                         min-height: 55px !important;

//                         max-width: 130px !important;
//                         max-height: 55px !important;

//                         margin: 0 0 7px auto !important;
//                         padding: 0 !important;

//                         object-fit: contain !important;
//                     }


//                     /* =================================================
//                        DOCTOR NAME BELOW SIGNATURE
//                        ================================================= */

//                     .letter-document .signature-doctor-name {
//                         display: block !important;

//                         width: 100% !important;

//                         margin: 0 !important;
//                         padding: 0 !important;

//                         font-family: Arial, Helvetica, sans-serif !important;

//                         font-size: 13px !important;
//                         font-weight: 700 !important;

//                         line-height: 1.4 !important;

//                         color: #1e293b !important;

//                         text-align: right !important;

//                         text-transform: none !important;

//                         white-space: nowrap;
//                     }


//                     /* =================================================
//                        GENERAL ELEMENT RESET INSIDE LETTER
//                        ================================================= */

//                     .letter-document h1,
//                     .letter-document h2,
//                     .letter-document h3,
//                     .letter-document p {
//                         box-sizing: border-box;
//                     }

//                     .letter-document h1,
//                     .letter-document h2,
//                     .letter-document h3 {
//                         margin-top: 0;
//                     }

//                     .letter-document img {
//                         vertical-align: top;
//                     }


//                     /* =================================================
//                        PREVENT UNWANTED PAGE BREAKS
//                        ================================================= */

//                     .letter-document .letter-header,
//                     .letter-document .doctor-name,
//                     .letter-document .header-line,
//                     .letter-document .letter-title,
//                     .letter-document .letter-date,
//                     .letter-document .doctor-signature-section {
//                         break-inside: avoid !important;
//                         page-break-inside: avoid !important;
//                     }

//                 </style>

//             </head>

//             <body>

//                 ${html}

//             </body>

//             </html>
//             `,
//             {
//                 waitUntil: "networkidle0",
//             }
//         );


//         /* =========================================================
//            NORMALIZE LETTER TITLE AFTER HTML IS LOADED
//            ========================================================= */

//         await page.evaluate(() => {

//             const letterDocuments =
//                 document.querySelectorAll(".letter-document");

//             letterDocuments.forEach((documentElement) => {

//                 const headings =
//                     documentElement.querySelectorAll("h1");

//                 headings.forEach((heading) => {

//                     heading.classList.add("letter-title");

//                     heading.style.setProperty(
//                         "font-size",
//                         "14px",
//                         "important"
//                     );

//                     heading.style.setProperty(
//                         "text-align",
//                         "center",
//                         "important"
//                     );

//                     heading.style.setProperty(
//                         "font-weight",
//                         "700",
//                         "important"
//                     );

//                     heading.style.setProperty(
//                         "line-height",
//                         "1.7",
//                         "important"
//                     );

//                     heading.style.setProperty(
//                         "margin",
//                         "0 0 25px 0",
//                         "important"
//                     );

//                 });

//             });

//         });


//         /* =========================================================
//            GENERATE EXACT A4 PDF
//            ========================================================= */

//         const pdfBuffer = await page.pdf({

//             format: "A4",

//             printBackground: true,

//             preferCSSPageSize: true,

//             margin: {
//                 top: "0mm",
//                 right: "0mm",
//                 bottom: "0mm",
//                 left: "0mm",
//             },

//         });

//         return pdfBuffer;

//     } finally {

//         await browser.close();

//     }
// }

// module.exports = {
//     generatePDF,
// };

// netlify/functions/services/pdfService.js

// CHANGE 1: Use puppeteer-core and the serverless-compatible chromium
// const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function generatePDF(html) {
    // CHANGE 2: Launch using the serverless chromium executable and args
    const puppeteerModule = await import("puppeteer-core");
    const puppeteer = puppeteerModule.default || puppeteerModule;
    
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });

    try {
        const page = await browser.newPage();

        // YOUR EXACT VIEWPORT SETTINGS
        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 1,
        });

        // YOUR EXACT HTML & CSS TEMPLATE
        await page.setContent(
            `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    /* =================================================
                       A4 PAGE
                       ================================================= */
                    @page { size: A4; margin: 0; }
                    * { box-sizing: border-box; }
                    html, body { width: 210mm; margin: 0; padding: 0; background: #ffffff; }
                    body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.7; color: #1e293b; }

                    /* =================================================
                       LETTER DOCUMENT
                       ================================================= */
                    .letter-document { width: 210mm; height: 297mm; margin: 0; padding: 20mm; box-sizing: border-box; background: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.7; color: #1e293b; overflow: hidden; }

                    /* =================================================
                       HEADER
                       ================================================= */
                    .letter-document .letter-header { display: flex; width: 100%; margin: 0 0 12px 0; padding: 0; align-items: flex-start; justify-content: space-between; box-sizing: border-box; break-inside: avoid; page-break-inside: avoid; }

                    /* =================================================
                       LOGO
                       ================================================= */
                    .letter-document .clinic-logo-section { width: 90px; min-width: 90px; margin: 0; padding: 0; display: flex; align-items: flex-start; justify-content: flex-start; flex-shrink: 0; }
                    .letter-document .clinic-logo-section img, .letter-document img.clinic-logo, .letter-document img[alt="Clinic Logo"] { display: block !important; width: 90px !important; height: 90px !important; min-width: 90px !important; min-height: 90px !important; max-width: 90px !important; max-height: 90px !important; margin: 0 !important; padding: 0 !important; object-fit: contain !important; }

                    /* =================================================
                       CLINIC DETAILS
                       ================================================= */
                    .letter-document .clinic-details { flex: 1; min-width: 0; margin: 0; padding: 3px 0 0 25px; text-align: right; }
                    .letter-document .clinic-name { margin: 0 0 6px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 21px !important; font-weight: 700 !important; line-height: 1.3 !important; color: #1e293b !important; text-align: right !important; }
                    .letter-document .clinic-address { margin: 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 12px !important; font-weight: 400 !important; line-height: 1.5 !important; color: #475569 !important; text-align: right !important; }

                    /* =================================================
                       DOCTOR NAME
                       ================================================= */
                    .letter-document .doctor-name { display: block !important; width: 100% !important; margin: 8px 0 10px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 14px !important; font-weight: 700 !important; line-height: 1.5 !important; color: #1e293b !important; text-align: center !important; text-transform: none !important; break-inside: avoid !important; page-break-inside: avoid !important; }

                    /* =================================================
                       HEADER LINE
                       ================================================= */
                    .letter-document .header-line { display: block !important; width: 100% !important; height: 1px !important; margin: 0 0 20px 0 !important; padding: 0 !important; background: #3b82f6 !important; border: 0 !important; break-inside: avoid !important; page-break-inside: avoid !important; border-radius: 2px; }

                    /* =================================================
                       LETTER TITLE
                       ================================================= */
                    .letter-document .letter-title, .letter-document h1.letter-title, .letter-document h1 { display: block !important; width: 100% !important; margin: 0 0 25px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 14px !important; font-weight: 700 !important; line-height: 1.7 !important; color: #1e293b !important; text-align: center !important; text-transform: uppercase !important; letter-spacing: 0.4px !important; break-inside: avoid !important; page-break-inside: avoid !important; }

                    /* =================================================
                       LETTER BODY
                       ================================================= */
                    .letter-document .letter-body { width: 100% !important; margin: 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 14px !important; font-weight: 400 !important; line-height: 1.7 !important; color: #1e293b !important; text-align: left !important; }
                    .letter-document .letter-body p { margin: 0 0 16px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 14px !important; font-weight: 400 !important; line-height: 1.7 !important; color: #1e293b !important; text-align: left !important; }
                    .letter-document .letter-body strong { font-weight: 700 !important; color: #1e293b !important; }

                    /* =================================================
                       DATE
                       ================================================= */
                    .letter-document .letter-date { margin: 0 0 16px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 14px !important; font-weight: 400 !important; line-height: 1.7 !important; color: #1e293b !important; text-align: left !important; }

                    /* =================================================
                       SIGNATURE - RIGHT
                       ================================================= */
                    .letter-document .doctor-signature-section { width: 220px !important; margin: 50px 0 0 auto !important; padding: 0 !important; text-align: right !important; break-inside: avoid !important; page-break-inside: avoid !important; }
                    .letter-document .doctor-signature-section img, .letter-document .doctor-signature, .letter-document img[alt="Doctor Signature"] { display: block !important; width: 130px !important; height: 55px !important; min-width: 130px !important; min-height: 55px !important; max-width: 130px !important; max-height: 55px !important; margin: 0 0 7px auto !important; padding: 0 !important; object-fit: contain !important; }

                    /* =================================================
                       DOCTOR NAME BELOW SIGNATURE
                       ================================================= */
                    .letter-document .signature-doctor-name { display: block !important; width: 100% !important; margin: 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important; font-size: 13px !important; font-weight: 700 !important; line-height: 1.4 !important; color: #1e293b !important; text-align: right !important; text-transform: none !important; white-space: nowrap; }

                    /* =================================================
                       GENERAL ELEMENT RESET INSIDE LETTER
                       ================================================= */
                    .letter-document h1, .letter-document h2, .letter-document h3, .letter-document p { box-sizing: border-box; }
                    .letter-document h1, .letter-document h2, .letter-document h3 { margin-top: 0; }
                    .letter-document img { vertical-align: top; }

                    /* =================================================
                       PREVENT UNWANTED PAGE BREAKS
                       ================================================= */
                    .letter-document .letter-header, .letter-document .doctor-name, .letter-document .header-line, .letter-document .letter-title, .letter-document .letter-date, .letter-document .doctor-signature-section { break-inside: avoid !important; page-break-inside: avoid !important; }
                </style>
            </head>
            <body>
                ${html}
            </body>
            </html>
            `,
            {
                waitUntil: "networkidle0",
            }
        );

        /* =========================================================
           NORMALIZE LETTER TITLE AFTER HTML IS LOADED
           ========================================================= */
        await page.evaluate(() => {
            const letterDocuments = document.querySelectorAll(".letter-document");
            letterDocuments.forEach((documentElement) => {
                const headings = documentElement.querySelectorAll("h1");
                headings.forEach((heading) => {
                    heading.classList.add("letter-title");
                    heading.style.setProperty("font-size", "14px", "important");
                    heading.style.setProperty("text-align", "center", "important");
                    heading.style.setProperty("font-weight", "700", "important");
                    heading.style.setProperty("line-height", "1.7", "important");
                    heading.style.setProperty("margin", "0 0 25px 0", "important");
                });
            });
        });

        /* =========================================================
           GENERATE EXACT A4 PDF
           ========================================================= */
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "0mm",
                right: "0mm",
                bottom: "0mm",
                left: "0mm",
            },
        });

        return pdfBuffer;

    } finally {
        await browser.close();
    }
}

module.exports = {
    generatePDF,
};