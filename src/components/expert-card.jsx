"use client";

import Image from "next/image";
import React from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import Link from "next/link";

export default function Card({ subject }) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className={`
          bg-white
          relative
          group/card
          dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
          dark:bg-neutral-950
          dark:border-gray-500
          border-gray-300
          rounded-2xl
          w-full h-[300px]       /* Square base size for mobile */
          sm:w-[350px] sm:h-[350px]  /* Larger square for desktop */
          md:w-[400px] md:h-[400px]  /* Even larger for medium screens */
          p-6                   /* Increased padding */
          animated-border
          transition-all        /* Smooth size transition */
        `}
      >
        {/* Larger subject text */}
        <CardItem
          translateZ="50"
          className="text-4xl font-extrabold text-neutral-600 dark:text-white" /* Increased text size */
        >
          {subject}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-base max-w-xs mt-4 dark:text-neutral-300" /* Larger text */
        >
          Learn {subject} with the power of Artificial Intelligence
        </CardItem>
        {/* Adjusted image container */}
        <CardItem translateZ="100" className="w-full mt-6 h-48">
          <Image
            src="https://i.pinimg.com/736x/87/5c/19/875c199c8f01559d31eb7009333ef81c.jpg"
            height="1000"
            width="1000"
            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl" /* Use full height */
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            target="__blank"
            className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white" /* Placeholder if needed */
          ></CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="animated-btn relative overflow-hidden px-4 py-2 rounded-xl bg-gray-700 dark:bg-gray-300 dark:text-gray-800 text-white text-sm font-bold"
          >
            Lets Study
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
