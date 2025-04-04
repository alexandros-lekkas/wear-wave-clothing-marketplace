import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Handle if no images
  if (images.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }
  
  // Navigation handlers
  const goToNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative h-full w-full bg-black">
      {/* Current image */}
      <img
        src={images[currentImageIndex]}
        alt={`${title} - image ${currentImageIndex + 1}`}
        className="h-full w-full object-contain"
        loading="lazy"
      />
      
      {/* Navigation controls (only show if more than one image) */}
      {images.length > 1 && (
        <>
          {/* Previous button */}
          <button
            onClick={goToPrevImage}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          {/* Next button */}
          <button
            onClick={goToNextImage}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Indicator dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 