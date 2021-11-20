import { Request, Response, NextFunction } from 'express';
import { StandardError } from '../common/error';
import { StatusCodes } from '../common/http';
import { MethodFormat } from '../common/string';
import { AccessManager } from '../database/access';
import { CreateResponseError, CreateResponseStandardError } from '../model/dto';

export const ErrorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error) {
        if (error instanceof StandardError) {
            res.returnError(error.code, CreateResponseStandardError(error));
        } else if (error instanceof SyntaxError && error.message.includes('JSON at position')) {
            res.returnError(
                StatusCodes.BAD_REQUEST,
                CreateResponseStandardError(
                    new StandardError(error.message, StatusCodes.BAD_REQUEST)
                )
            );
        } else {
            res.returnError(StatusCodes.INTERNAL_SERVER_ERROR, CreateResponseError(error));
        }
        return;
    }
    next();
};

export const RequestResponseManipulator = (req: Request, res: Response, next: NextFunction) => {
    req.transaction = new AccessManager();
    const start = new Date();
    const base = () => {
        const end = new Date();
        console.info(
            `📦 | ${new Date().toUTCString()} | ${MethodFormat(req.method)} | ${req.path} | ${
                end.getTime() - start.getTime()
            }ms`
        );
        req.transaction.forSafety().then();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.return = (responseBody: any) => {
        res.status(StatusCodes.OK).json(responseBody);
        base();
        return res;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.returnError = (code: StatusCodes, responseBody: any) => {
        res.status(code).json(responseBody);
        base();
        return res;
    };
    next();
};
