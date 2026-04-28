'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/backgroung_images/background_imagehome.jpeg',
  '/backgroung_images/Gemini_Generated_Image_8669b28669b28669.png',
  '/backgroung_images/Gemini_Generated_Image_gztwcdgztwcdgztw.png',
  '/backgroung_images/Gemini_Generated_Image_lll1pvlll1pvlll1.png',
  '/backgroung_images/Gemini_Generated_Image_tqcde1tqcde1tqcd.png',
];

interface ImageSliderProps {
  /** When true, renders as absolute inset-0 to fill a relative parent (no fixed height) */
  fill?: boolean;
}

export const ImageSlider = ({ fill = false }: ImageSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: fill ? 'absolute' : 'relative',
        inset: fill ? 0 : undefined,
        width: '100%',
        height: fill ? '100%' : '400px',
        overflow: 'hidden',
        backgroundColor: '#0B7A3E',
      }}
    >
      {IMAGES.map((src, index) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === current ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <Image
            src={src}
            alt={`ScrapNinja slide ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {IMAGES.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === current ? '22px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === current ? '#ffffff' : 'rgba(255,255,255,0.45)',
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
