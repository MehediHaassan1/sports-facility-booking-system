import { Response } from "express";

type TResponse<T> = {
    status: number,
    message: string,
    success: boolean,
    data: T
}

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
    res.status(payload.status).json({
        success: payload.success,
        status: payload.status,
        message: payload.message,
        data: payload.data,
    })

}

export default sendResponse;