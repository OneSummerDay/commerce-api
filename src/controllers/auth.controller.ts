import { Response, Request } from 'express';

export const register = async (req: Request, res: Response) => {
    return res.status(201).json({
        message: 'User registered successfully',
    });
};