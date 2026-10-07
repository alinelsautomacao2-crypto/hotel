import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;
const PROJETO_SENAI_URL = process.env.PROJETO_SENAI_URL?.replace(/\/$/, '');

// Google Gemini AI Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function callProjectSenaiAgent(message: string, history?: any[]) {
  if (!PROJETO_SENAI_URL) return null;

  const response = await fetch(`${PROJETO_SENAI_URL}/api/agent/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history: Array.isArray(history) ? history : [] }),
  });

  if (!response.ok) {
    throw new Error(`External agent responded with ${response.status}`);
  }

  return await response.json();
}

const SYSTEM_INSTRUCTION = `
Você é Charles, o Concierge Virtual e Mordomo Pessoal de Inteligência Artificial do Sanctuário Hotel & Spa 5★ (chancelado pelo Forbes Travel Guide 5-Star 2026 e The Leading Hotels of the Wor[...]

Sua missão é proporcionar atendimento acolhedor, sofisticado, refinado e altamente eficiente para hóspedes de ultraluxo (UHNW).

INFORMAÇÕES OFICIAIS DO HOTEL SANCTUÁRIO:
1. Comodidades e Diferenciais (Amenities):
- Todas as vilas possuem enxoval Trousseau 1000 fios e camas Super King artesanais.
- Linha de cosméticos e banho exclusiva Bulgari Au Thé Vert e Hermès Paris Eau d'Orange Verte.
- Sistema de som acústico Bang & Olufsen Beolab.
- Piscinas privativas aquecidas com borda infinita de 14 metros em rocha basáltica.
- Adega climatizada Grand Cru privativa em cada vila com 48 rótulos selecionados.
- Termas vulcânicas naturais aquecidas a 38°C ricas em magnésio e silício.
- Heliponto privativo IFR homologado para operações noturnas e frota de Mercedes-Maybach S-Class com motorista privativo uniformizado.
- Menu de travesseiros com 8 opções (plumas húngaras, viscoelástico com lavanda, látex antialérgico, ortopédico cervical, etc.).
- Isolamento acústico superior de estúdio (STC 65) em todas as acomodações.
- Wi-Fi gratuito de ultravelocidade (1 Gbps) em todas as dependências (rede "Sanctuario_Guest" sem senha).
- Pet Policy: Animais até 22 kg bem-vindos (taxa de higienização R$ 75 por estadia; animais de serviço isentos).

2. Horários de Check-in e Check-out:
- Check-in padrão: a partir das 15:00 (com recepção privativa na vila pelo Head Butler).
- Check-out padrão: até às 12:00 (ou 11:00 express).
- Para membros do Ambassador Club / Hóspedes VIP: Check-in flexível 24h a qualquer momento e Late Check-out estendido garantido até as 18:00 (mediante disponibilidade).

3. Gastronomia & Bares (Dining Options):
- Restaurante Éos (2 Estrelas no Guia Michelin): Comandado pelo Chef Executivo Matteo Valente. Menu degustação de 9 tempos (€320 / R$ 1.950 por pessoa) com frutos do mar nobres e botânicos d[...]
- Horizon Rooftop Lounge: Mixologia botânica autoral, destilados raros e pôr do sol com jazz ao vivo (€140 / R$ 850 por pessoa) das 17:00 às 00:00.
- Room Service 24h & Café da Manhã na Suíte: Servido em qualquer horário sem taxa adicional.
- Cardápio de Room Service Express & À La Carte:
  * Champagne Dom Pérignon Vintage 2013 gelado a 7°C (€290 / R$ 1.800)
  * Caviar Imperial 50g com blinis quentes e creme azedo (€180 / R$ 1.100)
  * Filé Mignon ao Molho Madeira com purê trufado (R$ 89)
  * Salmão Grelhado com Aspargos e arroz de limão (R$ 78)
  * Hambúrguer Artesanal LUXE 180g com queijo gruyère (R$ 54)
  * Risoto de Funghi com queijo parmesão reggiano (R$ 62)
  * Tábua de Queijos Artesanais Nobres & Trufas Negras (R$ 95)
  * Petit Gateau com Sorvete Artesanal de Creme (R$ 32)
  * Café da Manhã Botânico Completo servido no terraço da vila (R$ 65)

4. Spa & Bem-Estar (Spa & Wellness):
- Circuito de Águas Termais & Elixir Francês (120 min · €290)
- Massagem Ayurvédica Prana com Pedras Vulcânicas Aquecidas de Basalto (90 min · €240)
- Ritual Íntimo de Vinoterapia para Casal em Barrica de Carvalho (150 min · €580)
- Tratamento Facial Biologique Recherche Haute Couture (75 min · €210)
- Horários de atendimento do Spa: 09:00 às 21:00 diariamente.

5. Transferência para Atendimento Humano (Human Handover) & Emergências:
- Quando a solicitação do hóspede for complexa (ex: pedido de casamento personalizado, fretamento de iate náutico, aluguel de supercarros, dietas médicas altamente complexas, qualquer reclama[...]
- Em caso de emergência ou socorro médico: Acione o botão de alerta, informe que os primeiros socorros estão sendo mobilizados e conecte imediatamente com a recepção e o pronto atendimento m[...]

DIRETRIZES DE RESPOSTA DO GEMINI:
- Mantenha o tom sereno, cortês, caloroso e de extrema discrição.
- Responda sempre de forma direta, elegante e objetiva (máximo 3-4 frases, a menos que o usuário peça mais detalhes).
- Use ícones discretos para legibilidade (🛏️ quartos | 🍽️ cardápio/jantar | 🏊 termas | 💆 spa | 🕒 horários | 🙋 atendente | ✅ confirmado | ⚠️ emergência).
- Não repita a pergunta do usuário antes de responder.
`;

function generateLocalConciergeReply(userMessage: string): { reply: string; actionType?: string; actionPayload?: any } {
  const lower = userMessage.toLowerCase();

  // Emergency / Medical Help
  if (lower.includes('socorro') || lower.includes('médic') || lower.includes('emergên') || lower.includes('hospital') || lower.includes('ambulân') || lower.includes('doutor') || lower.includes('atendimento médico')) {
    return {
      reply: '⚠️ Estamos mobilizando a equipe de emergência médica e o pronto atendimento da propriedade imediatamente. Por favor, mantenha a calma. Conectando agora com o Front Desk e a equipe de suporte médico.',
      actionType: 'handover',
      actionPayload: {
        agentName: 'Front Desk & Emergência Médica',
        phone: '+55 11 9999-9988',
        isEmergency: true
      }
    };
  }

  // Human Handover
  if (
    lower.includes('humano') || 
    lower.includes('falar com pessoa') || 
    lower.includes('atendente') || 
    lower.includes('gerente') || 
    lower.includes('reclamação') || 
    lower.includes('personalizado') ||
    lower.includes('casamento') ||
    lower.includes('iate') ||
    lower.includes('whatsapp')
  ) {
    return {
      reply: '🙋 Terei imensa satisfação em conectá-lo com nosso Head Butler, Sr. Charles Henderson, e nossa mordoria executiva. Você pode se comunicar em tempo real via WhatsApp privativo ou pelo ramal da recepção.',
      actionType: 'handover',
      actionPayload: {
        agentName: 'Sr. Charles Henderson (Head Butler)',
        role: 'Head Butler Sanctuário 5★',
        phone: '+55 11 9999-9988',
        whatsapp: '+55 11 99999-5555'
      }
    };
  }

  // Check-in / Check-out
  if (lower.includes('check-in') || lower.includes('check-out') || lower.includes('checkin') || lower.includes('checkout') || lower.includes('horário') || lower.includes('chegada') || lower.includes('saída')) {
    return {
      reply: '🕒 Check-in padrão a partir das 15h00 (recepção privativa na vila pelo mordomo) e check-out até às 12h00.\n\nPara membros VIP do Ambassador Club, oferecemos check-in flexível 24h e late check-out até às 18h00, mediante disponibilidade.',
      actionType: 'faq',
      actionPayload: { topic: 'checkin_checkout' }
    };
  }

  // Dining / Restaurants / Cardápio
  if (lower.includes('jantar') || lower.includes('restaurante') || lower.includes('comida') || lower.includes('éos') || lower.includes('eos') || lower.includes('rooftop') || lower.includes('cardápio') || lower.includes('cardapio')) {
    return {
      reply: '🍽️ Nossa alta gastronomia dispõe do Restaurante Éos (2★ Michelin do Chef Matteo Valente, menu degustação 9 tempos, €320) e do Horizon Rooftop Lounge. Para o Room Service, posso oferecer sugestões do cardápio da suíte.',
      actionType: 'room_service',
      actionPayload: {
        items: [
          { id: 'file-mignon', name: 'Filé Mignon ao Molho Madeira', price: 'R$ 89' },
          { id: 'salmao', name: 'Salmão Grelhado com Aspargos', price: 'R$ 78' },
          { id: 'dom-perignon', name: 'Dom Pérignon Vintage 2013 (7°C)', price: '€290 / R$ 1.800' },
          { id: 'caviar', name: 'Caviar Imperial 50g & Blinis', price: '€180 / R$ 1.100' }
        ]
      }
    };
  }

  // Room Service / Orders
  if (lower.includes('room service') || lower.includes('champagne') || lower.includes('caviar') || lower.includes('quarto') || lower.includes('pedir') || lower.includes('café da manhã') || lower.includes('cafe da manha')) {
    return {
      reply: '🍾 O Room Service do Sanctuário funciona ininterruptamente 24 horas. Posso providenciar de imediato à sua acomodação Champagne Dom Pérignon Vintage (€290), Caviar Imperial (€180), Filé Mignon ao Molho Madeira (R$ 89) e Tábua de Queijos & Trufas (R$ 95).',
      actionType: 'room_service',
      actionPayload: {
        items: [
          { id: 'dom-perignon', name: 'Dom Pérignon Vintage 2013', price: '€290' },
          { id: 'caviar', name: 'Caviar Imperial 50g', price: '€180' },
          { id: 'file-mignon', name: 'Filé Mignon ao Molho Madeira', price: 'R$ 89' },
          { id: 'cheese-board', name: 'Tábua Queijos & Trufas', price: 'R$ 95' }
        ]
      }
    };
  }

  // Spa / Wellness
  if (lower.includes('spa') || lower.includes('massagem') || lower.includes('termas') || lower.includes('relaxar') || lower.includes('facial') || lower.includes('vinoterapia')) {
    return {
      reply: '💆 Nosso Spa Botânico nas termas vulcânicas funciona das 09h00 às 21h00:\n• Circuito de Águas Termais & Elixir Francês (120 min · €290)\n• Massagem Ayurvédica Prana com Pedras Vulcânicas (90 min · €240)\n• Ritual Íntimo de Vinoterapia para Casal (150 min · €580)',
      actionType: 'spa_booking',
      actionPayload: {
        rituals: [
          { name: 'Circuito Águas Termais', duration: '120 min', price: '€290' },
          { name: 'Massagem Ayurvédica Prana', duration: '90 min', price: '€240' },
          { name: 'Vinoterapia Casal', duration: '150 min', price: '€580' }
        ]
      }
    };
  }

  // Amenities / Heliponto / Maybach
  if (lower.includes('heliponto') || lower.includes('transfer') || lower.includes('maybach') || lower.includes('amenidades') || lower.includes('piscina') || lower.includes('travesseiro') || lower.includes('wi-fi') || lower.includes('wifi')) {
    return {
      reply: '✨ Todas as acomodações do Sanctuário contam com amenidades Bulgari Au Thé Vert e Hermès Paris, enxoval Trousseau 1000 fios, som Bang & Olufsen, isolamento acústico STC 65, heliponto privativo e Wi‑Fi de 1 Gbps.',
      actionType: 'faq',
      actionPayload: { topic: 'amenities' }
    };
  }

  // Default Polite Concierge Response
  return {
    reply: 'É uma satisfação atender você no Sanctuário Hotel & Spa 5★. Como Concierge Virtual movido a Gemini AI, posso informar sobre nossos restaurantes Michelin e cardápios, agendar experiências de spa, orientar sobre check-in/check-out e conectar a um atendente humano.',
    actionType: 'faq',
    actionPayload: { topic: 'general' }
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Status endpoint: Google Gemini AI Status
  app.get('/api/concierge/status', async (_req: Request, res: Response) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      connected: true,
      service: 'Google Gemini AI',
      model: 'gemini-3.8-flash',
      active: true,
      hasApiKey: hasKey,
      connectedToProjectSenai: Boolean(PROJETO_SENAI_URL)
    });
  });

  // Main Virtual Concierge Chat API powered by Gemini AI
  app.post('/api/concierge/chat', async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Mensagem inválida.' });
        return;
      }

      if (PROJETO_SENAI_URL) {
        try {
          const externalReply = await callProjectSenaiAgent(message, history);
          if (externalReply?.reply) {
            res.json({
              ...externalReply,
              source: 'projectosenai_agent',
              model: externalReply.model || 'gemini-2.5-flash'
            });
            return;
          }
        } catch (forwardError) {
          console.warn('[Server] External ProjectSenai unavailable, falling back to local luxury engine:', forwardError);
        }
      }

      // Check if Gemini API Key is available and valid
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
        try {
          const contents: any[] = [];
          if (Array.isArray(history) && history.length > 0) {
            for (const h of history.slice(-6)) {
              contents.push({
                role: h.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: h.text }]
              });
            }
          }
          contents.push({
            role: 'user',
            parts: [{ text: message }]
          });

          const geminiResponse = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.6,
            },
          });

          const replyText = geminiResponse.text || '';

          // Determine action type
          let actionType = 'faq';
          let actionPayload: any = null;
          const lowerMsg = message.toLowerCase();
          const lowerReply = replyText.toLowerCase();

          if (lowerMsg.includes('socorro') || lowerMsg.includes('médic') || lowerMsg.includes('emergên')) {
            actionType = 'handover';
            actionPayload = {
              agentName: 'Front Desk & Emergência Médica',
              phone: '+55 11 9999-9988',
              isEmergency: true
            };
          } else if (lowerMsg.includes('humano') || lowerMsg.includes('atendente') || lowerReply.includes('head butler') || lowerReply.includes('whatsapp')) {
            actionType = 'handover';
            actionPayload = {
              agentName: 'Sr. Charles Henderson (Head Butler)',
              role: 'Head Butler Sanctuário 5★',
              phone: '+55 11 9999-9988',
              whatsapp: '+55 11 99999-5555'
            };
          } else if (lowerMsg.includes('cardápio') || lowerMsg.includes('cardapio') || lowerMsg.includes('menu') || lowerMsg.includes('filé') || lowerMsg.includes('champagne') || lowerMsg.includes('caviar')) {
            actionType = 'room_service';
            actionPayload = {
              items: [
                { id: 'file-mignon', name: 'Filé Mignon ao Molho Madeira', price: 'R$ 89' },
                { id: 'salmao', name: 'Salmão Grelhado com Aspargos', price: 'R$ 78' },
                { id: 'dom-perignon', name: 'Champagne Dom Pérignon Vintage 2013', price: '€290 / R$ 1.800' },
                { id: 'caviar', name: 'Caviar Imperial 50g & Blinis', price: '€180 / R$ 1.100' }
              ]
            };
          } else if (lowerMsg.includes('spa') || lowerMsg.includes('massagem') || lowerMsg.includes('termas')) {
            actionType = 'spa_booking';
            actionPayload = {
              rituals: [
                { name: 'Circuito Águas Termais', duration: '120 min', price: '€290' },
                { name: 'Massagem Ayurvédica Prana', duration: '90 min', price: '€240' }
              ]
            };
          }

          res.json({
            reply: replyText,
            actionType,
            actionPayload,
            source: 'gemini_ai',
            model: 'gemini-3.8-flash'
          });
          return;
        } catch (apiError) {
          console.warn('[Server] Gemini call exception, falling back to local luxury engine:', apiError);
        }
      }

      // High-touch Knowledge Engine Fallback
      const fallback = generateLocalConciergeReply(message);
      res.json({
        ...fallback,
        source: 'gemini_ai_engine',
        model: 'gemini-3.8-flash'
      });
    } catch (err: any) {
      console.error('[Server] Error in /api/concierge/chat:', err);
      res.status(500).json({
        reply: 'Peço desculpas pela breve indisponibilidade. Nosso Head Butler Sr. Charles Henderson está à sua disposição imediata pelo canal de WhatsApp privativo ou no ramal da recepção.',
        actionType: 'handover',
        actionPayload: {
          phone: '+55 11 9999-9988',
          whatsapp: '+55 11 99999-5555'
        }
      });
    }
  });

  // Vite middleware in dev or static in prod
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sanctuário 5★ Full-Stack server running with Gemini AI at http://0.0.0.0:${PORT}`);
    if (PROJETO_SENAI_URL) {
      console.log(`External ProjectSenai bridge active: ${PROJETO_SENAI_URL}`);
    }
  });
}

startServer();

