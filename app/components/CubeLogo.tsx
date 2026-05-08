"use client";

import { useEffect, useRef, useState } from "react";

interface Cube {
  x: number;
  y: number;
  size: number;
  color: string;
  originalY: number;
  illuminated: boolean;
  animationProgress: number;
}

export default function CubeLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastMoveTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Create cube grid
    const cubeSize = 8;
    const spacing = 2;
    const gridSize = 40;
    const startX = (canvas.width - gridSize * (cubeSize + spacing)) / 2;
    const startY = (canvas.height - gridSize * (cubeSize + spacing)) / 2;

    const newCubes: Cube[] = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = startX + j * (cubeSize + spacing);
        const y = startY + i * (cubeSize + spacing);
        
        // Create logo pattern - simplified KARYON shape
        let color = "#0a0a0a"; // Dark default
        let isLogoPixel = false;
        
        // K shape (simplified)
        if ((i >= 5 && i <= 35 && j >= 5 && j <= 10) || 
            (i >= 15 && i <= 25 && j >= 10 && j <= 20) ||
            (i >= 25 && i <= 35 && j >= 5 && j <= 10)) {
          color = "#00ff00"; // Green for logo
          isLogoPixel = true;
        }
        
        // LABS text (simplified)
        if (i >= 30 && i <= 35) {
          if ((j >= 15 && j <= 18) || // L
              (j >= 20 && j <= 23) || // A
              (j >= 25 && j <= 28) || // B
              (j >= 30 && j <= 33)) { // S
            color = "#00ff00";
            isLogoPixel = true;
          }
        }

        newCubes.push({
          x,
          y,
          size: cubeSize,
          color,
          originalY: y,
          illuminated: false,
          animationProgress: 0
        });
      }
    }

    setCubes(newCubes);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        setMousePos({ x: e.clientX, y: e.clientY });
        setIsMoving(true);
        lastMoveTime.current = Date.now();
        ticking = true;
        requestAnimationFrame(() => { ticking = false; });
      }
    };

    const handleMouseStop = () => {
      setTimeout(() => {
        if (Date.now() - lastMoveTime.current > 100) {
          setIsMoving(false);
        }
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleMouseStop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseStop);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ticking = false;
    const animate = () => {
      if (!ticking) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get canvas position
        const rect = canvas.getBoundingClientRect();
        const canvasX = mousePos.x - rect.left;
        const canvasY = mousePos.y - rect.top;

        // Only update cubes near cursor for performance
        const updateRadius = 60;
        
        cubes.forEach((cube, index) => {
          const distance = Math.sqrt(
            Math.pow(canvasX - (cube.x + cube.size / 2), 2) +
            Math.pow(canvasY - (cube.y + cube.size / 2), 2)
          );

          const isIlluminated = distance < updateRadius;
          const shouldUpdate = isIlluminated !== cube.illuminated || 
                           (isIlluminated && cube.animationProgress < 1) ||
                           (!isIlluminated && cube.animationProgress > 0);
          
          if (shouldUpdate) {
            cube.illuminated = isIlluminated;
            
            // Animate hover up
            if (isIlluminated && cube.animationProgress < 1) {
              cube.animationProgress = Math.min(1, cube.animationProgress + 0.08);
            } else if (!isIlluminated && cube.animationProgress > 0) {
              cube.animationProgress = Math.max(0, cube.animationProgress - 0.04);
            }
          }

          // Calculate position with animation
          const hoverOffset = isIlluminated ? Math.sin(cube.animationProgress * Math.PI) * -10 : 0;
          const currentY = cube.originalY + hoverOffset;

          // Draw cube with 3D effect
          const brightness = isIlluminated ? 1 : 0.2;
          const size = cube.size * (isIlluminated ? 1.1 : 1);
          
          // Shadow
          ctx.fillStyle = `rgba(0, 0, 0, ${brightness * 0.3})`;
          ctx.fillRect(cube.x + 1, currentY + 1, size, size);
          
          // Main cube
          ctx.fillStyle = cube.color === "#00ff00" 
            ? `rgba(0, 255, 0, ${brightness})`
            : `rgba(10, 10, 10, ${brightness})`;
          ctx.fillRect(cube.x, currentY, size, size);
        });

        ticking = true;
        requestAnimationFrame(() => { ticking = false; });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cubes, mousePos]);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="opacity-20"
        style={{
          width: "800px",
          height: "400px",
          maxWidth: "90vw",
          maxHeight: "50vh"
        }}
      />
    </div>
  );
}
