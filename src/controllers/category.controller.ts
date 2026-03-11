import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma/client';
import prisma from '../lib/prisma';

export const getCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany(
        {
            orderBy: {
                name: 'asc'
            },
        }
    );
    return res.status(200).json({ categories });
}

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({
            message: 'Name is required',
        });
    }

    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });

        return res.status(201).json({
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            return res.status(409).json({
                message: 'Category with this name already exists',
            });
        }

        return res.status(500).json({
            message: 'Internal server error',
        }); 
    }
};