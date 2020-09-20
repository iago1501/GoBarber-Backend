import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import User from '../../typeorm/entities/User';

// interface SendUser {
//   user: Omit<User, 'password'>;
//   token: string;
// }

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // depois debugar isso aqui, senha removida para não retornar na session
    // delete user.password;
    // class-transformer resolve esse problema

    return response.json({ user: classToClass(user), token });
  }
}
