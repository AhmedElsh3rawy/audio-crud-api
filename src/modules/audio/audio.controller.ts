import type { Request, Response, NextFunction } from "express";
import type { CreateAudioBody } from "./audio.type";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { getDuration } from "../../utils/duration";
import Audio from "./audio.model";

export const createAudio = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const files = req.files as {
			audio?: Express.Multer.File[];
			image?: Express.Multer.File[];
		};

		if (!files.audio || !files.image) {
			return res.status(400).json({ error: "Audio and image are required" });
		}
		const duration = await getDuration(files.audio[0].path);
		const data: CreateAudioBody = req.body as CreateAudioBody;
		const newAudio = new Audio({
			...data,
			duration,
		});
		newAudio.fileUrl = files.audio[0].path;
		newAudio.coverImage = files.image[0].path;
		await newAudio.save();
		res.status(200).json({ message: "success", data: newAudio });
	},
);
