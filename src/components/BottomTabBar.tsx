import React from 'react';
import { Compass, BedDouble, CalendarCheck, Sparkles, MessageSquare } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/mockData';

export type TabKey = 'home' | 'suites' | 'book' | 'experiences' | 'concierge';

interface BottomTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  language: LanguageCode;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  language
}) => {
  const t = TRANSLATIONS[language];

  const tabs: { key: TabKey; label: string; icon: React.ElementType; isAction?: boolean }[] = [
    { key: 'home', label: t.navHome, icon: Compass },
    { key: 'suites', label: t.navSuites, icon: BedDouble },
    { key: 'book', label: t.navBook, icon: CalendarCheck, isAction: true },
    { key: 'experiences', label: t.navExperiences, icon: Sparkles },
    { key: 'concierge', label: t.navConcierge, icon: MessageSquare }
  ];

  return (
    <nav
      aria-label="Navegação Principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#161311]/95 backdrop-blur-lg border-t border-[#C5A059]/20"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-md md:max-w-2xl mx-auto h-16 grid grid-cols-5 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          if (tab.isAction) {
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className="group relative flex flex-col items-center justify-center min-h-[48px] focus:outline-none"
                aria-label={tab.label}
              >
                <div
                  className={`w-11 h-11 -mt-4 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                    isActive
                      ? 'bg-[#C5A059] text-[#161311] ring-2 ring-[#C5A059]/50 shadow-[#C5A059]/30'
                      : 'bg-[#25201C] text-[#C5A059] border border-[#C5A059]/40 hover:bg-[#C5A059]/20'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap truncate max-w-[64px] ${
                    isActive ? 'text-[#C5A059]' : 'text-[#8E8577]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex flex-col items-center justify-center min-h-[48px] px-1 py-1 focus:outline-none transition-colors"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-[#C5A059] stroke-[2.2]' : 'text-[#7A7163] group-hover:text-[#A69C8A]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C5A059]" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap truncate max-w-[64px] transition-colors ${
                  isActive ? 'text-[#F3EDE2] font-semibold' : 'text-[#8E8577]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
