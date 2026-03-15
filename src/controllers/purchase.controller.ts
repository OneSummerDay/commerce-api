import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createPurchase = async (req: Request, res: Response) => {
  const { items } = req.body;

  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: 'Items are required and must be a non-empty array',
    });
  }

  for (const item of items) {
    if (typeof item.productId !== 'number') {
      return res.status(400).json({
        message: 'Each item must contain a valid productId',
      });
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({
        message: 'Each item must contain a positive quantity',
      });
    }
  }

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  if (products.length !== productIds.length) {
    return res.status(404).json({
      message: 'One or more products were not found',
    });
  }

  const productMap = new Map(products.map((product) => [product.id, product]));

  let totalAmount = 0;

  const purchaseItemsData = items.map((item) => {
    const product = productMap.get(item.productId)!;
    const price = product.price;
    const subtotal = price * item.quantity;

    totalAmount += subtotal;

    return {
      productId: product.id,
      quantity: item.quantity,
      price,
      subtotal,
    };
  });

  const purchase = await prisma.purchase.create({
    data: {
      userId: req.user.userId,
      totalAmount,
      items: {
        create: purchaseItemsData,
      },
    },
    include: {
      items: true,
    },
  });

  return res.status(201).json({
    message: 'Purchase created successfully',
    purchase,
  });
};