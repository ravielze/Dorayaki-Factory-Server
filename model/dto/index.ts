enum ResponseStatus {
    OK = 'ok',
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

export { ResponseStatus, BaseResponse, CreateResponse };
