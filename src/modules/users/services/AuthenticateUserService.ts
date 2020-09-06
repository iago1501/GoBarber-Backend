import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      // Uma ajuda na hora da mensagem para possíveis falhas de segurança, nunca dizer qual campo específicamente está errado
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password - senha criptografada
    // password - senha não criptografada

    // compare é um método do bcrypt que irá comparar senha cirptografada com não criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      // Uma ajuda na hora da mensagem para possíveis falhas de segurança, nunca dizer qual campo específicamente está errado
      throw new AppError('Incorrect email/password combination', 401);
    }

    // usuário autenticado

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
