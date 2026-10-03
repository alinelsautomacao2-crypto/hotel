import React, { useState } from 'react';
import { CurrencyCode, LanguageCode } from '../types';
import { CURRENCIES } from '../utils/formatters';
import { User, Bell, ChevronDown, Check, Share2 } from 'lucide-react';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenProfile: () => void;
  onOpenConcierge: () => void;
  onOpenChat: () => void;
  onCopyLink?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  currentLanguage,
  onLanguageChange,
  onOpenProfile,
  onOpenConcierge,
  onOpenChat,
  onCopyLink
}) => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    if (onCopyLink) {
      onCopyLink();
    }
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#161311]/90 backdrop-blur-md border-b border-[#C5A059]/20 transition-all duration-200">
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Wordmark with luxury star insignia */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Sanctuário Hotel & Spa"
          >
            <span className="font-serif text-lg tracking-[0.2em] font-medium text-[#F3EDE2] group-hover:text-[#C5A059] transition-colors uppercase">
              Sanctuário
            </span>
            <span className="text-[10px] tracking-widest text-[#C5A059] font-medium font-serif border-l border-[#C5A059]/40 pl-2">
              5★
            </span>
          </a>
        </div>

        {/* Zone 2: Single-line controls for Currency & Language */}
        <div className="flex items-center gap-2">
          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyOpen(!currencyOpen);
                setLangOpen(false);
              }}
              className="h-8 px-2.5 rounded text-xs font-medium tracking-wider text-[#D5CDBC] hover:text-[#F3EDE2] hover:bg-[#231E1A] transition-colors flex items-center gap-1 border border-[#C5A059]/20 whitespace-nowrap"
              aria-label="Selecionar Moeda"
            >
              <span>{CURRENCIES[currentCurrency].symbol}</span>
              <span className="text-[11px] text-[#A69C8A]">{currentCurrency}</span>
              <ChevronDown className="w-3 h-3 text-[#A69C8A]" />
            </button>

            {currencyOpen && (
              <div className="absolute right-0 mt-1.5 w-28 bg-[#1B1714] border border-[#C5A059]/30 rounded-lg shadow-2xl py-1 z-50">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      onCurrencyChange(code);
                      setCurrencyOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-xs text-left flex items-center justify-between text-[#E8E2D9] hover:bg-[#2A241F] transition-colors"
                  >
                    <span>{CURRENCIES[code].label}</span>
                    {currentCurrency === code && <Check className="w-3 h-3 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setCurrencyOpen(false);
              }}
              className="h-8 px-2 rounded text-xs font-medium tracking-wider text-[#D5CDBC] hover:text-[#F3EDE2] hover:bg-[#231E1A] transition-colors flex items-center gap-1 border border-[#C5A059]/20 uppercase whitespace-nowrap"
              aria-label="Selecionar Idioma"
            >
              <span>{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-[#A69C8A]" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1.5 w-24 bg-[#1B1714] border border-[#C5A059]/30 rounded-lg shadow-2xl py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-xs text-left flex items-center justify-between text-[#E8E2D9] hover:bg-[#2A241F] transition-colors"
                  >
                    <span>{lang.label}</span>
                    {currentLanguage === lang.code && <Check className="w-3 h-3 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: 1-2 primary VIP actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded text-xs font-medium text-[#C5A059] border border-[#C5A059]/40 hover:bg-[#C5A059]/10 transition-colors whitespace-nowrap"
            title="Concierge Virtual 5★"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]" />
            </span>
            <span>Concierge IA</span>
          </button>

          <button
            onClick={handleShareClick}
            className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-[#25201C] flex items-center justify-center text-[#C5A059] hover:border-[#C5A059] hover:bg-[#2E2722] transition-colors"
            title={copied ? 'Link copiado!' : 'Copiar link de acesso'}
            aria-label="Copiar link de acesso"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-[#25201C] flex items-center justify-center text-[#C5A059] hover:border-[#C5A059] hover:bg-[#2E2722] transition-colors"
            aria-label="Perfil VIP Hóspede"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
