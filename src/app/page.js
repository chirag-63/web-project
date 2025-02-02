import { HeroHighlightDemo } from "@/components/landing";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroParallaxDemo } from "@/components/Hero";
import { Hero } from "@/components/Hero";
export default function Home() {
  return (
    <div>
      <HeroHighlightDemo />
      <HeroParallaxDemo />
      <h1 className="min-h-screen">Hello</h1>
    </div>
  );
}
