// // const puppeteer = require("puppeteer");

// // async function generatePDF(html) {
// //   const browser = await puppeteer.launch({
// //     headless: true,
// //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
// //   });

// //   try {
// //     const page = await browser.newPage();

// //     await page.setContent(
// //       `
// //             <!DOCTYPE html>

// //             <html>

// //             <head>

// //                 <meta charset="UTF-8">

// //                 <style>

// //                     @page {
// //                         size: A4;
// //                         margin: 20mm;
// //                     }

// //                     body {
// //                         font-family: Arial, sans-serif;
// //                         font-size: 16px;
// //                         line-height: 1.6;
// //                         color: #000;
// //                     }

// //                     h1 {
// //                         font-size: 28px;
// //                         margin-bottom: 25px;
// //                     }

// //                     h2 {
// //                         font-size: 22px;
// //                     }

// //                     p {
// //                         margin: 10px 0;
// //                     }

// //                 </style>

// //             </head>

// //             <body>

// //                 ${html}

// //             </body>

// //             </html>
// //             `,
// //       {
// //         waitUntil: "networkidle0",
// //       },
// //     );

// //     await page.evaluate(async () => {
// //       const images = Array.from(document.images);

// //       await Promise.all(
// //         images.map((img) => {
// //           if (img.complete) {
// //             return Promise.resolve();
// //           }

// //           return new Promise((resolve) => {
// //             img.onload = resolve;
// //             img.onerror = resolve;
// //           });
// //         }),
// //       );
// //     });

// //     const pdfBuffer = await page.pdf({
// //       format: "A4",
// //       printBackground: true,
// //     });

// //     return pdfBuffer;
// //   } finally {
// //     await browser.close();
// //   }
// // }

// // module.exports = {
// //   generatePDF,
// // // };

// // const puppeteer = require("puppeteer");

// // async function generatePDF(html) {
// //   const browser = await puppeteer.launch({
// //     headless: true,
// //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
// //   });

// //   try {
// //     const page = await browser.newPage();

// //     await page.setContent(
// //       `
// //             <!DOCTYPE html>
// //             <html>
// //             <head>
// //                 <meta charset="UTF-8">

// //                 <style>
// //                     @page {
// //                         size: A4;
// //                         margin: 20mm;
// //                     }

// //                     body {
// //                         font-family: Arial, sans-serif;
// //                         font-size: 16px;
// //                         line-height: 1.6;
// //                         color: #000;
// //                     }

// //                     h1 {
// //                         font-size: 28px;
// //                         margin-bottom: 25px;
// //                     }

// //                     h2 {
// //                         font-size: 22px;
// //                     }

// //                     p {
// //                         margin: 10px 0;
// //                     }

// //                     img {
// //                         max-width: 100%;
// //                     }
// //                 </style>
// //             </head>

// //             <body>
// //                 ${html}
// //             </body>
// //             </html>
// //             `,
// //       {
// //         waitUntil: "domcontentloaded",
// //         timeout: 30000,
// //       },
// //     );

// //     // Wait for all images to finish loading
// //     await page.evaluate(async () => {
// //       const images = Array.from(document.images);

// //       await Promise.all(
// //         images.map((img) => {
// //           if (img.complete) {
// //             return Promise.resolve();
// //           }

// //           return new Promise((resolve) => {
// //             img.onload = resolve;
// //             img.onerror = resolve;
// //           });
// //         }),
// //       );
// //     });

// //     // Give the browser a moment to finish rendering
// //     await new Promise((resolve) => setTimeout(resolve, 1000));

// //     const pdfBuffer = await page.pdf({
// //       format: "A4",
// //       printBackground: true,
// //     });

// //     return pdfBuffer;
// //   } finally {
// //     await browser.close();
// //   }
// // }

// // module.exports = {
// //   generatePDF,
// // };



// const puppeteer = require("puppeteer");

// function normalizeLetterImages(html) {
//     return html
//         .replace(
//             /<img\b([^>]*)(?:class=["'][^"']*clinic-logo[^"']*["'][^>]*)>/gi,
//             '<img$1 style="width:90px !important;height:90px !important;max-width:90px !important;max-height:90px !important;object-fit:contain !important;display:block !important;margin:0 auto 15px auto !important;">'
//         )

//         .replace(
//             /<img\b([^>]*)(?:alt=["']Clinic Logo["'][^>]*)>/gi,
//             '<img$1 style="width:90px !important;height:90px !important;max-width:90px !important;max-height:90px !important;object-fit:contain !important;display:block !important;margin:0 auto 15px auto !important;">'
//         )

