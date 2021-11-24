import { ValidationError as rawValidationError } from 'class-validator';
import { StatusCodes } from './http';

export class StandardError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(public details: any, public code: StatusCodes) {
        super();
        if (code < 400 || code > 599) {
            throw new Error('😱 Non-error HTTP Codes returned');
        }
    }
}

export class ValidationError extends Error {
    constructor(public validationErrors: rawValidationError[]) {
        super();
    }
}
