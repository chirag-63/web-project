import { Button } from "@/components/ui/button";
import Card from "@/components/expert-card.jsx";

export default function Experts() {
  const cards = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
  ];
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <Card subject={card} key={index} />
        ))}
      </div>
    </div>
  );
}
