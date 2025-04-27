import mongoose, { Document, Schema } from "mongoose";

export interface ImgTyp extends Document {
  filename: string;
  url: string;
  uploadDate: Date;
}

const ImageSchema = new Schema<ImgTyp>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export const ImageModel = mongoose.model<ImgTyp>("Image", ImageSchema);
