import { Router } from "express";
import { upload } from "../../config/multer";
import { createAudio } from "./audio.controller";

const router = Router();

router.post(
	"/upload",
	upload.fields([
		{ name: "audio", maxCount: 1 },
		{ name: "image", maxCount: 1 },
	]),
	createAudio,
);

export default router;
