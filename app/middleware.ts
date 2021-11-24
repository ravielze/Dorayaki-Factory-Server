import { Request, Response, NextFunction } from 'express';
import { StandardError, ValidationError } from '../common/error';
import { StatusCodes } from '../common/http';
import { HttpStatusFormat, MethodFormat, StringPadding } from '../common/string';
import { AccessManager } from '../database/access';
import { CreateResponseError, CreateResponseStandardError } from '../model/dto';
import { CreateValidationErrorResponse } from '../model/dto/validation';

export const ErrorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error) {
        if (error instanceof StandardError) {
            res.returnError(error.code, CreateResponseStandardError(error));
        } else if (error instanceof ValidationError) {
            res.returnError(
                StatusCodes.UNPROCESSABLE_ENTITY,
                CreateResponseStandardError(
                    new StandardError(
                        CreateValidationErrorResponse(error.validationErrors),
                        StatusCodes.UNPROCESSABLE_ENTITY
                    )
                )
            );
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
        const httpStatus = StringPadding(
            18,
            HttpStatusFormat(req.statusCode !== undefined ? res.statusCode : 100),
            ' '
        );
        const method = StringPadding(12, MethodFormat(req.method), ' ');
        const timeInMS = StringPadding(8, `${end.getTime() - start.getTime()}ms`, ' ');
        const prefix = `📦 | ${new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            second: 'numeric',
        })} | ${httpStatus} | ${method} | ${timeInMS}`;
        console.info(`${prefix} | ${req.path}`);
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
