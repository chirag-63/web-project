"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Eraser,
  Minus,
  Plus,
  Trash2,
  Download,
  Undo,
  Redo,
} from "lucide-react";

const Playground = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  // Pencil brush size and eraser size are maintained separately.
  const [brushSize, setBrushSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(5);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  // Eraser overlay position
  const [eraserPos, setEraserPos] = useState({ x: -100, y: -100 });
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size to a reasonable default
    canvas.width = 800;
    canvas.height = 600;

    // Set cloudy white background
    context.fillStyle = "#f8fafc";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.lineCap = "round";
    // Default pencil stroke
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartPoint({ x: offsetX, y: offsetY });

    if (tool === "eraser") {
      // Update overlay and clear using eraserSize
      setEraserPos({ x: offsetX, y: offsetY });
      contextRef.current.clearRect(
        offsetX - eraserSize,
        offsetY - eraserSize,
        eraserSize * 2,
        eraserSize * 2
      );
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }

    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    if (tool === "eraser") {
      // Update eraser overlay and clear rectangle using eraserSize
      setEraserPos({ x: offsetX, y: offsetY });
      contextRef.current.clearRect(
        offsetX - eraserSize,
        offsetY - eraserSize,
        eraserSize * 2,
        eraserSize * 2
      );
    } else {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    if (tool === "pencil") {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
    saveToHistory();
  };

  const saveToHistory = () => {
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(canvasRef.current.toDataURL());
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const undo = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      loadImage(history[newStep]);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      loadImage(history[newStep]);
    }
  };

  const loadImage = (dataUrl) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      // Restore cloudy white background
      contextRef.current.fillStyle = "#f8fafc";
      contextRef.current.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // Restore cloudy white background
    contextRef.current.fillStyle = "#f8fafc";
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setHistory([]);
    setCurrentStep(-1);
  };

  const downloadCanvas = () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  // Increase or decrease pencil brush size by 1 unit per click
  const adjustBrushSize = (increment) => {
    setBrushSize((prev) => {
      const newSize = Math.max(1, Math.min(50, prev + increment));
      if (tool === "pencil" && contextRef.current) {
        contextRef.current.lineWidth = newSize;
      }
      return newSize;
    });
  };

  // Increase or decrease eraser size by 5 units per click
  const adjustEraserSize = (increment) => {
    setEraserSize((prev) => {
      const newSize = Math.max(1, Math.min(50, prev + increment * 5));
      return newSize;
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Controls Panel */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 flex flex-col gap-4 border-r border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* Tool Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Drawing Tools
            </label>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTool("pencil")}
                className={`flex-1 p-2 rounded-lg ${
                  tool === "pencil"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <PenTool className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTool("eraser")}
                className={`flex-1 p-2 rounded-lg ${
                  tool === "eraser"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Eraser className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Color Picker (only used for pencil) */}
          {tool === "pencil" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  contextRef.current.strokeStyle = e.target.value;
                }}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* Size Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {tool === "pencil" ? "Brush Size" : "Eraser Size"}
            </label>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={
                  tool === "pencil"
                    ? () => adjustBrushSize(-1)
                    : () => adjustEraserSize(-1)
                }
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Minus className="w-5 h-5" />
              </motion.button>
              <div className="flex-1 text-center text-sm font-medium">
                {tool === "pencil" ? `${brushSize}px` : `${eraserSize}px`}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={
                  tool === "pencil"
                    ? () => adjustBrushSize(1)
                    : () => adjustEraserSize(1)
                }
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={undo}
              disabled={currentStep <= 0}
              className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Undo className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={redo}
              disabled={currentStep >= history.length - 1}
              className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Redo className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCanvas}
              className="flex-1 p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCanvas}
              className="flex-1 p-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {tool === "pencil" ? "Drawing Mode" : "Eraser Mode"}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair"
              style={{
                border: "2px solid #e5e7eb",
                borderRadius: "0.5rem",
                backgroundColor: "#f8fafc",
              }}
            />
            {/* Eraser overlay indicator */}
            {tool === "eraser" && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: eraserPos.x,
                  top: eraserPos.y,
                  width: eraserSize * 2,
                  height: eraserSize * 2,
                  border: "2px solid black",
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
