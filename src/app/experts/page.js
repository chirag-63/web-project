import { Button } from "@/components/ui/button";
import Card from "@/components/expert-card.jsx";
import Link from "next/link";

export default function Experts() {
  const cards = [
    "Operating System",
    "Computer Networks",
    "Computer Architecture",
    "System Design",
    "Algorithms",
    "Network Programming",
    "Compiler Design",
    "Web Technology",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((subject, index) => (
          <Card subject={subject} key={index} />
        ))}
      </div>

      {/* "Request a Subject" Feature */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Can't find your subject?{" "}
          <Link
            href="/request-subject"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Button variant="link">Request for one</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
