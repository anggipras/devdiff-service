import { Router } from "express";
import { upload } from "@/utils/multer";
import {
  getListImagesController,
  uploadImageController,
} from "@/controllers/image.controller";

const router = Router();

router.post("/upload", upload.single("image"), uploadImageController);
router.get("/list", getListImagesController);

export default router;
