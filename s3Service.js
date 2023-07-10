const { S3 } = require("aws-sdk");

const s3Config = {
  apiVersion: "2006-03-01",
  accessKeyId: "ASIAVOXMTNKRTCAMRV4W",
  secretAccessKey: "K7hQyb3OjQrSSTkI84Z/ZWVRIAVNkMALZMcmVBV5",
  region: "eu-central-1",
};

exports.s3Uploadv2 = async (file) => {
  const s3 = new S3(s3Config);
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `upload/${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};

exports.s3dowloadv2 = async (filename) => {
  const s3 = new S3(s3Config);
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `upload/${filename}`,
    Body: filename.buffer,
  };
  await s3.getObject(param, { stream: true }, (err, data) => {
    res.attachment("download");
    return data.Stream.pipe(res);
  });
};
