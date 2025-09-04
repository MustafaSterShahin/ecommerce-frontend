import React, { useState, useEffect } from "react";
import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider3.jpg";

const sliderImages = [slider1, slider2, slider3];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mb-10 relative overflow-hidden rounded-xl shadow-lg">
      <img
        src={sliderImages[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-64 object-cover transition-transform duration-500 ease-in-out"
      />
    </div>
  );
};

export default Slider;
