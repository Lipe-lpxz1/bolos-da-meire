import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-12">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1920" 
          alt="Bolo decorado" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/50 via-transparent to-brand-cream" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-brand-gold border border-brand-gold/30 rounded-full">
            Feito com Amor & Tradição
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light leading-tight mb-8">
            Momentos <span className="italic">Doces</span> <br />
            Para Vidas <span className="text-brand-rose">Inesquecíveis</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-brand-chocolate/70 mb-10 font-light leading-relaxed">
            Descubra a arte da confeitaria artesanal. Bolos que contam histórias, 
            feitos com ingredientes selecionados e o toque mágico que você merece.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#bolos" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-chocolate text-brand-cream rounded-full font-medium hover:bg-brand-chocolate/90 transition-all transform hover:scale-105"
            >
              Ver Cardápio
            </a>
            <a 
              href="#contato" 
              className="w-full sm:w-auto px-8 py-4 border border-brand-chocolate text-brand-chocolate rounded-full font-medium hover:bg-brand-chocolate hover:text-brand-cream transition-all"
            >
              Encomendar Agora
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-brand-chocolate/20" />
      </div>
    </section>
  );
}
