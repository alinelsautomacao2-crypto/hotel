import React, { useState, useRef, useEffect } from 'react';
import { CurrencyCode, LanguageCode } from '../types';
import { getWhatsAppButlerLink } from '../utils/formatters';
import { 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Check, 
  Clock, 
  UtensilsCrossed, 
  Wine, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Bot,
  AlertTriangle,
  Cpu
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionType?: 'room_service' | 'spa_booking' | 'handover' | 'faq' | 'order_confirmed' | 'spa_confirmed' | 'language_selection' | 'main_menu';
  actionPayload?: any;
}

interface VirtualConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  language: LanguageCode;
  initialPrompt?: string;
}

export const VirtualConciergeChatModal: React.FC<VirtualConciergeChatModalProps> = ({
  isOpen,
  onClose,
  currency,
  language,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Saudações distintas. Sou Charles, seu Concierge Virtual 5★ do Sanctuário Hotel & Spa, impulsionado por Gemini AI.',
      timestamp: 'Agora'
    },
    {
      id: 'welcome-2',
      sender: 'assistant',
      text: 'Como posso servi-lo hoje?\n🛏️ 1. Informações de vilas e diárias\n🍽️ 2. Cardápio e pedidos de Room Service\n🏊 3. Comodidades exclusivas e Spa Termal\n🕒 4. Horários de check-in e check-out\n🙋 5. Falar diretamente com mordomo humano',
      timestamp: 'Agora'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Handle optional initial prompt
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const quickQuestions = [
    { label: '🍽️ Cardápio e Room Service', text: 'Quero ver o cardápio de room service e opções para o jantar.' },
    { label: '🕒 Check-in e Check-out', text: 'Quais são os horários de check-in e check-out?' },
    { label: '🛏️ Quartos e Tarifas', text: 'Quais são as opções de quartos, vilas e diárias?' },
    { label: '💆‍♀️ Agendar Spa Termal', text: 'Quais são os rituais de spa disponíveis e valores?' },
    { label: '✨ Wi-Fi e Pet Policy', text: 'Como funciona o Wi-Fi e qual a política para pets?' },
    { label: '🙋 Falar com Atendente Humano', text: 'Gostaria de falar com um atendente humano agora.' },
    { label: '⚠️ Ajuda Médica / Emergência', text: 'Preciso de ajuda médica de emergência.' }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.sender, text: m.text })),
          language
        })
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o concierge');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Estou à sua disposição para qualquer detalhe adicional.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType: data.actionType,
        actionPayload: data.actionPayload
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Fallback to local luxury response engine:', err);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'Agradeço por sua mensagem. Terei prazer em assistir com sua estadia. Se desejar atendimento imediato, nosso Front Desk e Head Butler estão disponíveis pelo telefone +55 (11) 9999-9988 ou WhatsApp.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType: 'handover',
        actionPayload: {
          agentName: 'Front Desk & Head Butler',
          phone: '+55 11 9999-9988',
          whatsapp: '+55 11 99999-5555'
        }
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmRoomService = (itemTitle: string, price: string) => {
    const orderCode = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmMsg: ChatMessage = {
      id: `confirm-${Date.now()}`,
      sender: 'assistant',
      text: `✅ Pedido confirmado: ${itemTitle} (${price}) anotado para entrega na sua acomodação em aproximadamente 25 minutos. Localizador: ${orderCode}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionType: 'order_confirmed',
      actionPayload: { orderCode, itemTitle, price }
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  const handleConfirmSpaSlot = (ritualName: string, slot: string) => {
    const spaCode = `SPA-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmMsg: ChatMessage = {
      id: `confirm-spa-${Date.now()}`,
      sender: 'assistant',
      text: `✅ Agendamento confirmado: ${ritualName} reservado para hoje às ${slot}. A equipe do Spa Termal aguardará sua presença. Localizador: ${spaCode}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionType: 'spa_confirmed',
      actionPayload: { spaCode, ritualName, slot }
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concierge-chatbot-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      <div
        className={`w-full bg-[#161311] border border-[#C5A059]/30 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isFullScreen 
            ? 'h-full max-w-4xl' 
            : 'h-[92vh] sm:h-[680px] max-w-md sm:max-w-lg'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1F1A17] border-b border-[#C5A059]/25 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#27211D] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#1F1A17]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 id="concierge-chatbot-title" className="font-serif text-base text-[#F3EDE2] font-medium">
                  Charles
                </h2>
                <span className="text-[10px] text-[#C5A059] font-medium border border-[#C5A059]/30 rounded px-1.5 py-0.2">
                  5★ Virtual Concierge
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#A69C8A] font-light">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span className="truncate max-w-[170px] sm:max-w-[240px]">
                  Google Gemini AI (gemini-3.8-flash)
                </span>
                <span aria-hidden="true" className="text-[#C5A059]/40">·</span>
                <span className="text-emerald-400 font-medium">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="hidden sm:flex w-8 h-8 rounded-full hover:bg-[#25201C] text-[#A69C8A] hover:text-[#E8E2D9] items-center justify-center transition-colors"
              aria-label={isFullScreen ? 'Minimizar' : 'Tela cheia'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#27211D] border border-[#C5A059]/30 flex items-center justify-center text-[#D5CDBC] hover:text-[#F3EDE2] hover:border-[#C5A059] transition-colors"
              aria-label="Fechar concierge virtual"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#C5A059] text-[#161311] font-medium rounded-br-none shadow-md'
                      : 'bg-[#1F1A17] text-[#E8E2D9] border border-[#C5A059]/20 font-light rounded-bl-none shadow-lg'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                <span className="text-[10px] text-[#6E6557] mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Interactive Card: Room Service Quick Orders (from Azure Knowledge Base) */}
                {msg.actionType === 'room_service' && (
                  <div className="mt-2.5 w-full max-w-[90%] bg-[#1E1A17] border border-[#C5A059]/35 rounded-xl p-3 space-y-2 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase">
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Cardápio À La Carte — Pedir com 1 Toque</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => handleConfirmRoomService('Filé Mignon ao Molho Madeira', 'R$ 89')}
                        className="w-full text-left p-2 rounded bg-[#27211D] border border-[#C5A059]/20 hover:border-[#C5A059] flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-medium text-[#F3EDE2] group-hover:text-[#C5A059]">
                            Filé Mignon ao Molho Madeira
                          </div>
                          <div className="text-[10px] text-[#8E8577]">Purê trufado e legumes salteados</div>
                        </div>
                        <span className="text-xs font-serif font-bold text-[#C5A059] shrink-0">R$ 89</span>
                      </button>

                      <button
                        onClick={() => handleConfirmRoomService('Salmão Grelhado com Aspargos', 'R$ 78')}
                        className="w-full text-left p-2 rounded bg-[#27211D] border border-[#C5A059]/20 hover:border-[#C5A059] flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-medium text-[#F3EDE2] group-hover:text-[#C5A059]">
                            Salmão Grelhado (Sem Glúten)
                          </div>
                          <div className="text-[10px] text-[#8E8577]">Crosta de ervas, aspargos e arroz de limão</div>
                        </div>
                        <span className="text-xs font-serif font-bold text-[#C5A059] shrink-0">R$ 78</span>
                      </button>

                      <button
                        onClick={() => handleConfirmRoomService('Hambúrguer Artesanal LUXE', 'R$ 54')}
                        className="w-full text-left p-2 rounded bg-[#27211D] border border-[#C5A059]/20 hover:border-[#C5A059] flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-medium text-[#F3EDE2] group-hover:text-[#C5A059]">
                            Hambúrguer Artesanal LUXE
                          </div>
                          <div className="text-[10px] text-[#8E8577]">Blend 180g, queijo gruyère e batata rústica</div>
                        </div>
                        <span className="text-xs font-serif font-bold text-[#C5A059] shrink-0">R$ 54</span>
                      </button>

                      <button
                        onClick={() => handleConfirmRoomService('Petit Gateau com Sorvete de Creme', 'R$ 32')}
                        className="w-full text-left p-2 rounded bg-[#27211D] border border-[#C5A059]/20 hover:border-[#C5A059] flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-medium text-[#F3EDE2] group-hover:text-[#C5A059]">
                            Petit Gateau (Sobremesa)
                          </div>
                          <div className="text-[10px] text-[#8E8577]">Sorvete artesanal e calda de chocolate quente</div>
                        </div>
                        <span className="text-xs font-serif font-bold text-[#C5A059] shrink-0">R$ 32</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Interactive Card: Spa Booking */}
                {msg.actionType === 'spa_booking' && (
                  <div className="mt-2.5 w-full max-w-[90%] bg-[#1E1A17] border border-[#C5A059]/35 rounded-xl p-3 space-y-2 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Rituais no Spa Termal & Basalto</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="p-2 rounded bg-[#27211D] border border-[#C5A059]/20 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#F3EDE2]">Circuito de Águas Termais (120m)</span>
                          <span className="text-xs font-serif text-[#C5A059] font-bold">€290</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleConfirmSpaSlot('Circuito de Águas Termais', '15:00')}
                            className="px-2 py-1 rounded bg-[#1F1A17] border border-[#C5A059]/30 text-[10px] text-[#D5CDBC] hover:bg-[#C5A059] hover:text-[#161311] transition-colors"
                          >
                            Hoje às 15:00
                          </button>
                          <button
                            onClick={() => handleConfirmSpaSlot('Circuito de Águas Termais', '17:30')}
                            className="px-2 py-1 rounded bg-[#1F1A17] border border-[#C5A059]/30 text-[10px] text-[#D5CDBC] hover:bg-[#C5A059] hover:text-[#161311] transition-colors"
                          >
                            Hoje às 17:30
                          </button>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-[#27211D] border border-[#C5A059]/20 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#F3EDE2]">Massagem Ayurvédica Prana (90m)</span>
                          <span className="text-xs font-serif text-[#C5A059] font-bold">€240</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleConfirmSpaSlot('Massagem Ayurvédica Prana', '16:00')}
                            className="px-2 py-1 rounded bg-[#1F1A17] border border-[#C5A059]/30 text-[10px] text-[#D5CDBC] hover:bg-[#C5A059] hover:text-[#161311] transition-colors"
                          >
                            Hoje às 16:00
                          </button>
                          <button
                            onClick={() => handleConfirmSpaSlot('Massagem Ayurvédica Prana', '18:30')}
                            className="px-2 py-1 rounded bg-[#1F1A17] border border-[#C5A059]/30 text-[10px] text-[#D5CDBC] hover:bg-[#C5A059] hover:text-[#161311] transition-colors"
                          >
                            Hoje às 18:30
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Card: Human Agent Handover & Emergency (Steps 6 & 11) */}
                {msg.actionType === 'handover' && (
                  <div className="mt-2.5 w-full max-w-[90%] bg-[#1E1A17] border border-[#C5A059]/40 rounded-xl p-3.5 space-y-2.5 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#F3EDE2]">
                          {msg.actionPayload?.isEmergency ? '⚠️ Acionamento de Emergência' : 'Transferência para Equipe Humana'}
                        </div>
                        <div className="text-[10px] text-[#A69C8A]">
                          Front Desk & Head Butler Sr. Charles Henderson
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {/* WhatsApp Button */}
                      <a
                        href={getWhatsAppButlerLink('Olá, solicito atendimento privativo de equipe humana para o Sanctuário Hotel & Spa.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-9 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Conversar via WhatsApp Privativo</span>
                      </a>

                      {/* Direct Phone Call to Front Desk */}
                      <a
                        href="tel:+551199999988"
                        className="w-full h-8 rounded-lg bg-[#27211D] border border-[#C5A059]/30 text-[#E8E2D9] hover:text-[#F3EDE2] text-[11px] flex items-center justify-center gap-1.5 transition-colors font-medium"
                      >
                        <Phone className="w-3 h-3 text-[#C5A059]" />
                        <span>Ligar para Front Desk: +55 (11) 9999-9988</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-[#1F1A17] border border-[#C5A059]/20 rounded-2xl rounded-bl-none max-w-[120px] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span className="w-2 h-2 rounded-full bg-[#C5A059]/70" />
              <span className="w-2 h-2 rounded-full bg-[#C5A059]/40" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-[#1A1613] border-t border-[#C5A059]/15 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              className="px-2.5 py-1 rounded-full bg-[#25201C] border border-[#C5A059]/20 text-[11px] text-[#C5BBAA] hover:text-[#F3EDE2] hover:border-[#C5A059]/60 whitespace-nowrap transition-colors"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#1F1A17] border-t border-[#C5A059]/25 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Digite sua dúvida ou pedido (ex: cardápio, check-out, spa)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#27211D] border border-[#C5A059]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#E8E2D9] placeholder-[#776D61] focus:outline-none focus:border-[#C5A059] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-[#C5A059] text-[#161311] flex items-center justify-center hover:bg-[#D9B46E] disabled:opacity-40 disabled:pointer-events-none transition-all duration-150 shrink-0 shadow-md shadow-[#C5A059]/20"
              aria-label="Enviar mensagem ao concierge"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
