export interface User {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    dataDeNascimento: string;
    cpf: string;
    confirmPassword?: string;
  }