//         .replace(
//             /<img\b([^>]*)(?:class=["'][^"']*doctor-signature[^"']*["'][^>]*)>/gi,
//             '<img$1 style="width:130px !important;height:55px !important;max-width:130px !important;max-height:55px !important;object-fit:contain !important;display:block !important;margin-top:10px !important;">'
//         )

//         .replace(
//             /<img\b([^>]*)(?:alt=["']Doctor Signature["'][^>]*)>/gi,
//             '<img$1 style="width:130px !important;height:55px !important;max-width:130px !important;max-height:55px !important;object-fit:contain !important;display:block !important;margin-top:10px !important;">'
//         );
// }

// async function generatePDF(html) {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: [
//             "--no-sandbox",
//             "--disable-setuid-sandbox"
//         ]
//     });

//     try {
//         const page = await browser.newPage();
//         const normalizedHtml = normalizeLetterImages(html);

//         await page.setContent(
//             `
//             <!DOCTYPE html>

//             <html>

//             <head>

//                 <meta charset="UTF-8">

//                 <style>

//                     /* ========================================
//                        A4 PAGE
//                     ======================================== */

//                     @page {
//                         size: A4;
//                         margin: 20mm;
//                     }


//                     /* ========================================
//                        BODY
//                     ======================================== */

//                     body {
//                         margin: 0;

//                         font-family: Arial, sans-serif;

//                         font-size: 16px;

//                         line-height: 1.6;

//                         color: #000;

//                         overflow-wrap: break-word;
//                     }


//                     /* ========================================
//                        HEADINGS
//                     ======================================== */

//                     h1 {
//                         font-size: 28px;
//                         margin-top: 0;
//                         margin-bottom: 20px;
//                     }

//                     h2 {
//                         font-size: 22px;
//                     }


//                     /* ========================================
//                        PARAGRAPHS
//                     ======================================== */

//                     p {
//                         font-size: 16px;

//                         line-height: 1.6;

//                         margin: 10px 0;
//                     }

// h1[style*="text-align: center"] {
//     text-align: center;
// }

// p[style*="text-align: center"] {
//     text-align: center;
// }

//                     img {
//                         max-width: 100%;
//                         height: auto;
//                     }

//                     /* Clinic logo */
// img.clinic-logo {
//     display: block !important;

//     width: 90px !important;
//     height: 90px !important;

//     max-width: 90px !important;
//     max-height: 90px !important;

//     object-fit: contain !important;

//     margin: 0 auto 15px auto !important;
// }


// /* Doctor signature */
// img.doctor-signature {
//     display: block !important;

//     width: 130px !important;
//     height: 55px !important;

//     max-width: 130px !important;
//     max-height: 55px !important;

//     object-fit: contain !important;

//     margin-top: 10px !important;
// }


//                     /* ========================================
//                        PREVENT IMAGE SPLITTING
//                     ======================================== */

//                     img {
//                         break-inside: avoid;
//                         page-break-inside: avoid;
//                     }
                        

//                 </style>

//             </head>

//             <body>

//                 ${normalizedHtml}

//             </body>

//             </html>
//             `,
//             {
//                 waitUntil: "networkidle0"
//             }
//         );


//         /* ========================================
//            WAIT FOR IMAGES
//         ======================================== */

//         await page.evaluate(async () => {

//             const images = Array.from(
//                 document.images
//             );

//             await Promise.all(
//                 images.map((img) => {

//                     if (img.complete) {
//                         return Promise.resolve();
//                     }

//                     return new Promise((resolve) => {

//                         img.addEventListener(
//                             "load",
//                             resolve
//                         );

//                         img.addEventListener(
//                             "error",
//                             resolve
//                         );

//                     });

//                 })
//             );

//         });


//         /* ========================================
//            GENERATE PDF
//         ======================================== */

//         const pdfBuffer = await page.pdf({

//             format: "A4",

//             printBackground: true,

//             preferCSSPageSize: true

//         });


//         return pdfBuffer;

//     } finally {

//         await browser.close();

//     }
// }

// module.exports = {
//     generatePDF
// };

const puppeteer = require("puppeteer");


