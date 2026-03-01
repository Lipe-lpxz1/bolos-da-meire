import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CakeGrid from './components/CakeGrid';
import About from './components/About';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import CartDrawer from './components/CartDrawer';
import { CartProvider, useCart } from './context/CartContext';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen selection:bg-brand-rose/30">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="pt-24">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CakeGrid />
        </motion.div>

        <About />

        {/* Testimonials Section */}
        <section className="py-24 bg-brand-chocolate text-brand-cream overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">O que dizem nossos <span className="italic">Clientes</span></h2>
              <div className="w-24 h-px bg-brand-gold mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { text: "O bolo de Red Velvet foi o destaque do meu aniversário. Simplesmente divino!" },
                { text: "Atendimento impecável e sabores que nos transportam para a infância." },
                { text: "A sofisticação dos bolos é algo que nunca vi igual em Jaraguá." }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center text-center"
                >
                  <p className="italic text-lg leading-relaxed">"{t.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-brand-rose/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Pronto para tornar seu dia mais <span className="italic">doce</span>?</h2>
            <p className="text-lg text-brand-chocolate/70 mb-10">
              Encomendas personalizadas para casamentos, aniversários e eventos corporativos. 
              Entre em contato e solicite um orçamento.
            </p>
            <a 
              href="https://wa.me/5562986119347" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-chocolate text-brand-cream rounded-full font-medium text-lg hover:scale-105 transition-transform"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <GeminiAssistant />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-28 right-8 z-40 w-16 h-16 bg-brand-chocolate text-brand-cream rounded-full shadow-2xl flex items-center justify-center group"
      >
        <ShoppingBag className="w-8 h-8" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-rose text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-cream">
            {totalItems}
          </span>
        )}
        <span className="absolute right-full mr-4 px-3 py-1 bg-brand-chocolate text-brand-cream text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ver Carrinho
        </span>
      </motion.button>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
