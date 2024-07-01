import { NextFunction, Request, Response } from "express";
import config from "../config";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let status = error.status || 500;
    let message = error.message || 'Something went wrong';

    return res.status(status).json({
        success: false,
        status: status,
        message,
        error,
        stack: config.NODE_ENV === 'development ' ? error.stack : '',
    })
}


export default globalErrorHandler;