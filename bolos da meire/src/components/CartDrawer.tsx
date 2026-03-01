import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [notes, setNotes] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Olá Maria Formiga! Gostaria de fazer um pedido:\n\n` +
      items.map(item => `• ${item.quantity}x ${item.name} (${item.price})`).join('\n') +
      (notes ? `\n\n📝 Observações: ${notes}` : '') +
      `\n\nTotal: ${formatCurrency(totalPrice)}\n\n` +
      `Como podemos prosseguir com o pagamento e entrega?`
    );
    window.open(`https://wa.me/5562986119347?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-[60] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-chocolate/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-brand-chocolate" />
                <h2 className="text-2xl font-serif">Seu Carrinho</h2>
                <span className="bg-brand-chocolate text-brand-cream text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-brand-rose/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-brand-chocolate" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-rose/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-brand-rose" />
                  </div>
                  <div>
                    <p className="text-xl font-serif">Seu carrinho está vazio</p>
                    <p className="text-brand-chocolate/60">Que tal adicionar um bolo delicioso?</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-brand-chocolate text-brand-cream rounded-full font-medium hover:scale-105 transition-transform"
                  >
                    Ver Bolos
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div 
                        layout
                        key={item.id}
                        className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-brand-chocolate/5"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-serif text-lg leading-tight mb-1">{item.name}</h3>
                          <p className="text-brand-gold font-medium mb-3">{item.price}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-brand-cream rounded-full px-3 py-1 border border-brand-chocolate/10">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-brand-rose transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-brand-rose transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Notes Field */}
                  <div className="mt-8">
                    <label className="block text-sm font-medium text-brand-chocolate/70 mb-2 px-1">
                      Observações / Notas do Pedido
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Retirar na loja às 15h, escrever 'Parabéns' no bolo, etc..."
                      className="w-full p-4 bg-white border border-brand-chocolate/10 rounded-2xl text-sm focus:outline-none focus:border-brand-rose transition-colors resize-none h-32"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-brand-chocolate/10 space-y-4">
                <div className="flex items-center justify-between text-xl font-serif">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 bg-brand-chocolate text-brand-cream rounded-full font-medium flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-brand-chocolate/20"
                >
                  <Send className="w-5 h-5" />
                  Finalizar Pedido via WhatsApp
                </button>
                <p className="text-center text-xs text-brand-chocolate/50">
                  Você será redirecionado para o WhatsApp para concluir seu pedido.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
