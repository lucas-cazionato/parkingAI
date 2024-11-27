export interface ReviewModel {
    achouVaga: 'SIM' | 'NAO'; // Enum SIM ou NAO
    notaGeral: number;        // Número inteiro (não nulo)
    comentario: string; // String padrão
  }