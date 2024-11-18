export interface User {
    nome: string;
    login: string;
    senha: string;
    telefone: string;
    dataNascimento: string;
    cpf: string;
    confirmPassword?: string;
  }