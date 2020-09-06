// Sobrescrevendo tipagens de bibliotecas de terceiros
// adicionando informações
// @override

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
