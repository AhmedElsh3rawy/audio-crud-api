import { Router } from "express";
import { upload } from "../../config/multer";
import {
	createAudio,
	getAll,
	getAudioById,
	getAudioBytitle,
} from "./audio.controller";

const router = Router();

router.get("/", getAll);

router.post(
	"/upload",
	upload.fields([
		{ name: "audio", maxCount: 1 },
		{ name: "image", maxCount: 1 },
	]),
	createAudio,
);

router.get("/:id", getAudioById);

router.get("/:title", getAudioBytitle);

export default router;
