import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	console.error(err);
	res.status(err.statusCode || 500).json({
		statusCode,
		message,
		stack: process.env.NODE_ENV === "production" ? "😁" : err.stack,
	});
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	console.log("Route:", req.originalUrl, "NOT FOUND");
	res.status(404).json({
		statusCode: 404,
		message: `${req.originalUrl} Not Found`,
	});
};
