import type { Request, Response, NextFunction } from "express";
import express from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

const PORT: number = (process.env.PORT as unknown as number) || 8080;

app.listen(PORT, () => console.log(`[server]: Listening on port ${PORT}`));
