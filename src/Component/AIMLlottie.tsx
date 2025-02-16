// src/components/LottieAnimation.tsx

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/aiml.json"; // Import your JSON animation file

const LottieAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      if (containerRef.current) {
        const parentHeight = containerRef.current.parentElement?.clientHeight;
        containerRef.current.style.height = `${parentHeight}px`; // Set container height dynamically
      }
    };

    // Set initial height on mount
    resizeHandler();

    window.addEventListener("resize", resizeHandler); // Adjust height on window resize

    return () => {
      window.removeEventListener("resize", resizeHandler); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg", // Choose renderer: svg, canvas, html (svg is recommended for performance)
        loop: true,
        autoplay: true,
        animationData: animationData, // Pass the imported animation data here
      });

      return () => {
        anim.destroy(); // Clean up animation when component unmounts
      };
    }
  }, []);

  return <div ref={containerRef} className="w-[40rem] h-[40rem]" />;
};

export default LottieAnimation;
