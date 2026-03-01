import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="sobre" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                alt="Confeiteira trabalhando" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-rose/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl -z-0" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold font-semibold tracking-widest uppercase text-xs mb-4 block">Nossa História</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Onde a <span className="italic">Paixão</span> encontra a <span className="text-brand-rose">Perfeição</span>
            </h2>
            <div className="space-y-6 text-brand-chocolate/70 leading-relaxed text-lg">
              <p>
                A Maria Formiga nasceu do sonho de transformar ingredientes simples em memórias extraordinárias. 
                O que começou em uma pequena cozinha familiar, hoje é referência em sofisticação e sabor.
              </p>
              <p>
                Nossa filosofia é simples: respeitar o tempo de cada processo e a pureza de cada ingrediente. 
                Não usamos conservantes, apenas técnica, paciência e muito amor.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-serif text-brand-chocolate mb-2">15+</h4>
                  <p className="text-sm uppercase tracking-wider">Anos de Experiência</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-brand-chocolate mb-2">10k+</h4>
                  <p className="text-sm uppercase tracking-wider">Clientes Felizes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
