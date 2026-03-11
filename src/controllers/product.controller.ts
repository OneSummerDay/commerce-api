import { Response, Request } from 'express';
import prisma from '../lib/prisma';

export const getProducts = async (res: Response, req: Request) => {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            name: 'desc',
        },
    });

    return res.status(200).json({
        products,
    });
};