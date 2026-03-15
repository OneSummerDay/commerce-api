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

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = Number(req.params.id);

  if (Number.isNaN(commentId)) {
    return res.status(400).json({
      message: 'Comment id must be a number',
    });
  }

  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    return res.status(404).json({
      message: 'Comment not found',
    });
  }

  if (comment.userId !== req.user.userId) {
    return res.status(403).json({
      message: 'You can delete only your own comments',
    });
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return res.status(200).json({
    message: 'Comment deleted successfully',
  });
};