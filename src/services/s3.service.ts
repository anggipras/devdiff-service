import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { s3 } from "@/config/aws";

dotenv.config();

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const filename = `${uuidv4()}-${file.originalname}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // allows public access
  };

  const { Location } = await s3.upload(params).promise();

  return { filename, url: Location };
};
