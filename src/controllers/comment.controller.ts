import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getProductComments = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (Number.isNaN(productId)) {
    return res.status(400).json({
      message: 'Product id must be a number',
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }

  const comments = await prisma.comment.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({
    comments,
  });
};