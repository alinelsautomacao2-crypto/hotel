import React, { useState } from 'react';
import { BUTLER_REQUESTS, TRANSLATIONS } from '../data/mockData';
import { ButlerRequest, LanguageCode } from '../types';
import { getWhatsAppButlerLink } from '../utils/formatters';
import { 
  Bell, 
  MessageCircle, 
  Sparkles, 
  Check, 
  Send, 
  ShieldCheck, 
  Clock, 
  PhoneCall,
  UserCheck,
  Bot,
  ArrowRight,
  MessageSquareHeart
} from 'lucide-react';

interface ConciergeScreenProps {
  language: LanguageCode;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ConciergeScreen: React.FC<ConciergeScreenProps> = ({ 
  language,
  onOpenChat
}) => {
  const t = TRANSLATIONS[language];
  const [activeRequestFeedback, setActiveRequestFeedback] = useState<string | null>(null);

  // Custom inquiry state
  const [suiteOrName, setSuiteOrName] = useState('');
  const [inquiryType, setInquiryType] = useState('dining');
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleQuickRequest = (req: ButlerRequest) => {
    setActiveRequestFeedback(req.id);
    setTimeout(() => {
      setActiveRequestFeedback(null);
    }, 4000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryText('');
      setSuiteOrName('');
    }, 6000);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-medium mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The Guild of Professional Butlers</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F3EDE2] font-normal">
          Concierge Privativo & Mordomia
        </h1>
        <p className="text-xs text-[#A69C8A] font-light mt-1">
          Atendimento híbrido de inteligência artificial 24h e mordomos humanos executivos para sua completa serenidade.
        </p>
      </div>

