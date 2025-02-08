import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from  "fs";
const { readFile } = fs.promises;
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadProjectImageToAWS = async (image, permalink) => {
  try {

    const fileContent = await readFile(image.path);


    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `projects/${permalink}`,
      Body: fileContent,
      ContentType: 'image/png',
    };

    const uploadCommand = new PutObjectCommand(params);
    const uploadResponse = await s3Client.send(uploadCommand);
    console.log(uploadResponse);
    
    return uploadResponse.Location;
  } catch (error) {
    console.error("Error uploading image to AWS:", error); // More informative error logging
    return { message: "Error uploading image", error: error.message }; // Return more error details
  }
};
