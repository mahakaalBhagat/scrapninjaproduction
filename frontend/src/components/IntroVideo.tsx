'use client';

import React, { useEffect, useRef, useState } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onComplete, 500);
  };

  useEffect(() => {
    // Play video (muted for autoplay policy)
    videoRef.current?.play().catch(() => {});

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(dismiss, 3000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <video
        ref={videoRef}
        src="/Website Intro 2.mp4"
        muted
        playsInline
        autoPlay
        className="w-full max-w-full md:w-full md:h-full object-contain md:object-cover"
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration && v.currentTime >= v.duration - 0.8) {
            dismiss();
          }
        }}
      />
    </div>
  );
}
