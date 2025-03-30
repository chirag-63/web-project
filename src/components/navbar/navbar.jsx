"use client";
import Link from "next/link";
import NavItem from "./navItem";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import Profile from "@/app/profile/page";
import { usePathname } from "next/navigation";

const LEFT_LIST = [
  { id: "home", text: "Home", href: "/", icon: "Home" },
  { id: "mentors", text: "Mentors", href: "/experts", icon: "Users" },
  { id: "playground", text: "Playground", href: "/playground", icon: "Code" },
];

const RIGHT_LIST = [
  { id: "about", text: "About Us", href: "#about", icon: "Info" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar flex w-full h-14 items-center bg-background sticky top-0 z-50">
      <div className="logo mx-4 ml-20">Logo</div>
      <div className="mainbar flex w-full items-center justify-between">
        <div className="leftnav ml-8 gap-4 flex items-center justify-around">
          {LEFT_LIST.map((item) => {
            const IconComponent = LucideIcons[item.icon] || null;
            return (
              <NavItem
                href={item.href}
                text={item.text}
                icon={IconComponent ? <IconComponent size={18} /> : null}
                key={item.id}
              />
            );
          })}
        </div>
        <div className="rightnav gap-5 mr-10 flex items-center">
          {isHomePage && (
            <button
              onClick={scrollToFAQ}
              className="flex items-center gap-2 mx-1 px-4 py-2 rounded-lg text-white transition-all duration-300 ease-in-out 
                 hover:bg-white/10 hover:scale-105 hover:text-primary"
            >
              <LucideIcons.HelpCircle size={18} />
              FAQ
            </button>
          )}
          {RIGHT_LIST.map((item) => {
            const IconComponent = LucideIcons[item.icon] || null;
            return (
              <NavItem
                href={item.href}
                text={item.text}
                icon={IconComponent ? <IconComponent size={18} /> : null}
                key={item.id}
              />
            );
          })}
          <Profile />
        </div>
      </div>
    </div>
  );
}
