"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
        What Our Students Say
      </h2>
      <InfiniteMovingCards 
        items={testimonials} 
        direction="right" 
        speed="slow" 
        className="px-4"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "CS Mastery helped me crack my Google interview! The AI explanations for complex algorithms were clearer than any professor I've had. Now I'm working at my dream company in Bangalore.",
    name: "Rahul Sharma",
    title: "Software Engineer at Google",
  },
  {
    quote:
      "As a working professional, I needed flexible learning. CS Mastery's 24/7 AI tutors helped me master DBMS concepts at my own pace. I got promoted to Senior Developer within 6 months!",
    name: "Priya Patel",
    title: "Senior Developer, Mumbai",
  },
  {
    quote: 
      "The step-by-step OOP explanations saved my semester! I went from failing to topping my class at IIT Delhi. The AI tutor breaks down concepts better than any textbook.",
    name: "Arjun Gupta",
    title: "Computer Science Student",
  },
  {
    quote:
      "Being from a non-CS background, I struggled with DSA. CS Mastery's visual learning approach made complex topics click instantly. Now I confidently solve LeetCode problems daily!",
    name: "Neha Joshi",
    title: "Career Changer, Pune",
  },
  {
    quote:
      "The AI doubt solver is magical! It understood my messy questions about OS concepts and gave perfect answers. My GATE preparation became 10x more efficient with CS Mastery.",
    name: "Vikram Singh",
    title: "GATE Aspirant",
  },
  {
    quote:
      "As a college professor, I recommend CS Mastery to all my students. The platform bridges the gap between academic theory and real-world implementation beautifully.",
    name: "Dr. Ananya Deshpande",
    title: "Professor, IIIT Hyderabad",
  },
];