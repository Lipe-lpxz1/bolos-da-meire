import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-brand-chocolate text-brand-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-serif">Maria Formiga</h3>
            <p className="text-brand-cream/60 text-sm leading-relaxed">
              Transformando momentos em memórias doces desde 2010. 
              Sua confeitaria artesanal de confiança.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/_mariaformigabolos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-brand-rose transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-brand-cream/60">
              <li><a href="#home" className="hover:text-brand-rose transition-colors">Início</a></li>
              <li><a href="#bolos" className="hover:text-brand-rose transition-colors">Nossos Bolos</a></li>
              <li><a href="#sobre" className="hover:text-brand-rose transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-brand-rose transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Contato</h4>
            <ul className="space-y-4 text-sm text-brand-cream/60">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold" />
                (62) 98611-9347
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold" />
                contato@mariaformiga.com.br
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-gold" />
                Rua dos Araças, qd54 lt17, Jaraguá - GO
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Newsletter</h4>
            <p className="text-sm text-brand-cream/60 mb-4">Receba novidades e promoções exclusivas.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button className="w-full sm:w-auto px-6 py-2 bg-brand-gold text-brand-chocolate rounded-full text-sm font-medium hover:bg-brand-gold/90 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-xs text-brand-cream/40">
          <p>© 2024 Maria Formiga Bolos Artesanais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
