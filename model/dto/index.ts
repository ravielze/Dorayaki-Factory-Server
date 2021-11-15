import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

enum ResponseStatus {
    OK = 'ok',
    UNAUTHORIZED = 'unauthorized',
    ERROR = 'error',
}

interface BaseResponse {
    status_code: ResponseStatus;
    data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreateResponse(status: ResponseStatus, data: any): BaseResponse {
    return {
        status_code: status,
        data: data,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreateResponseError(error: any) {
    const response: BaseResponse = {
        status_code: ResponseStatus.ERROR,
        data: {
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        },
    };
    if (error instanceof Error) {
        response.data.details = error.message;
    } else {
        response.data.details = error;
    }
    return response;
}

function CreateResponseStandardError(error: StandardError) {
    return {
        status_code: ResponseStatus.ERROR,
        data: {
            code: error.code,
            details: error.details,
        },
    };
}

export {
    ResponseStatus,
    BaseResponse,
    CreateResponse,
    CreateResponseError,
    CreateResponseStandardError,
};
