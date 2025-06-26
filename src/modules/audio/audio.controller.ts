import type { Request, Response, NextFunction } from "express";
import type { CreateAudioBody } from "./audio.type";
import path from "node:path";
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
		const audioFileName = path.basename(files.audio[0].path);
		const imageFileName = path.basename(files.image[0].path);

		const newAudio = new Audio({
			...data,
			duration,
			fileUrl: `/audios/${audioFileName}`, // Store relative path
			coverImage: `/images/${imageFileName}`, // Store relative path
		});
		await newAudio.save();
		res.status(200).json({ message: "success", data: newAudio });
	},
);

export const getAll = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const data = await Audio.find({});
		res.status(200).json({ message: "success", data });
	},
);

export const getAudioById = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const data = await Audio.findOne({ _id: id });
		res.status(200).json({ message: "success", data });
	},
);

export const getAudioBytitle = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const title = req.params.title;
		const data = await Audio.findOne({ title: title });
		res.status(200).json({ message: "success", data });
	},
);
