import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        }
    });

    return res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        },
    });
};