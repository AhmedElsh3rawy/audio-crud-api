import type { Request, Response, NextFunction } from "express";
import type { CreateAudioBody } from "./audio.type";
import fs from "node:fs";
import path from "node:path";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { getDuration } from "../../utils/duration";
import Audio from "./audio.model";

export const addOne = asyncWrapper(
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
			fileUrl: `/audios/${audioFileName}`,
			coverImage: `/images/${imageFileName}`,
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

export const getById = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const data = await Audio.findOne({ _id: id });
		res.status(200).json({ message: "success", data });
	},
);

export const getBytitle = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const title = req.params.title;
		const data = await Audio.findOne({ title: title });
		res.status(200).json({ message: "success", data });
	},
);

export const streamByTitle = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const audio = await Audio.findOne({ title: req.params.title });
		if (!audio) return next(Error("No audio with that title"));
		const filePath = path.join(__dirname, "../../../uploads", audio.fileUrl);
		const stat = fs.statSync(filePath);
		const fileSize = stat.size;
		const range = req.headers.range;

		if (range) {
			// Handle partial content (streaming)
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

			const chunksize = end - start + 1;
			const file = fs.createReadStream(filePath, { start, end });
			const head = {
				"Content-Range": `bytes ${start}-${end}/${fileSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": chunksize,
				"Content-Type": "audio/mp3",
			};

			res.writeHead(206, head);
			file.pipe(res);
		} else {
			// Send the whole file if no range is specified
			const head = {
				"Content-Length": fileSize,
				"Content-Type": "audio/mp3",
			};
			res.writeHead(200, head);
			fs.createReadStream(filePath).pipe(res);
		}
	},
);
