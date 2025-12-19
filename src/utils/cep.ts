export function normalizeCep(input: string): string {
  return input.replace(/\D/g, '').slice(0, 8);
}

export function isValidCep(cep: string): boolean {
  return /^\d{8}$/.test(cep);
}

export function formatCep(cep: string): string {
  // 01001000 -> 01001-000
  if (!isValidCep(cep)) return cep;
  return `${cep.slice(0, 5)}-${cep.slice(5)}`;
}
