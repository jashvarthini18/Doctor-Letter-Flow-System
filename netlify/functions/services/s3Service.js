const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");

const {
    getSignedUrl
} = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
    region: process.env.MY_AWS_REGION,
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
    }
});

async function uploadPDF(pdfBuffer, key) {
    const command = new PutObjectCommand({
        Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
        Key: key,
        Body: pdfBuffer,
        ContentType: "application/pdf"
    });

    await s3.send(command);

    return key;
}

async function getPDFDownloadUrl(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
        Key: key
    });

    const url = await getSignedUrl(s3, command, {
        expiresIn: 3600
    });

    return url;
}
async function getSignedFileUrl(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
        Key: key
    });

    const url = await getSignedUrl(s3, command, {
        expiresIn: 3600
    });

    return url;
}

async function deletePDF(key) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
        Key: key
    });

    await s3.send(command);
}

module.exports = {
    uploadPDF,
    getPDFDownloadUrl,
    getSignedFileUrl,
    deletePDF
};