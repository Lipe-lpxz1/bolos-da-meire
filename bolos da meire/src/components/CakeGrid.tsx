import { motion } from 'motion/react';
import { Heart, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CakeProps {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

export function CakeCard({ id, name, category, price, image }: CakeProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-brand-chocolate hover:text-brand-rose transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2 block">
          {category}
        </span>
        <h3 className="text-xl font-serif font-medium mb-4">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-brand-chocolate">{price}</span>
          <button 
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              added 
                ? "bg-emerald-500 text-white border-emerald-500" 
                : "bg-brand-cream border border-brand-chocolate/10 text-brand-chocolate hover:bg-brand-chocolate hover:text-brand-cream"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Adicionado
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const CAKES = [
  {
    id: 1,
    name: "Red Velvet Supreme",
    category: "Clássicos",
    price: "R$ 120,00",
    image: "https://images.unsplash.com/photo-1586788680434-30d324671ff6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Naked Cake de Frutas",
    category: "Rústicos",
    price: "R$ 150,00",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Chocolate Belga 70%",
    category: "Intensos",
    price: "R$ 110,00",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Limão Siciliano & Mirtilo",
    category: "Refrescantes",
    price: "R$ 95,00",
    image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Bolo de Pistache & Framboesa",
    category: "Festas",
    price: "R$ 165,00",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Caramelo Salgado & Nozes",
    category: "Intensos",
    price: "R$ 130,00",
    image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Bolo Vegano de Coco & Manga",
    category: "Veganos",
    price: "R$ 115,00",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Drip Cake de Morango",
    category: "Festas",
    price: "R$ 140,00",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800"
  }
];

export default function CakeGrid() {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredCakes = CAKES.filter(cake => 
    activeCategory === "Todos" || cake.category === activeCategory
  );

  const visibleCakes = showAll ? filteredCakes : filteredCakes.slice(0, 4);

  return (
    <section id="bolos" className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Nossas <span className="italic">Criações</span></h2>
            <p className="text-brand-chocolate/70 leading-relaxed">
              Cada bolo é uma obra de arte única, preparada com as melhores técnicas 
              da confeitaria francesa e o calor do tempero brasileiro.
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {["Todos", "Clássicos", "Rústicos", "Intensos", "Refrescantes", "Festas", "Veganos"].map((cat) => (
              <button 
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(true); // Mostrar todos da categoria ao filtrar
                }}
                className={`whitespace-nowrap px-6 py-2 rounded-full border border-brand-chocolate/10 text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-brand-chocolate text-brand-cream" 
                    : "hover:bg-brand-chocolate hover:text-brand-cream"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleCakes.map((cake) => (
            <CakeCard key={cake.id} {...cake} />
          ))}
        </div>
        
        {!showAll && filteredCakes.length > 4 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="text-brand-chocolate font-serif italic text-xl border-b border-brand-chocolate/30 pb-1 hover:text-brand-rose hover:border-brand-rose transition-all"
            >
              Ver catálogo completo
            </button>
          </div>
        )}

        {showAll && activeCategory === "Todos" && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(false)}
              className="text-brand-chocolate font-serif italic text-xl border-b border-brand-chocolate/30 pb-1 hover:text-brand-rose hover:border-brand-rose transition-all"
            >
              Ver menos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
