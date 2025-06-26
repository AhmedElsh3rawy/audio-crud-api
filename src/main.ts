import type { Request, Response } from "express";
import express from "express";
import { errorHandler, notFound } from "./middleware/errorHandler";
import audioRouter from "./modules/audio/audio.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

app.use("/api/audio", audioRouter);

app.use(notFound);
app.use(errorHandler);

const PORT: number = (process.env.PORT as unknown as number) || 8080;

app.listen(PORT, () => console.log(`[server]: Listening on port ${PORT}`));
