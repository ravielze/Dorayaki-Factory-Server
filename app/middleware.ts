import { Request, Response, NextFunction } from 'express';
import { StandardError } from '../common/error';
import { StatusCodes } from '../common/http';
import { MethodFormat } from '../common/string';
import { CreateResponseError, CreateResponseStandardError } from '../model/dto';

export const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        if (error instanceof StandardError) {
            res.status(error.code).json(CreateResponseStandardError(error));
        } else if (error instanceof SyntaxError && error.message.includes('JSON at position')) {
            res.status(StatusCodes.BAD_REQUEST).json(
                CreateResponseStandardError(
                    new StandardError(error.message, StatusCodes.BAD_REQUEST)
                )
            );
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(CreateResponseError(error));
        }
        return;
    }
    next();
};

export const RequestLogger = async (req: Request, res: Response, next: NextFunction) => {
    console.info(`📦 | ${new Date().toUTCString()} | ${MethodFormat(req.method)} | ${req.path}`);
    next();
};
