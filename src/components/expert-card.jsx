import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BookOpen,
  Brain,
  Code2,
  Database,
  Network,
  Server,
  Shield,
  Smartphone,
  Webhook,
} from "lucide-react";

const subjectIcons = {
  "Data Structures": <Database className="w-8 h-8" />,
  Algorithms: <Brain className="w-8 h-8" />,
  "Artificial Intelligence": <Brain className="w-8 h-8" />,
  "Computer Networks": <Network className="w-8 h-8" />,
  "Operating Systems": <Server className="w-8 h-8" />,
  "Database Management": <Database className="w-8 h-8" />,
  "Web Development": <Webhook className="w-8 h-8" />,
  "Mobile Development": <Smartphone className="w-8 h-8" />,
  Cybersecurity: <Shield className="w-8 h-8" />,
  "Programming Languages": <Code2 className="w-8 h-8" />,
  "Software Engineering": <BookOpen className="w-8 h-8" />,
  "Operating System": <Database className="w-8 h-8" />,
  "C++": <Brain className="w-8 h-8" />,
  "Computer Networks": <Network className="w-8 h-8" />,
  "Compiler Design": <Server className="w-8 h-8" />,
  "Network Programming": <Webhook className="w-8 h-8" />,
  "Mobile Development": <Smartphone className="w-8 h-8" />,
  Cybersecurity: <Shield className="w-8 h-8" />,
  "Programming Languages": <Code2 className="w-8 h-8" />,
  "Software Engineering": <BookOpen className="w-8 h-8" />,
};

const ExpertCard = ({ subject, description }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (e.clientX - centerX) / 10;

    x.set(rotateYValue);
    y.set(rotateXValue);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const subjectSlug = subject.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[300px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        className="gradient-border-wrapper relative w-full h-full rounded-2xl p-[1px]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                {subjectIcons[subject]}
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {subject}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 mt-4">
            <Link
              href={`/chat/${subjectSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors group"
            >
              <span>Start Learning</span>
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                →
              </motion.span>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />

          {/* Bubble Effect */}
          <motion.div
            className="bubble absolute"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpertCard;
