import React, { useState } from 'react';
import { EXPERIENCES, TRANSLATIONS } from '../data/mockData';
import { Experience, CurrencyCode, LanguageCode } from '../types';
import { formatPrice, getWhatsAppButlerLink } from '../utils/formatters';
import { Clock, Check, Sparkles, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

interface ExperiencesScreenProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onBookExperience: (exp: Experience, timeSlot: string) => void;
  onOpenConcierge: () => void;
}

type ExperienceCategory = 'all' | 'spa' | 'dining' | 'expeditions';

export const ExperiencesScreen: React.FC<ExperiencesScreenProps> = ({
  currency,
  language,
  onBookExperience,
  onOpenConcierge
}) => {
  const t = TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory>('all');
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({});
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const categories: { key: ExperienceCategory; label: string }[] = [
    { key: 'all', label: 'Todas as Vivências' },
    { key: 'spa', label: t.expSpa },
    { key: 'dining', label: t.expDining },
    { key: 'expeditions', label: t.expAdventures }
  ];

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    if (activeCategory === 'all') return true;
    return exp.category === activeCategory;
  });

  const handleSelectSlot = (expId: string, slot: string) => {
    setSelectedSlots((prev) => ({ ...prev, [expId]: slot }));
  };

  const handleBook = (exp: Experience) => {
    const slot = selectedSlots[exp.id] || exp.scheduleOptions[0];
    onBookExperience(exp, slot);
    setBookingSuccessId(exp.id);
    setTimeout(() => {
      setBookingSuccessId(null);
    }, 4000);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Title */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rituais & Momentos Memoráveis</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F3EDE2] font-normal">
          Experiências, Spa & Alta Gastronomia
        </h1>
        <p className="text-xs text-[#A69C8A] font-light mt-1">
          Criadas para despertar os sentidos através de termas basálticas ancestrais, alta culinária Michelin e navegação privativa.
        </p>
      </div>

      {/* Categories Tabs (Interactive segmented buttons, zero-pill discipline) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 mb-6">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isSelected
                  ? 'bg-[#C5A059] text-[#161311] font-semibold shadow-md'
                  : 'bg-[#231E1A] text-[#A69C8A] hover:text-[#F3EDE2] border border-[#C5A059]/20'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {filteredExperiences.map((exp) => {
          const activeSlot = selectedSlots[exp.id] || exp.scheduleOptions[0];
          const isBooked = bookingSuccessId === exp.id;

          return (
            <article
              key={exp.id}
              className="bg-[#1C1815] border border-[#C5A059]/25 rounded-2xl overflow-hidden shadow-xl hover:border-[#C5A059]/40 transition-colors"
            >
              {/* Media image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815] via-transparent to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 left-3 bg-[#161311]/85 backdrop-blur-md border border-[#C5A059]/30 px-2.5 py-1 rounded text-[10px] font-medium text-[#C5A059] tracking-wider uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C5A059]" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <h2 className="font-serif text-xl sm:text-2xl text-[#F3EDE2] mb-1">
                  {exp.title}
                </h2>
                <p className="text-xs text-[#C5A059] font-medium mb-3">
                  {exp.tagline}
                </p>
                <p className="text-xs text-[#B5ABA0] leading-relaxed mb-4 font-light">
                  {exp.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 mb-4 py-3 border-y border-[#C5A059]/15 text-xs text-[#D5CDBC] font-light">
                  {exp.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Schedule Time Slots Selection */}
                <div className="mb-4">
                  <label className="text-[10px] tracking-wider uppercase text-[#8E8577] block mb-2 font-medium">
                    Horários Disponíveis Hoje & Amanhã
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.scheduleOptions.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSelectSlot(exp.id, slot)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                          activeSlot === slot
                            ? 'bg-[#C5A059] text-[#161311] font-semibold'
                            : 'bg-[#27211D] border border-[#C5A059]/20 text-[#A69C8A] hover:text-[#F3EDE2]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rate & Booking CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-[#8E8577] uppercase block">Investimento</span>
                    <span className="font-serif text-xl font-medium text-[#C5A059] tabular-nums">
                      {formatPrice(exp.priceEUR, currency)}
                    </span>
                    <span className="text-[11px] text-[#8E8577] font-light"> / experiência</span>
                  </div>

                  <button
                    onClick={() => handleBook(exp)}
                    disabled={isBooked}
                    className={`h-10 px-4 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md ${
                      isBooked
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#C5A059] text-[#161311] hover:bg-[#D9B46E] active:scale-[0.98]'
                    }`}
                  >
                    {isBooked ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Agendado com Mordomo!</span>
                      </>
                    ) : (
                      <>
                        <span>Agendar Vivência</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* VIP Butler WhatsApp Assistance Banner */}
      <div className="mt-8 bg-[#1F1A17] border border-[#C5A059]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg text-[#F3EDE2] mb-1">
            Deseja uma experiência personalizada?
          </h3>
          <p className="text-xs text-[#A69C8A] font-light">
            Nosso mordomo executivo pode desenhar roteiros náuticos sob medida ou organizar harmonizações exclusivas na sua vila.
          </p>
        </div>

        <a
          href={getWhatsAppButlerLink('Olá, gostaria de solicitar uma vivência privativa personalizada no Sanctuário Hotel & Spa.')}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 px-4 rounded-lg bg-[#25201C] border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/10 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shrink-0 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar com Mordomo</span>
        </a>
      </div>
    </div>
  );
};
