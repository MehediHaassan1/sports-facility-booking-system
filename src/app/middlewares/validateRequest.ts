import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validateData = await schema.parseAsync(req.body);
            req.body = validateData;
            next();
        } catch (error) {
            console.log(error)
        }
    }
}


export default validateRequest;