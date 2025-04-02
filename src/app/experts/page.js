"use client";
import React, { useState, useEffect } from "react";
import ExpertCard from "@/components/expert-card";

const experts = [
  {
    subject: "Operating System",
    description:
      "Learn about process management, memory management, file systems, and OS architecture.",
  },
  {
    subject: "Computer Networks",
    description:
      "Master networking protocols, TCP/IP, routing, switching, and network security.",
  },
  {
    subject: "Computer Architecture",
    description:
      "Understand CPU design, memory hierarchy, instruction sets, and parallel processing.",
  },
  {
    subject: "System Design",
    description:
      "Learn scalable system design, microservices, load balancing, and system architecture.",
  },
  {
    subject: "Algorithms",
    description:
      "Master sorting, searching, graph algorithms, dynamic programming, and complexity analysis.",
  },
  {
    subject: "Network Programming",
    description:
      "Learn socket programming, network protocols, client-server architecture, and network security.",
  },
  {
    subject: "Compiler Design",
    description:
      "Understand lexical analysis, parsing, semantic analysis, code generation, and optimization.",
  },
  {
    subject: "Web Technology",
    description:
      "Master HTML, CSS, JavaScript, web frameworks, and modern web development practices.",
  },
  {
    subject: "Data Structures",
    description:
      "Learn arrays, linked lists, trees, graphs, hash tables, and their applications.",
  },
  {
    subject: "Artificial Intelligence",
    description:
      "Understand machine learning, neural networks, natural language processing, and AI algorithms.",
  },
  {
    subject: "Database Management",
    description:
      "Master SQL, database design, normalization, transactions, and database optimization.",
  },
  {
    subject: "Cloud Computing",
    description:
      "Learn about cloud services, virtualization, containerization, and cloud architecture.",
  },
  {
    subject: "Machine Learning",
    description:
      "Understand supervised learning, unsupervised learning, deep learning, and ML algorithms.",
  },
  {
    subject: "OOPS",
    description:
      "Master object-oriented programming, classes, inheritance, polymorphism, and design patterns.",
  },
  {
    subject: "Java",
    description:
      "Master Java programming, OOP concepts, collections, multithreading, and Spring framework.",
  },
  {
    subject: "C++",
    description:
      "Learn C++ programming, memory management, templates, STL, and advanced C++ features.",
  },
  {
    subject: "Python",
    description:
      "Master Python programming, data science, web development, and Python frameworks.",
  },
  {
    subject: "JavaScript",
    description:
      "Learn JavaScript, DOM manipulation, async programming, and modern JS frameworks.",
  },
];

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState(experts);

  useEffect(() => {
    const filtered = experts.filter((expert) =>
      expert.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Computer Science Experts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose a subject to start learning with AI-powered assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((expert) => (
            <ExpertCard
              key={expert.subject}
              subject={expert.subject}
              description={expert.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
