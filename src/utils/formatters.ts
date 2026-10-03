import { CurrencyCode } from '../types';

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  EUR: { symbol: '€', rate: 1.0, label: 'EUR (€)' },
  USD: { symbol: '$', rate: 1.08, label: 'USD ($)' },
  BRL: { symbol: 'R$', rate: 6.20, label: 'BRL (R$)' }
};

export function formatPrice(amountInEUR: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency] || CURRENCIES.EUR;
  const converted = Math.round(amountInEUR * config.rate);

  if (currency === 'BRL') {
    return `R$ ${converted.toLocaleString('pt-BR')}`;
  } else if (currency === 'USD') {
    return `$${converted.toLocaleString('en-US')}`;
  } else {
    return `€${converted.toLocaleString('de-DE')}`;
  }
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function generateReservationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SANC-2026-${random}`;
}

export function getWhatsAppButlerLink(message?: string): string {
  const defaultText = 'Olá, gostaria de falar com o mordomo do Sanctuário Hotel & Spa 5★ a respeito de uma reserva exclusiva.';
  const encoded = encodeURIComponent(message || defaultText);
  return `https://wa.me/5511999995555?text=${encoded}`;
}
