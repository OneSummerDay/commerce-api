import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '../generated/prisma/client';
import prisma from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      message: 'Email is required and must be a string',
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      message: 'Password is required and must be a string',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long',
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({
        message: 'User with this email already exists',
      });
    }

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      message: 'Email is required and must be a string',
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      message: 'Password is required and must be a string',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    }
  );

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
};