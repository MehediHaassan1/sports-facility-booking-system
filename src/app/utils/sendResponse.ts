import { Response } from "express";

type TResponse<T> = {
    status: number,
    message: string,
    success: boolean,
    data: T
}

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
    res.status(payload.status).json({
        status: payload.status,
        message: payload.message,
        success: payload.success,
        data: payload.data,
    })

}

export default sendResponse;