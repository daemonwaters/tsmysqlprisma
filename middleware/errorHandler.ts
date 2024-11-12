import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.message ?? "Internal server error";
  if (error.stack) {
    console.error(error.stack);
  }

  res.status(statusCode).json({
    statusCode,
    message: errorMessage,
  });
};

export default errorHandler;
