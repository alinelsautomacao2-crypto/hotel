import React, { useState } from 'react';
import { 
  HERO_IMAGE, 
  SUITE_IMAGE, 
  SPA_IMAGE, 
  CULINARY_IMAGE, 
  ACCOMMODATIONS, 
  HOTEL_PILLARS, 
  TESTIMONIALS, 
  TRANSLATIONS 
} from '../data/mockData';
import { Accommodation, CurrencyCode, LanguageCode } from '../types';
import { formatPrice } from '../utils/formatters';
import { 
  Calendar, 
  Users, 
  Key, 
  ArrowRight, 
  Sparkles, 
  UtensilsCrossed, 
  Waves, 
  Compass, 
  ShieldCheck, 
  Star,
  Award,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface HomeScreenProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onSelectAccommodation: (acc: Accommodation) => void;
  onOpenBooking: (initialData?: { checkIn?: string; checkOut?: string; guests?: number; suiteId?: string }) => void;
  onNavigateTab: (tab: 'suites' | 'experiences' | 'concierge') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currency,
  language,
  onSelectAccommodation,
  onOpenBooking,
  onNavigateTab
}) => {
  const t = TRANSLATIONS[language];

  // Express search state
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(threeDaysLater);
  const [guests, setGuests] = useState(2);
  const [promoCode, setPromoCode] = useState('');

  const featuredSuite = ACCOMMODATIONS[0]; // Grand Villa Sanctuário
  const secondarySuite = ACCOMMODATIONS[1]; // Suíte Presidencial Royal

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      checkIn,
      checkOut,
      guests
    });
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C5A059]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#C5A059]" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#C5A059]" />;
      default:
        return <Compass className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <div className="pb-24">
      {/* 1. Hero Section with Forbes 5★ Badge */}
      <section className="relative min-h-[520px] md:min-h-[580px] flex items-end overflow-hidden">
        {/* Background Image with Fallback and Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Sanctuário Hotel & Spa vista panorâmica crepúsculo"
            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-[#161311]/60 to-[#161311]/20" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#161311]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 pb-8 pt-20">
          {/* Forbes Travel Guide 5★ Unboxed Text Separators */}
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-medium mb-3">
            <Award className="w-3.5 h-3.5 shrink-0 text-[#C5A059]" />
            <span>Forbes 5-Star 2026</span>
            <span aria-hidden="true" className="text-[#C5A059]/40">·</span>
            <span>The Leading Hotels</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-[#F3EDE2] tracking-wide mb-3 text-balance">
            {t.tagline}
          </h1>

          <p className="text-xs sm:text-sm text-[#C5BBAA] leading-relaxed max-w-xl font-light mb-6">
            Refúgio exclusivo entalhado em rochas basálticas vulcânicas. Privacidadade absoluta, termas minerais ancestrais e hospitalidade elevada à arte.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="h-11 px-6 rounded-lg bg-[#C5A059] text-[#161311] font-semibold text-xs tracking-wider uppercase hover:bg-[#D9B46E] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 shadow-lg shadow-[#C5A059]/20"
            >
              <span>{t.reserveNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('suites')}
              className="h-11 px-5 rounded-lg border border-[#C5A059]/40 text-[#E8E2D9] text-xs font-medium tracking-wider hover:bg-[#2A241F] transition-colors flex items-center gap-2"
            >
              <span>Conhecer Vilas</span>
              <ChevronRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Motor de Busca Expressa (Booking Bar) */}
      <section className="relative z-20 -mt-4 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#1E1A17] border border-[#C5A059]/30 rounded-xl p-3.5 shadow-2xl backdrop-blur-md"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {/* Check-in */}
            <div className="flex flex-col">
              <label className="text-[10px] tracking-wider text-[#A69C8A] uppercase font-medium flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3 text-[#C5A059]" />
                <span>{t.searchCheckIn}</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-[#27211D] border border-[#C5A059]/20 rounded-md px-2.5 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059] transition-colors"
                required
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col">
              <label className="text-[10px] tracking-wider text-[#A69C8A] uppercase font-medium flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3 text-[#C5A059]" />
                <span>{t.searchCheckOut}</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-[#27211D] border border-[#C5A059]/20 rounded-md px-2.5 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059] transition-colors"
                required
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col">
              <label className="text-[10px] tracking-wider text-[#A69C8A] uppercase font-medium flex items-center gap-1 mb-1">
                <Users className="w-3 h-3 text-[#C5A059]" />
                <span>{t.searchGuests}</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-[#27211D] border border-[#C5A059]/20 rounded-md px-2.5 py-1.5 text-xs text-[#E8E2D9] focus:outline-none focus:border-[#C5A059] transition-colors"
              >
                <option value={1}>1 Hóspede</option>
                <option value={2}>2 Hóspedes (Casal)</option>
                <option value={3}>3 Hóspedes</option>
                <option value={4}>4 Hóspedes (Família / Grupo)</option>
              </select>
            </div>

            {/* VIP Code */}
            <div className="flex flex-col">
              <label className="text-[10px] tracking-wider text-[#A69C8A] uppercase font-medium flex items-center gap-1 mb-1">
                <Key className="w-3 h-3 text-[#C5A059]" />
                <span>{t.searchPromo}</span>
              </label>
              <input
                type="text"
                placeholder="AMBASSADOR"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="bg-[#27211D] border border-[#C5A059]/20 rounded-md px-2.5 py-1.5 text-xs text-[#E8E2D9] placeholder-[#665D52] uppercase focus:outline-none focus:border-[#C5A059] transition-colors tracking-wider"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-lg bg-[#C5A059] text-[#161311] text-xs font-semibold tracking-wider uppercase hover:bg-[#D9B46E] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
          >
            <span>{t.searchButton}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </section>

      {/* 3. Destaques de Suítes & Vilas (Signature Residences) */}
      <section className="mt-12 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-medium mb-1">
              Coleção de Acomodações
            </div>
            <h2 className="font-serif text-2xl text-[#F3EDE2] font-normal">
              Vilas & Residências Insígnias
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('suites')}
            className="text-xs text-[#C5A059] hover:underline flex items-center gap-1"
          >
            <span>Ver todas (18)</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Main Featured Villa Card */}
        <div className="bg-[#1E1A17] border border-[#C5A059]/25 rounded-2xl overflow-hidden shadow-xl mb-4 group">
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={featuredSuite.image}
              alt={featuredSuite.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17] via-transparent to-transparent" />
            
            {/* Top Unboxed Highlight */}
            <div className="absolute top-3 left-3 bg-[#161311]/80 backdrop-blur-md border border-[#C5A059]/40 px-2.5 py-1 rounded text-[10px] font-medium text-[#C5A059] tracking-wider uppercase">
              {featuredSuite.highlight}
            </div>

            <button
              onClick={() => onSelectAccommodation(featuredSuite)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#161311]/80 backdrop-blur-md border border-[#C5A059]/30 flex items-center justify-center text-[#E8E2D9] hover:text-[#C5A059] transition-colors"
              aria-label="Abrir galeria"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs text-[#A69C8A] mb-1.5 font-light">
              <span>{featuredSuite.areaM2} m²</span>
              <span aria-hidden="true">·</span>
              <span>Até {featuredSuite.guestsMax} hóspedes</span>
              <span aria-hidden="true">·</span>
              <span>Piscina Infinita</span>
            </div>

            <h3 className="font-serif text-xl text-[#F3EDE2] mb-1">
              {featuredSuite.title}
            </h3>

            <p className="text-xs text-[#B5ABA0] mb-4 line-clamp-2 font-light">
              {featuredSuite.tagline}
            </p>

            <div className="pt-3 border-t border-[#C5A059]/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8E8577] uppercase block">{t.startingFrom}</span>
                <span className="font-serif text-lg font-medium text-[#C5A059] tabular-nums">
                  {formatPrice(featuredSuite.pricePerNightEUR, currency)}
                </span>
                <span className="text-[11px] text-[#A69C8A] font-light"> {t.perNight}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectAccommodation(featuredSuite)}
                  className="px-3 py-2 rounded text-xs font-medium border border-[#C5A059]/30 text-[#D5CDBC] hover:bg-[#2A241F] transition-colors"
                >
                  {t.viewDetails}
                </button>
                <button
                  onClick={() => onOpenBooking({ suiteId: featuredSuite.id })}
                  className="px-4 py-2 rounded bg-[#C5A059] text-[#161311] font-semibold text-xs uppercase tracking-wider hover:bg-[#D9B46E] transition-colors"
                >
                  {t.reserveNow}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Card (Royal Suite) */}
        <div className="bg-[#1E1A17] border border-[#C5A059]/20 rounded-xl p-4 flex gap-4 items-center group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 relative">
            <img
              src={secondarySuite.image}
              alt={secondarySuite.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] text-[#A69C8A] mb-1">
              <span>{secondarySuite.areaM2} m²</span>
              <span aria-hidden="true">·</span>
              <span>Jacuzzi Terraço</span>
            </div>
            <h4 className="font-serif text-base text-[#F3EDE2] truncate mb-0.5">
              {secondarySuite.title}
            </h4>
            <div className="text-xs text-[#C5A059] font-medium mb-2 tabular-nums">
              {formatPrice(secondarySuite.pricePerNightEUR, currency)} <span className="text-[10px] text-[#8E8577]">{t.perNight}</span>
            </div>
            <button
              onClick={() => onSelectAccommodation(secondarySuite)}
              className="text-xs text-[#C5A059] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Ver Especificações Completas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Grade de Diferenciais 5 Estrelas (Hotel Pillars) */}
      <section className="mt-14 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-medium block mb-1">
            Padrão de Excelência
          </span>
          <h2 className="font-serif text-2xl text-[#F3EDE2] font-normal">
            Os Pilares da Experiência Sanctuário
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {HOTEL_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#1C1815] border border-[#C5A059]/15 rounded-xl p-4 flex gap-3.5 hover:border-[#C5A059]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#27211D] border border-[#C5A059]/25 flex items-center justify-center shrink-0">
                {getPillarIcon(pillar.icon)}
              </div>
              <div>
                <h3 className="font-serif text-base text-[#F3EDE2] mb-0.5">
                  {pillar.title}
                </h3>
                <div className="text-[11px] text-[#C5A059] font-medium mb-1.5">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-[#9E9585] leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Destaque Gastronômico: Restaurante Éos (2★ Michelin) */}
      <section className="mt-14 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/30 bg-[#1A1613]">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={CULINARY_IMAGE}
              alt="Haute cuisine do Restaurante Éos"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613] via-[#1A1613]/50 to-transparent" />
            <div className="absolute top-3 left-3 bg-[#161311]/90 border border-[#C5A059]/40 px-2.5 py-1 rounded text-[10px] font-medium text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-[#C5A059]" />
              <Star className="w-3 h-3 fill-[#C5A059]" />
              <span>Guia Michelin 2026</span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-serif text-2xl text-[#F3EDE2] mb-1">
              Restaurante Éos & Chef Matteo Valente
            </h3>
            <p className="text-xs text-[#AFA597] font-light leading-relaxed mb-4">
              Uma celebração dos sentidos. Degustações autorais de 9 tempos com frutos do mar da costa e ervas raras cultivadas em nossa estufa botânica orgânica.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-[#C5A059]/15">
              <span className="text-xs text-[#C5A059] font-medium">
                Menu Degustação com Harmonização de Safras Raras
              </span>
              <button
                onClick={() => onNavigateTab('experiences')}
                className="text-xs font-semibold text-[#161311] bg-[#C5A059] px-3.5 py-1.5 rounded hover:bg-[#D9B46E] transition-colors"
              >
                Conhecer Vivências
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Selos de Distinção & Garantias */}
      <section className="mt-14 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center">
        <div className="py-6 border-y border-[#C5A059]/20 flex flex-wrap items-center justify-around gap-6 text-[#A69C8A]">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-[#C5A059] mb-1" />
            <span className="text-[10px] font-medium tracking-widest uppercase">Forbes 5-Star 2026</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#C5A059] mb-1" />
            <span className="text-[10px] font-medium tracking-widest uppercase">Leading Hotels</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#C5A059] mb-1" />
            <span className="text-[10px] font-medium tracking-widest uppercase">Relais & Châteaux</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-6 h-6 text-[#C5A059] mb-1" />
            <span className="text-[10px] font-medium tracking-widest uppercase">2★ Guia Michelin</span>
          </div>
        </div>
      </section>

      {/* 7. Depoimentos de Hóspedes Reais */}
      <section className="mt-12 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-medium block mb-1">
            Palavras de Quem Já Viveu
          </span>
          <h2 className="font-serif text-xl text-[#F3EDE2] font-normal">
            Memórias no Sanctuário
          </h2>
        </div>

        <div className="space-y-3">
          {TESTIMONIALS.map((test, index) => (
            <div
              key={index}
              className="bg-[#1C1815] border border-[#C5A059]/15 rounded-xl p-4"
            >
              <p className="font-serif italic text-sm text-[#D5CDBC] leading-relaxed mb-3">
                "{test.quote}"
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#F3EDE2]">{test.name}</span>
                <span className="text-[11px] text-[#A69C8A]">{test.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
