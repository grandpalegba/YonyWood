import React, { useState } from 'react';

interface OnboardingScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onGuest: () => void;
}

const slides = [
  {
    id: 1,
    title: 'Récits du Réel',
    description: 'Découvrez des histoires authentiques, brutes et sans filtre. Yonywood donne une voix aux récits qui transforment notre vision du monde.',
    image: 'https://images.unsplash.com/photo-1533422902779-facfac16d10c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    title: "L'Astrolabe & les Duos",
    description: 'Explorez notre univers à travers l\'Astrolabe. Suivez les Duos de protagonistes et vidéastes dans leurs quêtes inspirantes.',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    title: 'Coproduction à Impact',
    description: 'Devenez acteur du changement. Soutenez et financez directement les projets documentaires qui résonnent avec vos valeurs.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000'
  }
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onLogin, onRegister, onGuest }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0D0B] text-white flex flex-col overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/80 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-gray-300">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                idx === currentSlide ? 'bg-[#C89B3C]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {currentSlide === slides.length - 1 ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={onRegister}
                className="w-full py-4 bg-[#C89B3C] text-black font-semibold rounded-full text-lg hover:bg-[#D4A373] transition-colors"
              >
                Créer un compte
              </button>
              <button
                onClick={onLogin}
                className="w-full py-4 bg-white/10 text-white font-semibold rounded-full text-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Se connecter
              </button>
              <button
                onClick={onGuest}
                className="w-full py-4 text-gray-400 font-medium text-sm hover:text-white transition-colors"
              >
                Continuer en invité
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-[#C89B3C] text-black font-semibold rounded-full text-lg hover:bg-[#D4A373] transition-colors"
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
