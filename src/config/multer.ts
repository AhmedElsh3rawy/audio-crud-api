import type { Request, Express } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

type FileFilterCallback = (error?: Error | null, acceptFile?: boolean) => void;

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb) => {
		const baseDir = file.fieldname === "audio" ? "audios" : "images";
		const basePath = path.join(__dirname, `../../uploads/${baseDir}`);
		fs.mkdirSync(basePath, { recursive: true });
		cb(null, basePath);
	},
	filename: (_, file: Express.Multer.File, cb) => {
		const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
		const timestamp = new Date().toISOString().replace(/:/g, "-");
		const ext = path.extname(file.originalname);
		cb(null, `${timestamp}_${uniqueSuffix}${ext}`);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback,
) => {
	if (file.fieldname === "image" && file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else if (
		file.fieldname === "audio" &&
		(file.mimetype.startsWith("audio/") ||
			file.mimetype === "application/octet-stream")
	) {
		cb(null, true);
	} else {
		cb(new Error("Unsupported file format or field"));
	}
};

export const upload = multer({ storage, fileFilter });

export const uploadInMemory = multer({ storage: multer.memoryStorage() });
