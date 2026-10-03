import React, { useState } from 'react';
import { ACCOMMODATIONS, TRANSLATIONS } from '../data/mockData';
import { Accommodation, CurrencyCode, LanguageCode, ConfirmedReservation } from '../types';
import { formatPrice, calculateNights, generateReservationCode, getWhatsAppButlerLink } from '../utils/formatters';
import { 
  X, 
  Calendar, 
  Users, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CreditCard, 
  Lock, 
  Apple, 
  Download, 
  MessageCircle,
  Clock,
  BedDouble
} from 'lucide-react';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  language: LanguageCode;
  initialData?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    suiteId?: string;
  };
  onReservationConfirmed: (reservation: ConfirmedReservation) => void;
}

const LUXURY_ADD_ONS = [
  {
    id: 'addon-heli',
    title: 'Helitransfer Aeroporto / Sanctuário',
    desc: 'Decolagem privativa direta para o heliponto IFR do hotel em aeronave H130',
    priceEUR: 890
  },
  {
    id: 'addon-champagne',
    title: 'Dom Pérignon & Caviar Imperial na Chegada',
    desc: 'Garrafa vintage resfriada com 50g de caviar e blinis no lounge da vila',
    priceEUR: 290
  },
  {
    id: 'addon-spa-couple',
    title: 'Ritual Íntimo de Vinoterapia para Casal (150m)',
    desc: 'Banho em barrica de carvalho com massagem relaxante na cabine VIP',
    priceEUR: 580
  },
  {
    id: 'addon-eos-dinner',
    title: 'Jantar Degustação 2★ Michelin para Duas Pessoas',
    desc: '9 tempos com harmonização de vinhos raros pelo Head Sommelier no Restaurante Éos',
    priceEUR: 640
  }
];

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  currency,
  language,
  initialData,
  onReservationConfirmed
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  // Dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialData?.checkIn || tomorrow);
  const [checkOut, setCheckOut] = useState(initialData?.checkOut || threeDaysLater);
  const [guests, setGuests] = useState(initialData?.guests || 2);
  const [selectedSuiteId, setSelectedSuiteId] = useState(initialData?.suiteId || ACCOMMODATIONS[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'credit_card' | 'concierge_billing'>('apple_pay');

  // Completed State
  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSuite = ACCOMMODATIONS.find((acc) => acc.id === selectedSuiteId) || ACCOMMODATIONS[0];
  const nights = calculateNights(checkIn, checkOut);

  // Financial calculations
  const roomTotalEUR = selectedSuite.pricePerNightEUR * nights;
  const addOnsTotalEUR = selectedAddOns.reduce((sum, addonId) => {
    const item = LUXURY_ADD_ONS.find((a) => a.id === addonId);
    return sum + (item ? item.priceEUR : 0);
  }, 0);
  const subtotalEUR = roomTotalEUR + addOnsTotalEUR;
  const serviceChargeEUR = Math.round(subtotalEUR * 0.10);
  const grandTotalEUR = subtotalEUR + serviceChargeEUR;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = generateReservationCode();
      const addOnsData = selectedAddOns.map((id) => {
        const item = LUXURY_ADD_ONS.find((a) => a.id === id)!;
        return { name: item.title, priceEUR: item.priceEUR };
      });

      const newReservation: ConfirmedReservation = {
        code,
        accommodation: selectedSuite,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        guests,
        totalEUR: grandTotalEUR,
        guestName: guestName || 'Hóspede Distinto',
        guestEmail: guestEmail || 'hospede.vip@sanctuario.com',
        guestPhone: guestPhone || '+55 11 99999-5555',
        paymentMethod,
        addOns: addOnsData,
        createdAt: new Date().toLocaleDateString('pt-BR')
      };

      setConfirmedReservation(newReservation);
      onReservationConfirmed(newReservation);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-engine-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center animate-fade-in"
    >
      <div className="relative w-full max-w-lg lg:max-w-2xl bg-[#161311] min-h-screen text-[#E8E2D9] shadow-2xl flex flex-col">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#161311]/95 backdrop-blur-md border-b border-[#C5A059]/20">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm tracking-widest text-[#C5A059] uppercase">
              Motor de Reservas 5★
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#25201C] border border-[#C5A059]/30 flex items-center justify-center text-[#D5CDBC] hover:text-[#F3EDE2] transition-colors"
            aria-label="Fechar reserva"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        {confirmedReservation ? (
          /* Confirmation Screen */
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] mb-1">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-medium block mb-1">
                Reserva Confirmada com Sucesso
              </span>
              <h2 className="font-serif text-3xl text-[#F3EDE2] font-normal">
                Bem-vindo ao Sanctuário
              </h2>
              <p className="text-xs text-[#A69C8A] font-light mt-1">
                O seu código de reserva prioritário foi gerado e enviado para seu e-mail.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="w-full bg-[#1F1A17] border border-[#C5A059]/40 rounded-2xl p-5 text-left space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8E8577] block">Localizador</span>
                  <span className="font-mono text-base font-bold text-[#C5A059] tracking-wider">
                    {confirmedReservation.code}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#8E8577] block">Status</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Garantida
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#8E8577] block">Acomodação</span>
                  <span className="font-medium text-[#F3EDE2]">{confirmedReservation.accommodation.title}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E8577] block">Hóspede VIP</span>
                  <span className="font-medium text-[#F3EDE2]">{confirmedReservation.guestName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E8577] block">Check-in</span>
                  <span className="font-medium text-[#F3EDE2]">{confirmedReservation.checkInDate} (24h)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E8577] block">Check-out</span>
                  <span className="font-medium text-[#F3EDE2]">{confirmedReservation.checkOutDate}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C5A059]/20 flex items-center justify-between">
                <span className="text-xs text-[#A69C8A]">Investimento Total ({confirmedReservation.nights} noites)</span>
                <span className="font-serif text-lg font-semibold text-[#C5A059] tabular-nums">
                  {formatPrice(confirmedReservation.totalEUR, currency)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="w-full space-y-2 pt-2">
              <a
                href={getWhatsAppButlerLink(`Olá, Sr. Charles Henderson. Confirmo minha reserva ${confirmedReservation.code} para a ${confirmedReservation.accommodation.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-lg bg-[#C5A059] text-[#161311] font-semibold text-xs uppercase tracking-wider hover:bg-[#D9B46E] flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar com Mordomo Pessoal</span>
              </a>

              <button
                onClick={onClose}
                className="w-full h-10 rounded-lg border border-[#C5A059]/30 text-xs font-medium text-[#D5CDBC] hover:bg-[#25201C] transition-colors"
              >
                Voltar à Experiência
              </button>
            </div>
          </div>
        ) : (
          /* Booking Engine Form */
          <form onSubmit={handleConfirmReservation} className="p-4 sm:p-6 space-y-6 flex-1 pb-24">
            
            {/* Step 1: Dates & Nights */}
            <div className="bg-[#1C1815] border border-[#C5A059]/20 rounded-xl p-4">
              <h2 className="font-serif text-base text-[#F3EDE2] mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>1. Período da Estadia ({nights} {nights === 1 ? 'noite' : 'noites'})</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#27211D] border border-[#C5A059]/25 rounded px-2.5 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#27211D] border border-[#C5A059]/25 rounded px-2.5 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Accommodation Selection */}
            <div className="bg-[#1C1815] border border-[#C5A059]/20 rounded-xl p-4">
              <h2 className="font-serif text-base text-[#F3EDE2] mb-3 flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-[#C5A059]" />
                <span>2. Escolha da Acomodação</span>
              </h2>

              <div className="space-y-2">
                {ACCOMMODATIONS.map((acc) => {
                  const isSelected = selectedSuiteId === acc.id;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => setSelectedSuiteId(acc.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#27211D] border-[#C5A059]'
                          : 'bg-[#1F1A17] border-[#C5A059]/15 hover:border-[#C5A059]/35'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm text-[#F3EDE2] truncate">{acc.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />}
                        </div>
                        <span className="text-[11px] text-[#A69C8A] block font-light">{acc.areaM2} m² · {acc.bedType}</span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-sm font-semibold text-[#C5A059] tabular-nums block">
                          {formatPrice(acc.pricePerNightEUR, currency)}
                        </span>
                        <span className="text-[10px] text-[#8E8577]">{t.perNight}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: VIP Luxury Add-ons */}
            <div className="bg-[#1C1815] border border-[#C5A059]/20 rounded-xl p-4">
              <h2 className="font-serif text-base text-[#F3EDE2] mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>3. Serviços Sob Medida (Opcionais)</span>
              </h2>
              <p className="text-[11px] text-[#8E8577] mb-3">
                Eleve sua experiência antes mesmo de sua chegada à propriedade.
              </p>

              <div className="space-y-2">
                {LUXURY_ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-start justify-between gap-2.5 transition-colors ${
                        isChecked
                          ? 'bg-[#27211D] border-[#C5A059]'
                          : 'bg-[#1F1A17] border-[#C5A059]/15 hover:border-[#C5A059]/30'
                      }`}
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <div
                          className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-[#C5A059] border-[#C5A059] text-[#161311]' : 'border-[#C5A059]/40'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#F3EDE2]">{addon.title}</div>
                          <div className="text-[11px] text-[#8E8577] font-light leading-snug">{addon.desc}</div>
                        </div>
                      </div>

                      <span className="font-serif text-xs font-semibold text-[#C5A059] shrink-0 tabular-nums">
                        +{formatPrice(addon.priceEUR, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Guest Details & Preferences */}
            <div className="bg-[#1C1815] border border-[#C5A059]/20 rounded-xl p-4 space-y-3">
              <h2 className="font-serif text-base text-[#F3EDE2] mb-1">
                4. Dados do Hóspede VIP
              </h2>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Elena Rostova"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#27211D] border border-[#C5A059]/25 rounded px-3 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-1">
                    E-mail Confidencial
                  </label>
                  <input
                    type="email"
                    placeholder="elena@rostova.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#27211D] border border-[#C5A059]/25 rounded px-3 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-1">
                    WhatsApp para Concierge
                  </label>
                  <input
                    type="tel"
                    placeholder="+41 79 123 4567"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#27211D] border border-[#C5A059]/25 rounded px-3 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-1">
                  Preferências Especiais (Dieta, Travesseiro, Horário de Voo)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Almofada de plumas, preferência por late check-in..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#27211D] border border-[#C5A059]/25 rounded px-3 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Step 5: Payment Method */}
            <div className="bg-[#1C1815] border border-[#C5A059]/20 rounded-xl p-4">
              <h2 className="font-serif text-base text-[#F3EDE2] mb-3 flex items-center justify-between">
                <span>5. Meio de Garantia Segura</span>
                <span className="text-[10px] text-[#A69C8A] flex items-center gap-1 font-normal">
                  <Lock className="w-3 h-3 text-[#C5A059]" /> 256-bit SSL
                </span>
              </h2>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#27211D] border-[#C5A059] text-[#F3EDE2]'
                      : 'bg-[#1F1A17] border-[#C5A059]/15 text-[#8E8577]'
                  }`}
                >
                  <div className="font-semibold flex items-center justify-center gap-1">
                    <Apple className="w-3.5 h-3.5" /> Pay
                  </div>
                  <span className="text-[9px] block text-[#A69C8A]">1-Touch</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-[#27211D] border-[#C5A059] text-[#F3EDE2]'
                      : 'bg-[#1F1A17] border-[#C5A059]/15 text-[#8E8577]'
                  }`}
                >
                  <div className="font-semibold flex items-center justify-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" /> Black/Amex
                  </div>
                  <span className="text-[9px] block text-[#A69C8A]">Cartão VIP</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('concierge_billing')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    paymentMethod === 'concierge_billing'
                      ? 'bg-[#27211D] border-[#C5A059] text-[#F3EDE2]'
                      : 'bg-[#1F1A17] border-[#C5A059]/15 text-[#8E8577]'
                  }`}
                >
                  <div className="font-semibold">Concierge</div>
                  <span className="text-[9px] block text-[#A69C8A]">Faturamento</span>
                </button>
              </div>
            </div>

            {/* Live Financial Breakdown */}
            <div className="bg-[#1F1A17] border border-[#C5A059]/30 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-[#A69C8A]">
                <span>{selectedSuite.title} ({nights} {nights === 1 ? 'noite' : 'noites'})</span>
                <span className="tabular-nums font-mono">{formatPrice(roomTotalEUR, currency)}</span>
              </div>

              {addOnsTotalEUR > 0 && (
                <div className="flex items-center justify-between text-[#A69C8A]">
                  <span>Serviços Adicionais Selecionados</span>
                  <span className="tabular-nums font-mono">{formatPrice(addOnsTotalEUR, currency)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#8E8577]">
                <span>Taxa de Serviço e Hospitalidade (10%)</span>
                <span className="tabular-nums font-mono">{formatPrice(serviceChargeEUR, currency)}</span>
              </div>

              <div className="pt-2 border-t border-[#C5A059]/20 flex items-center justify-between text-[#F3EDE2]">
                <div>
                  <span className="font-serif text-base block font-medium">Investimento Total</span>
                  <span className="text-[10px] text-emerald-400">Cancelamento flexível até 48h antes</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#C5A059] tabular-nums">
                  {formatPrice(grandTotalEUR, currency)}
                </span>
              </div>
            </div>

            {/* Bottom Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#C5A059] text-[#161311] font-semibold text-xs tracking-wider uppercase hover:bg-[#D9B46E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/25 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Confirmando com o Mordomo Executivo...</span>
              ) : (
                <>
                  <span>Garantir Reserva Privativa</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
