import { Request, Response, NextFunction } from 'express'
import { ZodObject } from 'zod'

export function validate(schema: ZodObject) {
    return (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        const result = schema.safeParse(req.body);
        
        if (!result.success) {
            return res.status(400).json({ errors: result.error.format() })
        }
        req.body = result.data
        next()
    };
}