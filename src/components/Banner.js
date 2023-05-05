import React, { useEffect, useState } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div>
      {domLoaded && (
        <div className="relative">
          <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={4000}
          >
            <div>
              <img
                loading="lazy"
                src="https://links.papareact.com/gi1"
                alt="img"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="https://links.papareact.com/6ff"
                alt="img"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="https://links.papareact.com/7ma"
                alt="img"
              />
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Banner;
