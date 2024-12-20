const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const awsS3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const profilePictureUploadToAWS = async (file) => {
  try {
    const fileContent = fs.readFileSync(file.path);
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `profile-pictures/${fileName}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    const uploadResponse = await awsS3.upload(params).promise();

    return uploadResponse; // Return S3 response containing the secure URL
  } catch (error) {
    console.log("Error uploading to AWS:", error);
    return null;
  }
};

const profilePictureDeleteFromAWS = async (previousURL) => {
  try {
    const previousKey = previousURL.split("/").slice(-2).join("/");
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: previousKey,
    };
    await awsS3.deleteObject(deleteParams).promise();
    return true;
  } catch (error) {
    console.log("Error deleting previous profile picture:", error);
    return false;
  }
};

module.exports = { profilePictureUploadToAWS, profilePictureDeleteFromAWS };
