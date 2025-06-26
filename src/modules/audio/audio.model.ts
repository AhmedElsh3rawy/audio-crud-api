import mongoose, { Schema } from "mongoose";

const audioSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			enum: ["song", "podcast"],
		},
		duration: {
			type: Number,
			required: true,
		},
		fileUrl: {
			type: String,
			required: true,
		},
		coverImage: String,
		createdAt: {
			type: Date,
			default: Date.now,
		},

		artist: String,
		releaseYear: Number,

		host: String,
	},
	{
		timestamps: true,
	},
);

// Text index for search
audioSchema.index({ title: "text", artist: "text", host: "text" });

export default mongoose.model("Audio", audioSchema);
