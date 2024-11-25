import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ArtworkCarousel = ({ technique = 'Óleo', category = 'Paisaje' }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/obras?technique=${technique}&category=${category}`,
          { credentials: 'include' }
        );
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [technique, category]);

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  if (!artworks.length) {
    return <div className="text-center py-10">No hay obras disponibles</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Obras de {technique} en {category}
      </h2>
      
      <div className="relative bg-gray-100 rounded-lg">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={artworks[currentIndex]?.imageUrl || '/api/placeholder/800/600'}
            alt={artworks[currentIndex]?.title || 'Obra de arte'}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
            <h3 className="text-lg font-semibold">
              {artworks[currentIndex]?.title}
            </h3>
            <p className="text-sm">
              {artworks[currentIndex]?.description}
            </p>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
          {artworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCarousel;