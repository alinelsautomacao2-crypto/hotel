import React from 'react';
import { ConfirmedReservation, CurrencyCode, LanguageCode } from '../types';
import { formatPrice, getWhatsAppButlerLink } from '../utils/formatters';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Calendar, 
  Award,
  ChevronRight,
  Sliders
} from 'lucide-react';

interface VipProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  language: LanguageCode;
  reservations: ConfirmedReservation[];
}

export const VipProfileModal: React.FC<VipProfileModalProps> = ({
  isOpen,
  onClose,
  currency,
  language,
  reservations
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vip-profile-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center animate-fade-in"
    >
      <div className="relative w-full max-w-md md:max-w-lg bg-[#161311] min-h-screen text-[#E8E2D9] shadow-2xl p-5 pb-24">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20">
          <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-medium tracking-wider uppercase">
            <Crown className="w-4 h-4" />
            <span>Sanctuário Ambassador Club</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#25201C] border border-[#C5A059]/30 flex items-center justify-center text-[#D5CDBC] hover:text-[#F3EDE2] transition-colors"
            aria-label="Fechar perfil"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Member Card */}
        <div className="my-5 bg-[#1F1A17] border border-[#C5A059]/30 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-[#2A241F] border-2 border-[#C5A059] flex items-center justify-center font-serif text-xl text-[#C5A059] font-bold">
              ER
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">Membro Honorário</span>
              <h2 id="vip-profile-title" className="font-serif text-xl text-[#F3EDE2]">
                Sra. Elena Rostova
              </h2>
              <p className="text-xs text-[#8E8577]">Membro desde 2024 · #SANC-VIP-089</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#C5A059]/15 text-xs">
            <div>
              <span className="text-[10px] text-[#8E8577] block uppercase">Crédito de Spa</span>
              <span className="font-serif text-base text-[#C5A059] font-medium">€600 Disponível</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8E8577] block uppercase">Mordomo Atribuído</span>
              <span className="font-serif text-sm text-[#F3EDE2]">Sr. Charles Henderson</span>
            </div>
          </div>
        </div>

        {/* Exclusive Privileges */}
        <div className="mb-6 space-y-2">
          <h3 className="font-serif text-base text-[#F3EDE2] mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span>Benefícios da Sua Categoria</span>
          </h3>

          <div className="bg-[#1C1815] border border-[#C5A059]/15 rounded-xl p-3 text-xs space-y-2 text-[#D5CDBC] font-light">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Upgrade cortesia de vila mediante disponibilidade no check-in.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Check-in a partir das 08h00 e check-out estendido até às 18h00.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Transfer Maybach cortesia de/para o aeroporto internacional.</span>
            </div>
          </div>
        </div>

        {/* Guest Saved Preferences */}
        <div className="mb-6">
          <h3 className="font-serif text-base text-[#F3EDE2] mb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C5A059]" />
            <span>Preferências de Estadia Salvas</span>
          </h3>

          <div className="bg-[#1C1815] border border-[#C5A059]/15 rounded-xl p-3.5 space-y-2.5 text-xs text-[#E8E2D9]">
            <div className="flex items-center justify-between">
              <span className="text-[#8E8577]">Temperatura da Suíte:</span>
              <span className="font-medium text-[#F3EDE2]">21°C pré-climatizado</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8E8577]">Menu de Travesseiros:</span>
              <span className="font-medium text-[#F3EDE2]">Plumas Húngaras Extra Macio</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8E8577]">Champagne Preferido:</span>
              <span className="font-medium text-[#F3EDE2]">Dom Pérignon Vintage 2013</span>
            </div>
          </div>
        </div>

        {/* Active Reservations */}
        <div className="mb-6">
          <h3 className="font-serif text-base text-[#F3EDE2] mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Suas Reservas ({reservations.length})</span>
          </h3>

          {reservations.length === 0 ? (
            <div className="bg-[#1C1815] border border-[#C5A059]/15 rounded-xl p-4 text-center text-xs text-[#8E8577]">
              Nenhuma reserva ativa no momento. Deseja efetuar uma reserva agora?
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.map((res) => (
                <div
                  key={res.code}
                  className="bg-[#1F1A17] border border-[#C5A059]/25 rounded-xl p-3.5 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C5A059]">{res.code}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">Confirmada</span>
                  </div>
                  <div className="font-serif text-sm text-[#F3EDE2]">{res.accommodation.title}</div>
                  <div className="text-[#8E8577] text-[11px]">
                    {res.checkInDate} até {res.checkOutDate} ({res.nights} {res.nights === 1 ? 'noite' : 'noites'})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Access Link Card */}
        <div className="mb-6 bg-[#1C1815] border border-[#C5A059]/30 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-serif text-[#F3EDE2] font-medium">Link de Acesso Direto</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Web App Ativo</span>
          </div>
          <p className="text-[11px] text-[#A69C8A] font-light">
            Compartilhe ou abra este aplicativo em qualquer smartphone ou navegador:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-ivpiw4zbt7iq27tko4unbb-360517954354.us-east1.run.app'}
              className="flex-1 bg-[#27211D] border border-[#C5A059]/20 rounded px-2.5 py-1 text-[11px] text-[#C5A059] font-mono select-all truncate"
            />
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="px-3 py-1 bg-[#C5A059] text-[#161311] font-semibold text-[11px] rounded hover:bg-[#D9B46E] transition-colors shrink-0"
            >
              Copiar
            </button>
          </div>
        </div>

        {/* Direct Butler CTA */}
        <a
          href={getWhatsAppButlerLink('Olá, mordomo do Sanctuário. Sra. Elena Rostova aqui.')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 rounded-lg bg-[#C5A059] text-[#161311] font-semibold text-xs uppercase tracking-wider hover:bg-[#D9B46E] flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar com Mordomo Privativo</span>
        </a>

      </div>
    </div>
  );
};
