import React from "react";
import { sliderImages } from "../data/sliderImages";

const PromoSlider: React.FC = () => {
  return (
    <div className="w-full mb-6">
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {sliderImages.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg">
            <img src={img} alt={`Promo ${index + 1}`} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
