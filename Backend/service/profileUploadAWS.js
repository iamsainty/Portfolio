const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Import the required modules from the v3 SDK
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

dotenv.config();

// Initialize the S3 client from v3
const awsS3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const profilePictureUploadToAWS = async (file) => {
  try {
    const fileContent = fs.readFileSync(file.path);
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExtension}`;

    // Prepare parameters for uploading
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `profile-pictures/${fileName}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    // Use the PutObjectCommand to upload to S3
    const uploadCommand = new PutObjectCommand(uploadParams);
    const uploadResponse = await awsS3.send(uploadCommand);

    return uploadResponse; // Return S3 response containing the secure URL
  } catch (error) {
    console.log("Error uploading to AWS:", error);
    return null;
  }
};

const profilePictureDeleteFromAWS = async (previousURL) => {
  try {
    const previousKey = previousURL.split("/").slice(-2).join("/");

    // Prepare parameters for deleting the object
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: previousKey,
    };

    // Use the DeleteObjectCommand to delete from S3
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await awsS3.send(deleteCommand);

    return true;
  } catch (error) {
    console.log("Error deleting previous profile picture:", error);
    return false;
  }
};

module.exports = { profilePictureUploadToAWS, profilePictureDeleteFromAWS };