import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const serverApiKey = process.env.GEMINI_API_KEY;

  if (!serverApiKey) {
    res.status(500).json({ error: "Server misconfiguration: Missing API key" });
    return;
  }

  // Proceed without checking for a client key
  next();
};
