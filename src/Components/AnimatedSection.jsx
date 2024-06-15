'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AnimatedSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  const images = [
    "https://st3.depositphotos.com/1001030/18123/i/450/depositphotos_181236738-stock-photo-business-consultants-working-in-a.jpg",
    "https://www.empoweradventures.com/wp-content/uploads/2018/03/shutterstock_737994433.jpg",
    "https://www.pagetraffic.in/wp-content/uploads/2022/09/google-office-in-gurgaon.jpg",
    "https://www.betterup.com/hs-fs/hubfs/Overhead-Shot-Of-Designers-Planning-Project-In-Office.jpg?width=964&name=Overhead-Shot-Of-Designers-Planning-Project-In-Office.jpg",
    "https://t3.ftcdn.net/jpg/08/01/76/92/360_F_801769299_hNJvoveBmoHTw2HbjJYnwMC25nVrgrge.jpg",
  ];

  const imageRefs = useRef([]);
  const imgRef = useRef([]);
  const centerImageRef = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((imageRef, index) => {
      ScrollTrigger.create({
        trigger: imageRef,
        start: "top center",
        end: "bottom center",
        onEnter: () => handleImageEnter(index),
        onLeaveBack: () => handleImageLeave(index),
      });
    });
  }, []);

  const handleImageEnter = (index) => {
    const centerImageIndex = Math.floor(images.length / 2);
    gsap.to(imageRefs.current[centerImageIndex], {
      scaleX: 1.1,
      scaleY: 0.8,
      rotate:4,
      zIndex: images.length - centerImageIndex,
      duration: 1,
    });

    imageRefs.current.forEach((imageRef, i) => {
      if (i !== centerImageIndex) {
        gsap.to(imageRef, {
          x: getImageXPosition(i),
          y: getImageYPosition(i),
          scaleX: 1,
          zIndex: images.length - i,
          duration: 2,
        });
      }
    });

    imgRef.current.forEach((img, i) => {
      gsap.to(img, {
        width: "250px", // Increase the width of images while scrolling down
        height: "150px",
        duration: 2,
      });
    });



  };

  const handleImageLeave = () => {
    imageRefs.current.forEach((imageRef, index) => {
      gsap.to(imageRef, {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: images.length - index,
        duration: 2,
      });
    });

    imgRef.current.forEach((img) => {
      gsap.to(img, {
        width: "80px", // Reset to the specified width when scrolling up
        height: "80px",
        duration: 2,
      });
    });

  };

  const getImageXPosition = (index) => {
    switch (index) {
      case 0:
        return -150; // Top left
      case 1:
        return 600; // Top right
      case 3:
        return -470; // Bottom left
      case 4:
        return 0; // Bottom right
      default:
        return 0;
    }
  };

  const getImageYPosition = (index) => {
    switch (index) {
      case 0:
        return -150; // Top row
      case 1:
        return -90; // Top row
      case 3:
        return 185; // Bottom row
      case 4:
        return 240; // Bottom row
      default:
        return 0;
    }
  };

  return (
    <>
          <div className="bg-gray-200 h-[10vh]">

</div>
      <div className="flex flex-col justify-center items-center text-center min-h-screen bg-gray-200 gap-2">
        <h1 className="text-8xl font-semibold text-black">We're a </h1>
        <div className="flex relative justify-center items-center gap-2">
          <div
            className="image-gallery absolute left-0 -right-6  inline-flex -space-x-10 "
            ref={centerImageRef}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative"
                ref={(el) => (imageRefs.current[index] = el)}
                style={{ zIndex: images.length - index }} // This ensures the leftmost image is on top
              >
                <img
                  ref={(el) => (imgRef.current[index] = el)}
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-20 h-20 object-cover border-4 border-white rounded-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <h2 className="text-8xl text-red-600 font-semibold">
            culture &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          </h2>
          <div className="flex justify-center items-center bg-gray-200"></div>
          <h2 className="text-8xl text-red-600 font-semibold">driven</h2>
        </div>
        <h2 className="text-8xl font-semibold text-black">dynamic crew!</h2>
      </div>
      <div className="bg-gray-200 h-[10vh]">

      </div>
    </>
  );
};

export default AnimatedSection;
