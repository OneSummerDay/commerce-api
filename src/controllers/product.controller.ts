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

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, categoryId } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({
      message: 'Title is required',
    });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({
      message: 'Description must be a string',
    });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      message: 'Price is required',
    });
  }

  if (typeof categoryId !== 'number') {
    return res.status(400).json({
      message: 'Category ID is required and must be a number',
    });
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
    });
  }

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price,
      categoryId,
    },
    include: {
      category: true,
    },
  });

  return res.status(201).json({
    message: 'Product created successfully',
    product,
  });
};