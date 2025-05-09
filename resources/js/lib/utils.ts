import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 11); // Garante no máximo 11 dígitos
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

  if (!match) return value;

  let result = '';
  if (match[1]) result += match[1];
  if (match[2]) result += '.' + match[2];
  if (match[3]) result += '.' + match[3];
  if (match[4]) result += '-' + match[4];

  return result;
}

export function maskPhone(value: string): string {
  if (!value) return '';

  // Remove tudo que não for número
  const cleaned = value.replace(/\D/g, '');

  // Aplica a máscara conforme o tamanho
  if (cleaned.length <= 10) {
    // Fixo: (99) 9999-9999
    return cleaned
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  } else {
    // Celular: (99) 99999-9999
    return cleaned
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }
}

export function formatISOToPtBR(isoDateString: string): string {
  if (!isoDateString) return '';

  // Garante que apenas a parte da data (aaaa-mm-dd) será usada
  const [year, month, day] = isoDateString.split('T')[0].split('-');

  return `${day}/${month}/${year}`;
}
