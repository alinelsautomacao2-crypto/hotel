/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CurrencyCode, LanguageCode, Accommodation, Experience, ConfirmedReservation } from './types';
import { ACCOMMODATIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomTabBar, TabKey } from './components/BottomTabBar';
import { HomeScreen } from './components/HomeScreen';
import { SuitesScreen } from './components/SuitesScreen';
import { SuiteDetailModal } from './components/SuiteDetailModal';
import { ExperiencesScreen } from './components/ExperiencesScreen';
import { ConciergeScreen } from './components/ConciergeScreen';
import { BookingDrawer } from './components/BookingDrawer';
import { VipProfileModal } from './components/VipProfileModal';
import { VirtualConciergeChatModal } from './components/VirtualConciergeChatModal';
import { Check, Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('EUR');
  const [language, setLanguage] = useState<LanguageCode>('pt');
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Modals & Drawers
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    suiteId?: string;
  } | undefined>(undefined);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Virtual Concierge Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);

  // Experience booked toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Seed with 1 initial VIP reservation
  const [reservations, setReservations] = useState<ConfirmedReservation[]>([
    {
      code: 'SANC-2026-VIP1',
      accommodation: ACCOMMODATIONS[0],
      checkInDate: '2026-10-15',
      checkOutDate: '2026-10-18',
      nights: 3,
      guests: 2,
      totalEUR: 8085,
      guestName: 'Sra. Elena Rostova',
      guestEmail: 'elena@rostova.com',
      guestPhone: '+41 79 123 4567',
      paymentMethod: 'apple_pay',
      addOns: [
        { name: 'Dom Pérignon & Caviar Imperial na Chegada', priceEUR: 290 },
        { name: 'Helitransfer Aeroporto / Sanctuário', priceEUR: 890 }
      ],
      createdAt: '03/10/2026'
    }
  ]);

  const handleTabChange = (tab: TabKey) => {
    if (tab === 'book') {
      setIsBookingOpen(true);
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (initialData?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    suiteId?: string;
  }) => {
    setBookingInitialData(initialData);
    setIsBookingOpen(true);
  };

  const handleSelectAccommodation = (acc: Accommodation) => {
    setSelectedAccommodation(acc);
  };

  const handleProceedToBookFromDetail = (suiteId: string) => {
    setSelectedAccommodation(null);
    handleOpenBooking({ suiteId });
  };

  const handleBookExperience = (exp: Experience, timeSlot: string) => {
    setToastMessage(`Vivência agendada: ${exp.title} às ${timeSlot}. O mordomo entrará em contato.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleReservationConfirmed = (res: ConfirmedReservation) => {
    setReservations((prev) => [res, ...prev]);
  };

  const handleOpenChat = (initialPrompt?: string) => {
    setChatInitialPrompt(initialPrompt);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#100D0B] text-[#E8E2D9] flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#F3EDE2]">
      {/* Mobile-optimized viewport wrapper with luxury desktop framing */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto bg-[#161311] min-h-screen shadow-2xl border-x border-[#C5A059]/15 flex flex-col relative">
        
        {/* Global 3-Zone Luxury Header */}
        <Header
          currentCurrency={currency}
          onCurrencyChange={setCurrency}
          currentLanguage={language}
          onLanguageChange={setLanguage}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenConcierge={() => setActiveTab('concierge')}
          onOpenChat={() => handleOpenChat()}
          onCopyLink={() => {
            setToastMessage('Link de acesso ao Sanctuário 5★ copiado!');
            setTimeout(() => setToastMessage(null), 3500);
          }}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomeScreen
              currency={currency}
              language={language}
              onSelectAccommodation={handleSelectAccommodation}
              onOpenBooking={handleOpenBooking}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'suites' && (
            <SuitesScreen
              currency={currency}
              language={language}
              onSelectAccommodation={handleSelectAccommodation}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activeTab === 'experiences' && (
            <ExperiencesScreen
              currency={currency}
              language={language}
              onBookExperience={handleBookExperience}
              onOpenConcierge={() => setActiveTab('concierge')}
            />
          )}

          {activeTab === 'concierge' && (
            <ConciergeScreen 
              language={language}
              onOpenChat={handleOpenChat}
            />
          )}
        </main>

        {/* Floating Concierge AI Button (Quick Launcher) */}
        <aside aria-label="Acesso ao Concierge Virtual">
          <button
            onClick={() => handleOpenChat()}
            className="fixed bottom-20 right-4 z-30 h-11 px-3.5 rounded-full bg-[#1F1A17] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#161311] shadow-xl shadow-black/60 flex items-center gap-2 group transition-all duration-200 active:scale-95"
            aria-label="Abrir Concierge Virtual IA Charles"
          >
            <div className="relative">
              <Bot className="w-4 h-4 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#161311]" />
            </div>
            <span className="text-xs font-medium tracking-wide">Concierge IA</span>
          </button>
        </aside>

        {/* Global Fixed Bottom Tab Bar */}
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          language={language}
        />

        {/* Virtual Concierge Chatbot Modal */}
        <VirtualConciergeChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          currency={currency}
          language={language}
          initialPrompt={chatInitialPrompt}
        />

        {/* Accommodation Detail Modal (Ficha Técnica) */}
        <SuiteDetailModal
          accommodation={selectedAccommodation}
          currency={currency}
          language={language}
          onClose={() => setSelectedAccommodation(null)}
          onProceedToBook={handleProceedToBookFromDetail}
        />

        {/* Booking Engine Drawer / Modal */}
        <BookingDrawer
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          currency={currency}
          language={language}
          initialData={bookingInitialData}
          onReservationConfirmed={handleReservationConfirmed}
        />

        {/* VIP Profile & Ambassador Tier Modal */}
        <VipProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          currency={currency}
          language={language}
          reservations={reservations}
        />

        {/* Luxury Toast Notification */}
        {toastMessage && (
          <aside
            aria-live="polite"
            className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto bg-[#1F1A17] border border-[#C5A059] rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-fade-in text-xs text-[#E8E2D9]"
          >
            <div className="w-6 h-6 rounded-full bg-[#C5A059] text-[#161311] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-light">{toastMessage}</span>
          </aside>
        )}

      </div>
    </div>
  );
}
