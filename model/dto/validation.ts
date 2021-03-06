import { ValidationError } from 'class-validator';

interface ValidationErrorResponse {
    property: string;
    details: {
        [constraint: string]: string;
    };
}

function CreateValidationErrorResponse(errors: ValidationError[]): ValidationErrorResponse[] {
    if (!errors || errors.length == 0) {
        return [];
    }
    const response: ValidationErrorResponse[] = errors.map((raw) => {
        return {
            property: raw.property,
            details: raw.constraints,
        } as ValidationErrorResponse;
    });
    return response;
    //throw new StandardError(response, StatusCodes.UNPROCESSABLE_ENTITY);
}

export { ValidationErrorResponse, CreateValidationErrorResponse };
