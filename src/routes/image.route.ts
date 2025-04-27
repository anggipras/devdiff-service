import { Router } from "express";
import { upload } from "@/utils/multer";
import { uploadImageController } from "@/controllers/image.controller";

const router = Router();

router.post("/upload", upload.single("image"), uploadImageController);

export default router;
