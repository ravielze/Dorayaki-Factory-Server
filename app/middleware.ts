import { Request, Response, NextFunction } from 'express';
import { StandardError } from '../common/error';
import { StatusCodes } from '../common/http';
import { CreateResponseError, CreateResponseStandardError } from '../model/dto';

export const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        if (error instanceof StandardError) {
            res.status(error.code).json(CreateResponseStandardError(error));
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(CreateResponseError(error));
        }
        return;
    }
    next();
};
