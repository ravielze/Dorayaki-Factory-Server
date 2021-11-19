import { ValidationError } from 'class-validator';
import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

interface ValidationErrorResponse {
    property: string;
    details: {
        [constraint: string]: string;
    };
}

function CreateValidationErrorResponse(errors: ValidationError[]) {
    if (!errors || errors.length == 0) {
        return;
    }
    const response: ValidationErrorResponse[] = errors.map((raw) => {
        return {
            property: raw.property,
            details: raw.constraints,
        } as ValidationErrorResponse;
    });
    throw new StandardError(response, StatusCodes.UNPROCESSABLE_ENTITY);
}

export { ValidationErrorResponse, CreateValidationErrorResponse };
