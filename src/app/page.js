import { FeaturesSectionDemo } from "@/components/feature";
import Navbar from "@/components/navbar/navbar";
import { HeroParallaxDemo } from "@/components/parallax";
import { InfiniteMovingCardsDemo } from "@/components/testimonials";
import Footer from "@/components/footer/footer";
import { FAQ } from "@/components/faq/faq";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroParallaxDemo />
      <FeaturesSectionDemo />
      <InfiniteMovingCardsDemo />
   
      <FAQ />
      <div className="border-y border-white border-opacity-50">
      </div>
      <Footer />
    </div>
  );
}
//GIF
//faq
//footer
