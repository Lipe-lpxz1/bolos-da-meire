import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, User, Bot, X, MessageCircle } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import Markdown from 'react-markdown';
import { useCart } from '../context/CartContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function GeminiAssistant() {
  const { items, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: "Olá! Sou o assistente da Maria Formiga. Posso te ajudar a escolher o bolo perfeito para sua ocasião ou sugerir combinações de sabores. O que você tem em mente?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, orderSummary]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          {
            role: "user",
            parts: [{ text: `Você é o vendedor da Maria Formiga (Jaraguá-GO). Seja direto e focado em fechar a venda.
            
            CARRINHO ATUAL DO CLIENTE:
            ${items.length > 0 
              ? items.map(i => `- ${i.quantity}x ${i.name}`).join('\n') 
              : 'O carrinho está vazio.'}
            Total no carrinho: R$ ${totalPrice.toFixed(2).replace('.', ',')}

            CATÁLOGO ATUAL:
            1. Red Velvet Supreme (R$ 120,00) - O clássico vibrante.
            2. Naked Cake de Frutas (R$ 150,00) - Rústico e fresco.
            3. Chocolate Belga 70% (R$ 110,00) - Intenso e sofisticado.
            4. Limão Siciliano & Mirtilo (R$ 95,00) - Refrescante.
            5. Pistache & Framboesa (R$ 165,00) - Sofisticado para festas.
            6. Caramelo Salgado & Nozes (R$ 130,00) - Equilíbrio perfeito.
            7. Vegano de Coco & Manga (R$ 115,00) - Opção leve e ética.
            8. Drip Cake de Morango (R$ 140,00) - Visual moderno e festivo.

            REGRAS:
            - Responda de forma curta e objetiva.
            - Se o cliente perguntar o que tem no carrinho, informe com base no CARRINHO ATUAL acima.
            - Se o cliente demonstrar interesse em comprar, use a ferramenta 'anotarPedido' para resumir o que ele quer.
            - Localização: Rua dos Araças, qd54 lt17, Jaraguá-GO.

            Pergunta do cliente: ${userMsg}` }]
          }
        ],
        config: {
          tools: [
            { googleSearch: {} },
            {
              functionDeclarations: [
                {
                  name: "anotarPedido",
                  description: "Resume o pedido do cliente para ser enviado ao WhatsApp.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      resumo: {
                        type: Type.STRING,
                        description: "Um resumo detalhado do pedido (itens, quantidades, observações)."
                      }
                    },
                    required: ["resumo"]
                  }
                }
              ]
            }
          ],
          systemInstruction: "Você é um vendedor de elite da confeitaria Maria Formiga. Seu tom é persuasivo, direto e focado em conversão. Quando o cliente decidir o que quer, chame a função 'anotarPedido' com o resumo do pedido. 🍰"
        }
      });

      const functionCalls = response.functionCalls;
      if (functionCalls) {
        for (const call of functionCalls) {
          if (call.name === "anotarPedido") {
            const { resumo } = call.args as { resumo: string };
            setOrderSummary(resumo);
            setMessages(prev => [...prev, { role: 'bot', content: "Excelente escolha! Já anotei tudo aqui. Clique no botão abaixo para me enviar esse pedido direto no WhatsApp da Maria Formiga e finalizarmos!" }]);
          }
        }
      } else {
        const botMsg = response.text || "Desculpe, tive um pequeno problema técnico. Pode repetir?";
        setMessages(prev => [...prev, { role: 'bot', content: botMsg }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: "Ops! Parece que meus fornos estão um pouco quentes demais no momento. Tente novamente em instantes." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    if (!orderSummary) return;
    const text = encodeURIComponent(`Olá Maria Formiga! Gostaria de fazer um pedido:\n\n${orderSummary}`);
    window.open(`https://wa.me/5562986119347?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-brand-chocolate text-brand-cream rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-20 transition-opacity" />
        <Sparkles className="w-8 h-8" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-48 right-8 z-50 w-[380px] h-[550px] bg-white rounded-[32px] shadow-2xl border border-brand-chocolate/5 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-brand-chocolate text-brand-cream flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-serif font-medium">Vendedor Maria Formiga</h4>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">IA Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-brand-cream/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-rose/20 text-brand-rose' : 'bg-brand-chocolate/10 text-brand-chocolate'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-rose text-white' : 'bg-white shadow-sm border border-brand-chocolate/5'}`}>
                      <div className="markdown-body">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {orderSummary && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4 mt-4"
                >
                  <h5 className="font-serif font-bold text-brand-chocolate mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Resumo do Pedido
                  </h5>
                  <p className="text-xs text-brand-chocolate/80 mb-4 whitespace-pre-wrap">{orderSummary}</p>
                  <button 
                    onClick={sendToWhatsApp}
                    className="w-full py-3 bg-green-600 text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar para WhatsApp
                  </button>
                </motion.div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-chocolate/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-chocolate/30 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-chocolate/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-chocolate/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-brand-chocolate/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Diga o que você quer pedir..."
                  className="w-full pl-4 pr-12 py-3 bg-brand-cream/50 border border-brand-chocolate/10 rounded-full text-sm focus:outline-none focus:border-brand-rose transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-chocolate text-brand-cream rounded-full hover:bg-brand-chocolate/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