function normalizeLetterImages(html) {

    let result = html;


    // ========================================
    // CLINIC LOGO - CLASS
    // ========================================

    result = result.replace(
        /<img\b([^>]*class=["'][^"']*clinic-logo[^"']*["'][^>]*)>/gi,

        `<img$1
            style="
                width:90px !important;
                height:90px !important;
                max-width:90px !important;
                max-height:90px !important;
                object-fit:contain !important;
                display:block !important;
                margin:0 auto 15px auto !important;
            "
        >`
    );


    // ========================================
    // CLINIC LOGO - ALT
    // ========================================

    result = result.replace(
        /<img\b([^>]*alt=["']Clinic Logo["'][^>]*)>/gi,

        `<img$1
            style="
                width:90px !important;
                height:90px !important;
                max-width:90px !important;
                max-height:90px !important;
                object-fit:contain !important;
                display:block !important;
                margin:0 auto 15px auto !important;
            "
        >`
    );


    // ========================================
    // DOCTOR SIGNATURE - CLASS
    // ========================================

    result = result.replace(
        /<img\b([^>]*class=["'][^"']*doctor-signature[^"']*["'][^>]*)>/gi,

        `<img$1
            style="
                width:130px !important;
                height:55px !important;
                max-width:130px !important;
                max-height:55px !important;
                object-fit:contain !important;
                display:block !important;
                margin-top:10px !important;
            "
        >`
    );


    // ========================================
    // DOCTOR SIGNATURE - ALT
    // ========================================

    result = result.replace(
        /<img\b([^>]*alt=["']Doctor Signature["'][^>]*)>/gi,

        `<img$1
            style="
                width:130px !important;
                height:55px !important;
                max-width:130px !important;
                max-height:55px !important;
                object-fit:contain !important;
                display:block !important;
                margin-top:10px !important;
            "
        >`
    );


    return result;
}



async function generatePDF(html) {

    const browser = await puppeteer.launch({

        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]

    });


    try {

        const page = await browser.newPage();


        // ========================================
        // NORMALIZE IMAGE SIZES
        // ========================================

        const normalizedHtml =
            normalizeLetterImages(html);


        console.log(
            "HTML AFTER IMAGE NORMALIZATION:",
            normalizedHtml
        );


        // ========================================
        // SET PAGE CONTENT
        // ========================================

        await page.setContent(

            `
            <!DOCTYPE html>

            <html>

            <head>

                <meta charset="UTF-8">

                <style>

                    @page {
                        size: A4;
                        margin: 20mm;
                    }


                    body {
                        margin: 0;

                        font-family: Arial, sans-serif;

                        font-size: 16px;

                        line-height: 1.6;

                        color: #000;

                        overflow-wrap: break-word;
                    }


                    h1 {
                        font-size: 28px;

                        margin-top: 0;

                        margin-bottom: 25px;
                    }


                    h2 {
                        font-size: 22px;
                    }


                    p {
                        font-size: 16px;

                        line-height: 1.6;

                        margin: 10px 0;
                    }


                    /* =================================
                       LOGO
                    ================================= */

                    img.clinic-logo,

                    img[alt="Clinic Logo"] {

                        width: 90px !important;

                        height: 90px !important;

                        max-width: 90px !important;

                        max-height: 90px !important;

                        object-fit: contain !important;

                        display: block !important;

                        margin: 0 auto 15px auto !important;
                    }


                    /* =================================
                       SIGNATURE
                    ================================= */

                    img.doctor-signature,

                    img[alt="Doctor Signature"] {

                        width: 130px !important;

                        height: 55px !important;

                        max-width: 130px !important;

                        max-height: 55px !important;

                        object-fit: contain !important;

                        display: block !important;

                        margin-top: 10px !important;
                    }


                    /* =================================
                       OTHER IMAGES
                    ================================= */

                    img {

                        max-width: 100%;

                        height: auto;

                        break-inside: avoid;

                        page-break-inside: avoid;
                    }

                </style>

            </head>


            <body>

                ${normalizedHtml}

            </body>

            </html>
            `,

            {
                waitUntil: "networkidle0"
            }

        );


        // ========================================
        // WAIT FOR IMAGES
        // ========================================

        await page.evaluate(async () => {

            const images =
                Array.from(document.images);


            await Promise.all(

                images.map((img) => {

                    if (img.complete) {

                        return Promise.resolve();

                    }


                    return new Promise((resolve) => {

                        img.addEventListener(
                            "load",
                            resolve
                        );

                        img.addEventListener(
                            "error",
                            resolve
                        );

                    });

                })

            );

        });


        // ========================================
        // GENERATE PDF
        // ========================================

        const pdfBuffer =
            await page.pdf({

                format: "A4",

                printBackground: true,

                preferCSSPageSize: true

            });


        return pdfBuffer;


    } finally {

        await browser.close();

    }

}


module.exports = {
    generatePDF
};