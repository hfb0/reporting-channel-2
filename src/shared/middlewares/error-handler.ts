import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/app-error';

interface ErrorResponse {
  status: string;
  message: string;
}

export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response<ErrorResponse> {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
