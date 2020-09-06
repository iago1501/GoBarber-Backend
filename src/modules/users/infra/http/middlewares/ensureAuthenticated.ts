import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token missing', 401);
  }
  // Bearer ${token}

  // const [type, token] = authHeader.split(' ');
  const [, token] = authHeader.split(' ');

  // Try catch pois verify se der erro irá dar um erro em um formato que não entendemos
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // forçando uma variável a ser de um determinado tipo
    // variável é do tipo object | string, não sabe que tem um sub dentro
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
