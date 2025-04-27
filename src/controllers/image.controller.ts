import { Request, Response, NextFunction } from "express";
import { uploadFileToS3 } from "@/services/s3.service";
import { ImageModel } from "@/models/image.model";

export const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { file } = req;

    if (!file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    // Upload file to S3
    const { filename, url } = await uploadFileToS3(file);

    // Save image metadata to MongoDB
    const newImage = await ImageModel.create({
      filename,
      url,
      uploadDate: new Date(),
    });

    res.status(201).json({
      message: "Image uploaded successfully.",
      data: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    next(error);
  }
};

export const getListImagesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const images = await ImageModel.find().sort({ uploadDate: -1 });
    // images is an array of { filename, url, uploadDate }
    res.status(200).json({ data: images });
  } catch (err) {
    next(err);
  }
};
