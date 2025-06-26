import fs from "node:fs";
import ffmpeg from "fluent-ffmpeg";

export const getDuration = (filePath: string) => {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(filePath, (err, metadata) => {
			if (err) return reject(err);
			resolve(metadata.format.duration);
		});
	});
};
