import React, { useState, useEffect } from "react";
import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider3.jpg";

const images = [slider1, slider2, slider3];

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 saniye geçiş
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto relative rounded-xl overflow-hidden shadow-lg mb-10">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-64 object-cover"
      />
      <p className="absolute bottom-4 left-4 text-white font-bold text-xl">
      </p>
    </div>
  );
};

export default HeroSlider;
