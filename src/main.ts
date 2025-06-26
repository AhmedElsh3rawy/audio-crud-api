import type { Request, Response, NextFunction } from "express";
import express from "express";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

app.use(notFound);
app.use(errorHandler);

const PORT: number = (process.env.PORT as unknown as number) || 8080;

app.listen(PORT, () => console.log(`[server]: Listening on port ${PORT}`));
