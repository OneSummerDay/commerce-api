import { Response, Request } from 'express';
import prisma from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.create({
        data: {
            email,
            password,
        }
    });

    return res.status(201).json({
        message: 'User registered successfully',
        user,
    });
};