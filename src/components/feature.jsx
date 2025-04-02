"use client";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Instant Expert Assistance",
      description:
        "Get real-time solutions from AI-driven experts. Your personal tutor is just a click away.",
      icon: <IconTerminal2 className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      title: "Comprehensive Coverage",
      description: "From basics to advanced topics, we cover all CS subjects",
      icon: <IconEaseInOut className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      title: "Subject Matter Experts",
      description:
        "Dedicated AI experts for each subject with detailed explanations",
      icon: <IconCurrencyDollar className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      title: "24/7 Doubt Resolution",
      description: "Instant solutions for all your technical questions",
      icon: <IconCloud className="w-6 h-6" />,
      color: "text-yellow-500",
    },
    {
      title: "Step-by-Step Guidance",
      description: "Complex topics broken down into simple steps",
      icon: <IconRouteAltLeft className="w-6 h-6" />,
      color: "text-pink-500",
    },
    {
      title: "And many more..",
      description:
        "There's always more in the works. Stay tuned for new features",
      icon: <IconHeart className="w-6 h-6" />,
      color: "text-teal-500",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Smart Features for Smarter Learning
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ title, description, icon, color, index }) => {
  return (
    <div
      className={cn(
        "relative p-6 h-full rounded-xl border border-gray-200 dark:border-gray-700",
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "group overflow-hidden"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-[radial-gradient(200px_circle_at_center,var(--color)_0%,transparent_70%)]"
        )}
        style={{ "--color": color.replace("text-", "") + "10" }}
      ></div>

      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-4 relative",
          "bg-white dark:bg-gray-700 border",
          "group-hover:border-transparent transition-colors duration-300",
          color.replace("text-", "border-") + "/20"
        )}
      >
        <div
          className={cn(
            color,
            "transition-transform duration-300 group-hover:scale-110"
          )}
        >
          {icon}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white relative">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative">
        {description}
      </p>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
          "from-transparent via-transparent group-hover:via-current to-transparent",
          color,
          "opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        )}
      ></div>
    </div>
  );
};
