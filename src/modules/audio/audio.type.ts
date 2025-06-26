export type CreateAudioBody = {
	title: string;
	type: "song" | "podcast";
	artist?: string;
	year?: number;
	host?: string;
};
