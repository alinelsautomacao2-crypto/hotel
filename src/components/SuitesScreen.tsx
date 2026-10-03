import React, { useState } from 'react';
import { ACCOMMODATIONS, TRANSLATIONS } from '../data/mockData';
import { Accommodation, CurrencyCode, LanguageCode } from '../types';
import { formatPrice } from '../utils/formatters';
import { BedDouble, Maximize2, Users, VolumeX, ArrowRight, Sparkles } from 'lucide-react';

interface SuitesScreenProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onSelectAccommodation: (acc: Accommodation) => void;
  onOpenBooking: (initialData?: { suiteId?: string }) => void;
}

type FilterType = 'all' | 'villa_pool' | 'master_suite' | 'ocean_view' | 'soaking_tub';

export const SuitesScreen: React.FC<SuitesScreenProps> = ({
  currency,
  language,
  onSelectAccommodation,
  onOpenBooking
}) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: t.filterAll },
    { key: 'villa_pool', label: t.filterPool },
    { key: 'master_suite', label: t.filterMaster },
    { key: 'ocean_view', label: t.filterOcean },
    { key: 'soaking_tub', label: t.filterTub }
  ];

  const filteredSuites = ACCOMMODATIONS.filter((acc) => {
    if (activeFilter === 'all') return true;
    return acc.category === activeFilter;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Header Title */}
      <div className="mb-4">
        <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-medium block mb-1">
          Residências Privativas
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F3EDE2] font-normal">
          Acomodações de Luxo & Vilas
        </h1>
        <p className="text-xs text-[#A69C8A] font-light mt-1">
          Cada espaço é uma obra-prima de arquitetura biofílica com serviço de mordomo 24h e amenidades Hermès & Bulgari.
        </p>
      </div>

      {/* Horizontal Filter Tabs (Zero-pill discipline: segmented interactive buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 mb-6">
        {filterTabs.map((tab) => {
          const isSelected = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isSelected
                  ? 'bg-[#C5A059] text-[#161311] font-semibold shadow-md'
                  : 'bg-[#231E1A] text-[#A69C8A] hover:text-[#F3EDE2] border border-[#C5A059]/20'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Accommodation Cards List */}
      <div className="space-y-6">
        {filteredSuites.map((acc) => (
          <article
            key={acc.id}
            className="bg-[#1C1815] border border-[#C5A059]/25 rounded-2xl overflow-hidden shadow-xl hover:border-[#C5A059]/45 transition-all duration-200 group"
          >
            {/* Image Banner */}
            <div className="relative h-60 sm:h-72 overflow-hidden cursor-pointer" onClick={() => onSelectAccommodation(acc)}>
              <img
                src={acc.image}
                alt={acc.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815] via-transparent to-transparent opacity-90" />

              {/* Tag / Highlight */}
              <div className="absolute top-3 left-3 bg-[#161311]/85 backdrop-blur-md border border-[#C5A059]/40 px-2.5 py-1 rounded text-[10px] font-medium text-[#C5A059] tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>{acc.highlight}</span>
              </div>

              {/* Expand Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAccommodation(acc);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#161311]/80 backdrop-blur-md border border-[#C5A059]/30 flex items-center justify-center text-[#E8E2D9] hover:text-[#C5A059] transition-colors"
                aria-label={`Ver fotos de ${acc.title}`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5">
              {/* Architectural Metadata with Clean Typographic Separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A69C8A] mb-2 font-light">
                <span className="flex items-center gap-1">
                  <span>{acc.areaM2} m²</span>
                </span>
                <span aria-hidden="true" className="text-[#C5A059]/40">·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#C5A059]" />
                  <span>{acc.guestsMax} hóspedes</span>
                </span>
                <span aria-hidden="true" className="text-[#C5A059]/40">·</span>
                <span className="flex items-center gap-1">
                  <BedDouble className="w-3 h-3 text-[#C5A059]" />
                  <span>{acc.bedType}</span>
                </span>
                <span aria-hidden="true" className="text-[#C5A059]/40">·</span>
                <span className="flex items-center gap-1 text-[11px] text-[#8E8577]">
                  <VolumeX className="w-3 h-3 text-[#C5A059]" />
                  <span>{acc.acousticRating.split(' ')[0]}</span>
                </span>
              </div>

              <h2 className="font-serif text-2xl text-[#F3EDE2] mb-1.5">
                {acc.title}
              </h2>

              <p className="text-xs text-[#BAAEA0] leading-relaxed mb-4 font-light">
                {acc.description}
              </p>

              {/* Key Features Unboxed List */}
              <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#C5A059]/15 mb-4 text-xs text-[#D5CDBC]">
                {acc.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Rate & CTAs */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-[#8E8577] uppercase block">{t.startingFrom}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl font-medium text-[#C5A059] tabular-nums">
                      {formatPrice(acc.pricePerNightEUR, currency)}
                    </span>
                    <span className="text-[11px] text-[#A69C8A] font-light"> {t.perNight}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectAccommodation(acc)}
                    className="h-9 px-3.5 rounded-lg border border-[#C5A059]/30 text-xs font-medium text-[#E8E2D9] hover:bg-[#2A241F] transition-colors"
                  >
                    {t.viewDetails}
                  </button>

                  <button
                    onClick={() => onOpenBooking({ suiteId: acc.id })}
                    className="h-9 px-4 rounded-lg bg-[#C5A059] text-[#161311] font-semibold text-xs uppercase tracking-wider hover:bg-[#D9B46E] transition-all duration-150 flex items-center gap-1.5 shadow-md shadow-[#C5A059]/20"
                  >
                    <span>{t.reserveNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
