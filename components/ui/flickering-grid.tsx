"use client";

import { cn } from "@/lib/utils/index";
import React, { useCallback, useLayoutEffect, useRef } from "react";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<{
    cols: number;
    rows: number;
    squares: Float32Array;
  } | null>(null);

  const generateGrid = useCallback(
    (cols: number, rows: number) => {
      const total = cols * rows;
      const squares = new Float32Array(total);
      for (let i = 0; i < total; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return squares;
    },
    [maxOpacity]
  );

  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const container = containerRef.current;
      if (!container) return;

      const logicalWidth = width ?? container.clientWidth;
      const logicalHeight = height ?? container.clientHeight;

      const dpr = window.devicePixelRatio || 1;

      // Set canvas resolution
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      // Reset transform before scaling (important on redraw)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const cols = Math.floor(logicalWidth / (squareSize + gridGap));
      const rows = Math.floor(logicalHeight / (squareSize + gridGap));

      // Regenerate grid only if dimensions changed
      if (
        !gridRef.current ||
        gridRef.current.cols !== cols ||
        gridRef.current.rows !== rows
      ) {
        gridRef.current = {
          cols,
          rows,
          squares: generateGrid(cols, rows),
        };
      }

      const { squares } = gridRef.current;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.fillStyle = color;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          ctx.globalAlpha = squares[index];
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize
          );
        }
      }

      ctx.globalAlpha = 1; // reset
    },
    [color, width, height, squareSize, gridGap, generateGrid]
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: number;

    const redraw = () => draw(canvas, ctx);

    redraw();

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(redraw, 50);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
};