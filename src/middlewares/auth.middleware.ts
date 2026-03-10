import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header is missing',
    });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Invalid authorization format',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};