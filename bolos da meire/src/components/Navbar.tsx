import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Home, Cake, Info, MessageCircle, Instagram } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Início', href: '#home', icon: Home },
    { name: 'Nossos Bolos', href: '#bolos', icon: Cake },
    { name: 'Sobre Nós', href: '#sobre', icon: Info },
    { name: 'Contato', href: '#contato', icon: MessageCircle },
  ];

  return (
    <>
      {/* Horizontal Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-chocolate/5 h-24 flex items-center justify-between px-6 md:px-12">
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-serif font-bold text-brand-chocolate leading-none tracking-tighter">
            Maria Formiga
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-brand-gold font-semibold mt-1.5">
            Confeitaria Artesanal
          </span>
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-sm font-medium text-brand-chocolate hover:text-brand-gold transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
            </a>
          ))}
          <div className="w-px h-6 bg-brand-chocolate/10 mx-2" />
          <a 
            href="https://www.instagram.com/_mariaformigabolos/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-chocolate hover:text-brand-gold transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-brand-chocolate text-brand-cream rounded-full text-sm font-medium hover:scale-105 transition-transform relative"
          >
            <ShoppingBag className="w-4 h-4" />
            Sacola
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-rose text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-cream">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="lg:hidden flex items-center gap-2">
          <button 
            onClick={onOpenCart}
            className="p-2 text-brand-chocolate relative"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-brand-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-chocolate">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-[60] bg-brand-chocolate text-brand-cream p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold text-brand-gold">Maria Formiga</span>
              <button onClick={() => setIsOpen(false)} className="p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif flex items-center gap-4"
                >
                  <item.icon className="w-6 h-6 text-brand-gold" />
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
