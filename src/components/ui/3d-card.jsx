"use client";
import { cn } from "@/lib/utils";
import React, { createContext, useState, useContext, useRef } from "react";
import { motion } from "framer-motion";

const MouseEnterContext = createContext(undefined);

export const CardContainer = ({ children, className, containerClassName }) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => setIsMouseEntered(false);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className={cn("py-7 flex  justify-between", containerClassName)}>
        <motion.div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          animate={{ scale: isMouseEntered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  return <div className={cn("h-96 w-96", className)}>{children}</div>;
};

export const CardItem = ({ as: Tag = "div", children, className, ...rest }) => {
  return (
    <motion.div
      className={cn("w-fit transition duration-200 ease-linear", className)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
