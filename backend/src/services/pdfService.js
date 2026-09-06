const puppeteer = require("puppeteer");


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
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #000;
                    }

                    h1 {
                        font-size: 28px;
                        margin-bottom: 25px;
                    }

                    h2 {
                        font-size: 22px;
                    }

                    p {
                        margin: 10px 0;
                    }

                </style>

            </head>

            <body>

                ${html}

            </body>

            </html>
            `,
            {
                waitUntil: "networkidle0"
            }
        );


        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true
        });


        return pdfBuffer;


    } finally {

        await browser.close();

    }

}


module.exports = {
    generatePDF
};