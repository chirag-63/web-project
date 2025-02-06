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
                "Get real-time solutions from AI-driven experts. your personal tutor is just a click away.",
            icon: <IconTerminal2 />,
        },
        {
            title: "Comprehensive Coverage",
            description:
                "From the basics to the most advanced topics, we cover it all",
            icon: <IconEaseInOut />,
        },
        {
            title: "Subject Matter Experts",
            description:
                "Dedicated AI experts for every major subject, offering personalized and detailed explanations",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "Comprehensive Doubt Resolution",
            description: "No question is too small or complex. Our AI chatbots provide instant doubt resolution.",
            icon: <IconCloud />,
        },
        {
            title: "Step-by-Step Guidance",
            description: "Our experts break down complex topics to make learning easier.",
            icon: <IconRouteAltLeft />,
        },
        {
            title: "24/7 Availability",
            description:
                "We are available a 100% of the time. Atleast our AI Agents are.",
            icon: <IconHelp />,
        },
        {
            title: "Multi-Topic Assistance",
            description:
                "Whether it's OOP, DSA, or DBMS, our platform provides support across a wide range of subjects.",
            icon: <IconAdjustmentsBolt />,
        },
        {
            title: "And many more..",
            description: "There's always more in the works. Stay tuned for new features",
            icon: <IconHeart />,
        },
    ];
    return (
        (<div>
            <h2 className="flex justify-center items-center text-5xl my-10 font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Smart Features for Smarter Learning
            </h2>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </div>)
    );
}

const Feature = ({
    title,
    description,
    icon,
    index
}) => {
    return (
        (<div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}>
            {index < 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div
                className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div
                    className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span
                    className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p
                className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>)
    );
};
