import type { Request, Response, NextFunction } from "express";

export const asyncWrapper = async (fn: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};
};
