import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({
            message: 'Invalid email',
        });
    };

    if (!password || typeof password !== 'string') {
        return res.status(400).json({
            message: 'Invalid password',
        });
    };

    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long',
        });
    };

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