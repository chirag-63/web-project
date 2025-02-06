import Image from "next/image";
import React from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import Link from "next/link";

export default function CardU({ subject }) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className={`
          bg-white
          relative
          group/card
          // dark:bg-neutral-950
          rounded-2xl
          min-h-[300px]
          min-w-[300px]      /* Reduced size */
          sm:w-[250px] sm:h-[250px]  /* Smaller for desktop */
          md:w-[300px] md:h-[300px]  /* Adjusted for medium screens */
          p-4                   /* Adjusted padding */
          border-4
          border-gray-700
          
        `}
      >
        {/* Subject text */}
        <div className="min-h-[120px]">
          <CardItem className="text-3xl  font-extrabold text-neutral-600 dark:text-white">
            {subject}
          </CardItem>
          <CardItem
            as="p"
            className="text-neutral-500  text-sm max-w-xs mt-2 dark:text-neutral-300"
          >
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
          {/* <CardItem
            as="button"
            className="animated-btn relative overflow-hidden px-3 py-1.5 rounded-xl bg-gray-700 dark:bg-gray-300 dark:text-gray-800 text-white text-sm font-bold"
          >
            Lets Study
          </CardItem> */}
        </div>
      </CardBody>
    </CardContainer>
  );
}
