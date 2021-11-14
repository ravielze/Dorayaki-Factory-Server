import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StandardError } from '../common/error';
import { CreateResponseError, CreateResponseStandardError } from '../model/dto';

export const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        if (error instanceof StandardError) {
            res.status(error.code).json(CreateResponseStandardError(error));
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(CreateResponseError(error));
        }
        next(error);
    }
    next();
};
