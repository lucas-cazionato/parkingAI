export interface ReviewModel {
    achouVaga: 'SIM' | 'NÃO'; // Enum SIM ou NAO
    notaGeral: number;        // Número inteiro (não nulo)
    comentario: string; // String padrão
  }