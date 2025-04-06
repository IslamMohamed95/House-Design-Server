const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

//Initialize S3 Client

exports.s3UploadV3 = async (file) => {
  const s3 = new S3Client({ region: "us-east-1" });
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `upload/${file.originalname}`,
    Body: file.buffer,
  };
  try {
    return await s3.send(new PutObjectCommand(param));
  } catch (err) {
    console.log("Error", err);
  }
};
