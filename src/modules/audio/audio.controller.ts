import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";

// TODO: add DB and some fields
export const createAudio = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const files = req.files as {
			audio?: Express.Multer.File[];
			image?: Express.Multer.File[];
		};

		if (!files.audio || !files.image) {
			return res.status(400).json({ error: "Audio and image are required" });
		}
		console.log(files);
		res.status(200).json({ message: "success", files });
	},
);
