import Image from "next/image";
import React, { useRef } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import Link from "next/link";

export default function CardU({ subject }) {
  // Reference to the outer wrapper element for updating CSS custom properties
  const borderWrapperRef = useRef(null);

  // Update the gradient’s background position based on the mouse location
  const handleMouseMove = (e) => {
    if (!borderWrapperRef.current) return;
    const rect = borderWrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    borderWrapperRef.current.style.setProperty("--mouse-x", `${x}%`);
    borderWrapperRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  // Reset the gradient position when the mouse leaves the card
  const handleMouseLeave = () => {
    if (!borderWrapperRef.current) return;
    borderWrapperRef.current.style.setProperty("--mouse-x", "50%");
    borderWrapperRef.current.style.setProperty("--mouse-y", "50%");
  };

  return (
    <CardContainer className="inter-var">
      {/* Wrap the card body in the gradient border wrapper */}
      <div
        ref={borderWrapperRef}
        className="gradient-border-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CardBody
          className={`
            bg-zinc-900 
            relative z-10  /* Ensure the content sits above the pseudo-element */
            group/card
            rounded-2xl
            min-h-[300px]
            min-w-[300px]
            sm:w-[250px] sm:h-[250px]
            md:w-[300px] md:h-[300px]
            p-4
          `}
        >
          {/* Subject text */}
          <div className="min-h-[120px]">
            <CardItem className="text-3xl font-extrabold text-zinc-300">
              {subject}
            </CardItem>
            <CardItem as="p" className="text-zinc-400 text-sm max-w-xs mt-2">
              Learn {subject} with the power of Artificial Intelligence
            </CardItem>
          </div>
          {/* Image container */}
          <div>
            <Image
              src="https://i.pinimg.com/736x/87/5c/19/875c199c8f01559d31eb7009333ef81c.jpg"
              height="500"
              width="500"
              className="h-[120px] pb-3 w-full object-cover rounded-xl"
              alt="thumbnail"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            {/* Optionally add interactive elements */}
          </div>
        </CardBody>
      </div>
    </CardContainer>
  );
}
