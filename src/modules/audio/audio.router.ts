import { Router } from "express";
import { upload } from "../../config/multer";
import {
	addOne,
	getAll,
	getById,
	getBytitle,
	streamByTitle,
} from "./audio.controller";

const router = Router();

router.get("/", getAll);

router.post(
	"/upload",
	upload.fields([
		{ name: "audio", maxCount: 1 },
		{ name: "image", maxCount: 1 },
	]),
	addOne,
);

router.get("/stream/:title", streamByTitle);

router.get("/:id", getById);

router.get("/getbytitle/:title", getBytitle);

export default router;