      {/* Featured Virtual Concierge AI Banner */}
      <div className="bg-gradient-to-r from-[#241E19] via-[#1E1915] to-[#27211C] border border-[#C5A059]/40 rounded-2xl p-4 sm:p-5 mb-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#2A231E] border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-md shadow-[#C5A059]/20">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A059]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-serif text-lg text-[#F3EDE2]">
                  Charles — Concierge Virtual IA
                </h2>
                <span className="text-[10px] text-[#C5A059] font-medium border border-[#C5A059]/40 rounded px-1.5 py-0.2">
                  Instantâneo
                </span>
              </div>
              <p className="text-xs text-[#BAAEA0] font-light">
                Perguntas sobre amenidades, reservas de spa, pedidos de quarto e handoff imediato para humano.
              </p>
            </div>
          </div>
        </div>

        {/* Quick prompt buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3.5">
          <button
            onClick={() => onOpenChat('Quais são os horários de check-in e check-out?')}
            className="p-2 rounded-lg bg-[#181412]/80 border border-[#C5A059]/20 hover:border-[#C5A059] text-left transition-colors"
          >
            <div className="text-[11px] font-medium text-[#F3EDE2] truncate">🕒 Check-in & Check-out</div>
            <div className="text-[10px] text-[#8E8577]">Horários e regras flexíveis</div>
          </button>

          <button
            onClick={() => onOpenChat('Gostaria de ver o cardápio de Room Service e pedir Champagne e Caviar.')}
            className="p-2 rounded-lg bg-[#181412]/80 border border-[#C5A059]/20 hover:border-[#C5A059] text-left transition-colors"
          >
            <div className="text-[11px] font-medium text-[#F3EDE2] truncate">🍾 Pedido de Room Service</div>
            <div className="text-[10px] text-[#8E8577]">Champagne e itens na suíte</div>
          </button>

          <button
            onClick={() => onOpenChat('Quais são as opções de restaurantes e alta gastronomia do hotel?')}
            className="p-2 rounded-lg bg-[#181412]/80 border border-[#C5A059]/20 hover:border-[#C5A059] text-left transition-colors"
          >
            <div className="text-[11px] font-medium text-[#F3EDE2] truncate">🍽️ Restaurante Éos 2★</div>
            <div className="text-[10px] text-[#8E8577]">Horários e menu degustação</div>
          </button>

          <button
            onClick={() => onOpenChat('Quais são os tratamentos e rituais do spa botânico?')}
            className="p-2 rounded-lg bg-[#181412]/80 border border-[#C5A059]/20 hover:border-[#C5A059] text-left transition-colors"
          >
            <div className="text-[11px] font-medium text-[#F3EDE2] truncate">💆‍♀️ Agendamento no Spa</div>
            <div className="text-[10px] text-[#8E8577]">Termas e vinoterapia</div>
          </button>
        </div>

        <button
          onClick={() => onOpenChat()}
          className="w-full h-11 rounded-xl bg-[#C5A059] text-[#161311] font-semibold text-xs uppercase tracking-wider hover:bg-[#D9B46E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/25 active:scale-[0.99]"
        >
          <Bot className="w-4 h-4" />
          <span>Conversar com Concierge Virtual Agora</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Human Head Butler Status Bar */}
      <div className="bg-[#1C1815] border border-[#C5A059]/25 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#27211D] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#161311]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base text-[#F3EDE2]">Sr. Charles Henderson</span>
              <span className="text-[10px] text-[#C5A059] font-medium border border-[#C5A059]/30 rounded px-1.5 py-0.2">
                Head Butler
              </span>
            </div>
            <p className="text-[11px] text-[#A69C8A] font-light">
              Ao vivo na propriedade · Tempo médio de resposta: 2 min
            </p>
          </div>
        </div>

        <a
          href={getWhatsAppButlerLink('Olá, Sr. Charles. Gostaria de assistência com meus preparativos no Sanctuário 5★.')}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>

      {/* Quick Services Requests */}
      <div className="mb-8">
        <h2 className="font-serif text-lg text-[#F3EDE2] mb-3">
          Solicitações Frequentes à Suíte
        </h2>

        <div className="space-y-3">
          {BUTLER_REQUESTS.map((req) => {
            const isConfirmed = activeRequestFeedback === req.id;

            return (
              <div
                key={req.id}
                className="bg-[#1F1A17] border border-[#C5A059]/15 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-[#C5A059]/35 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm text-[#F3EDE2] mb-0.5">
                    {req.title}
                  </h3>
                  <p className="text-xs text-[#8E8577] font-light truncate">
                    {req.description}
                  </p>
                </div>

                <button
                  onClick={() => handleQuickRequest(req)}
                  disabled={isConfirmed}
                  className={`h-8 px-3 rounded text-xs font-medium tracking-wide transition-all shrink-0 ${
                    isConfirmed
                      ? 'bg-emerald-700 text-white'
                      : 'border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10'
                  }`}
                >
                  {isConfirmed ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Encaminhado</span>
                    </span>
                  ) : (
                    <span>Solicitar</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bespoke Request Form */}
      <div className="bg-[#1C1815] border border-[#C5A059]/30 rounded-2xl p-5 shadow-xl">
        <h2 className="font-serif text-xl text-[#F3EDE2] mb-1">
          Pedido Sob Medida ao Mordomo
        </h2>
        <p className="text-xs text-[#A69C8A] font-light mb-4">
          Conte-nos qualquer preferência específica: temperatura do quarto, preferências de menu, comemorações românticas ou logística náutica/aérea.
        </p>

        {inquirySubmitted ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-600/40 rounded-xl text-center space-y-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-700/30 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base text-[#F3EDE2]">
              Solicitação recebida com prioridade máxima
            </h3>
            <p className="text-xs text-[#C5BBAA] font-light">
              O Sr. Charles Henderson ou sua equipe confirmará a execução diretamente via WhatsApp ou na sua suíte em instantes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-[#8E8577] block mb-1 font-medium">
                Categoria do Pedido
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-[#27211D] border border-[#C5A059]/20 rounded-lg px-3 py-2 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059] transition-colors"
              >
                <option value="dining">Gastronomia Privativa & Vinhos Raros</option>
                <option value="transfer">Logística Maybach ou Helicóptero</option>
                <option value="amenity">Ajuste de Suíte & Menu de Travesseiros</option>
                <option value="wellness">Spa Privativo no Quarto</option>
                <option value="celebration">Ocasião Especial & Flores Nobres</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase text-[#8E8577] block mb-1 font-medium">
                Nome do Hóspede ou Número da Suíte
              </label>
              <input
                type="text"
                placeholder="Ex: Elena Rostova / Grand Villa 102"
                value={suiteOrName}
                onChange={(e) => setSuiteOrName(e.target.value)}
                className="w-full bg-[#27211D] border border-[#C5A059]/20 rounded-lg px-3 py-2 text-xs text-[#E8E2D9] placeholder-[#665D52] focus:outline-none focus:border-[#C5A059] transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase text-[#8E8577] block mb-1 font-medium">
                Detalhes do Seu Desejo
              </label>
              <textarea
                rows={3}
                placeholder="Descreva seu pedido com todos os detalhes desejados..."
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                className="w-full bg-[#27211D] border border-[#C5A059]/20 rounded-lg px-3 py-2 text-xs text-[#E8E2D9] placeholder-[#665D52] focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#C5A059] text-[#161311] font-semibold text-xs uppercase tracking-wider hover:bg-[#D9B46E] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Pedido ao Mordomo</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
