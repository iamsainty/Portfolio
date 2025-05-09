import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function blogCoverUpload(file, permalink) {
  try {
    const fileName = `blog-cover/${permalink}.png`;

    const arrayBuffer = await file.arrayBuffer();
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileName,
      Body: arrayBuffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(params));

    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;

    return imageUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function uploadUserProfilePicture(file, name, email) {
  try {
    const fileName = `profile-pictures/${name}-${email}-${Date.now()}.jpg`;
    const arrayBuffer = await file.arrayBuffer();
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileName,
      Body: arrayBuffer,
      ContentType: file.type,
    };
    await s3.send(new PutObjectCommand(params));
    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
    return imageUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
