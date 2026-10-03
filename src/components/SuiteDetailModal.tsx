import React, { useState } from 'react';
import { Accommodation, CurrencyCode, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/mockData';
import { formatPrice } from '../utils/formatters';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Maximize2,
  Sparkles,
  Volume2
} from 'lucide-react';

interface SuiteDetailModalProps {
  accommodation: Accommodation | null;
  currency: CurrencyCode;
  language: LanguageCode;
  onClose: () => void;
  onProceedToBook: (suiteId: string) => void;
}

export const SuiteDetailModal: React.FC<SuiteDetailModalProps> = ({
  accommodation,
  currency,
  language,
  onClose,
  onProceedToBook
}) => {
  if (!accommodation) return null;

  const t = TRANSLATIONS[language];
  const [photoIndex, setPhotoIndex] = useState(0);

  const gallery = accommodation.gallery && accommodation.gallery.length > 0 
    ? accommodation.gallery 
    : [accommodation.image];

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="suite-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center animate-fade-in"
    >
      <div className="relative w-full max-w-lg lg:max-w-2xl bg-[#161311] min-h-screen pb-28 text-[#E8E2D9] shadow-2xl">
        
        {/* Top Floating Close Button */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#161311]/90 backdrop-blur-md border-b border-[#C5A059]/20">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm tracking-widest text-[#C5A059] uppercase">
              Sanctuário 5★
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#25201C] border border-[#C5A059]/30 flex items-center justify-center text-[#D5CDBC] hover:text-[#F3EDE2] hover:border-[#C5A059] transition-colors"
            aria-label="Fechar ficha da acomodação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Multi-photo Gallery Slider */}
        <div className="relative h-72 sm:h-84 overflow-hidden bg-black">
          <img
            src={gallery[photoIndex]}
            alt={`${accommodation.title} - Foto ${photoIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Photo Counter */}
          <div className="absolute bottom-3 right-3 bg-[#161311]/85 backdrop-blur-md border border-[#C5A059]/30 px-2.5 py-1 rounded text-[11px] font-medium text-[#C5A059] tracking-wider tabular-nums">
            {photoIndex + 1} / {gallery.length}
          </div>

          {/* Slider Controls */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#161311]/70 backdrop-blur-sm border border-[#C5A059]/30 flex items-center justify-center text-[#E8E2D9] hover:bg-[#C5A059] hover:text-[#161311] transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#161311]/70 backdrop-blur-sm border border-[#C5A059]/30 flex items-center justify-center text-[#E8E2D9] hover:bg-[#C5A059] hover:text-[#161311] transition-colors"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Thumbnail Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  photoIndex === i ? 'w-5 bg-[#C5A059]' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`Ir para foto ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-6 space-y-6">

          {/* Header Title & Tagline */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#C5A059] tracking-widest uppercase font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{accommodation.highlight}</span>
            </div>
            <h1 id="suite-detail-title" className="font-serif text-3xl text-[#F3EDE2] font-normal mb-2">
              {accommodation.title}
            </h1>
            <p className="text-sm text-[#C5BBAA] font-light leading-relaxed">
              {accommodation.tagline}
            </p>
          </div>

          {/* 2. Essential Technical Specifications Grid */}
          <div className="bg-[#1F1A17] border border-[#C5A059]/20 rounded-xl p-4 grid grid-cols-2 gap-3.5 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-0.5">Área Privativa</span>
              <span className="font-serif text-base text-[#F3EDE2]">{accommodation.areaM2} m²</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-0.5">Capacidade</span>
              <span className="font-serif text-base text-[#F3EDE2]">Até {accommodation.guestsMax} hóspedes</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-0.5">Cama & Enxoval</span>
              <span className="font-serif text-base text-[#F3EDE2]">{accommodation.bedType}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E8577] block mb-0.5">Orientação & Vista</span>
              <span className="font-serif text-base text-[#F3EDE2]">{accommodation.viewOrientation}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-[#C5A059]/15 flex items-center gap-2 text-[#C5A059]">
              <Volume2 className="w-4 h-4 shrink-0" />
              <span className="text-[11px] font-medium">{accommodation.acousticRating}</span>
            </div>
          </div>

          {/* 3. Architectural Narrative */}
          <div>
            <h2 className="font-serif text-lg text-[#F3EDE2] mb-2 flex items-center gap-2">
              <span>{t.architecturalNarrative}</span>
            </h2>
            <p className="text-xs text-[#BAAEA0] leading-relaxed font-light mb-3">
              {accommodation.description}
            </p>
            <div className="p-3.5 bg-[#1C1815] border-l-2 border-[#C5A059] rounded-r-lg text-xs text-[#D5CDBC] font-light leading-relaxed italic">
              "{accommodation.architecturalDetails}"
            </div>
          </div>

          {/* 4. VIP Amenities & Inclusions */}
          <div>
            <h2 className="font-serif text-lg text-[#F3EDE2] mb-3">
              {t.amenitiesTitle}
            </h2>
            <div className="space-y-2.5">
              {accommodation.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E8E2D9] font-light">
                  <div className="w-4 h-4 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#C5A059]" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Policies & Guarantees */}
          <div className="pt-4 border-t border-[#C5A059]/20">
            <h2 className="font-serif text-base text-[#F3EDE2] mb-2.5">
              {t.policiesTitle}
            </h2>
            <div className="space-y-2 text-xs text-[#A69C8A] font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Cancelamento flexível sem penalidade até 48 horas antes da chegada.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Check-in flexível 24h com recepção privativa do mordomo na vila.</span>
              </div>
            </div>
          </div>

        </div>

        {/* 6. Sticky Bottom Rate Bar & Direct CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#161311]/95 backdrop-blur-lg border-t border-[#C5A059]/30 p-4">
          <div className="max-w-lg lg:max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#8E8577] uppercase block">{t.startingFrom}</span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-xl sm:text-2xl font-semibold text-[#C5A059] tabular-nums">
                  {formatPrice(accommodation.pricePerNightEUR, currency)}
                </span>
                <span className="text-xs text-[#A69C8A] font-light"> {t.perNight}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToBook(accommodation.id)}
              className="h-12 px-6 rounded-xl bg-[#C5A059] text-[#161311] font-semibold text-xs tracking-wider uppercase hover:bg-[#D9B46E] transition-all flex items-center gap-2 shadow-lg shadow-[#C5A059]/25 active:scale-[0.98]"
            >
              <span>{t.proceedBooking}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
