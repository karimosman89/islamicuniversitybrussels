import React, { useState, useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";

interface MapHoverTooltipProps {
  x: number; // 0 - 800 coordinates
  y: number; // 0 - 420 coordinates
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const MapHoverTooltip: React.FC<MapHoverTooltipProps> = ({ x, y, children, containerRef }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    left: `${(x / 800) * 100}%`,
    top: `${(y / 420) * 100}%`,
    opacity: 0,
    transform: "translate(-50%, -100%)",
  });
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({
    left: "50%",
    transform: "translateX(-50%)",
  });

  useLayoutEffect(() => {
    if (!tooltipRef.current || !containerRef.current) return;

    // First measure dimensions:
    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Map point in pixels relative to container:
    const pxLeft = (x / 800) * containerRect.width;
    const pxTop = (y / 420) * containerRect.height;

    // The tooltip is centered at pxLeft (translate -50%), is at least tooltipRect.width wide,
    // and is placed above pxTop by height + 14px spacer.
    const halfWidth = tooltipRect.width / 2;
    const padding = 12; // safety margin from borders

    let adjustedLeftOffset = 0; // how much we shift left or right

    const potentialLeft = pxLeft - halfWidth;
    const potentialRight = pxLeft + halfWidth;

    if (potentialLeft < padding) {
      // Shift right to avoid overflowing the left edge
      adjustedLeftOffset = padding - potentialLeft;
    } else if (potentialRight > containerRect.width - padding) {
      // Shift left to avoid overflowing the right edge
      adjustedLeftOffset = (containerRect.width - padding) - potentialRight;
    }

    // Now, calculate the arrow shift to point exactly at the marker:
    // Arrow is normal at 50% left. If the tooltip was shifted by adjustedLeftOffset pixels,
    // the arrow needs to be shifted in the opposite direction to stay over the point.
    const defaultCenter = tooltipRect.width / 2;
    const targetArrowPx = defaultCenter - adjustedLeftOffset;
    // clam arrow between 15% and 85% so it doesn't leave the tooltip boundaries
    const arrowPercent = Math.max(15, Math.min(85, (targetArrowPx / tooltipRect.width) * 100));

    // For vertical overflow, if top of the tooltip goes off the container top:
    let isBelow = false;
    const tooltipHeight = tooltipRect.height;
    if (pxTop - tooltipHeight - 20 < 0) {
      // Not enough space above! Show it BELOW the pin instead of above.
      isBelow = true;
    }

    // We combine the base translate (centered at left, with vertical position) and the corrective pixel translation.
    const transformStr = isBelow 
      ? `translate(calc(-50% + ${adjustedLeftOffset}px), 14px)`
      : `translate(calc(-50% + ${adjustedLeftOffset}px), calc(-100% - 14px))`;

    setStyle({
      left: `${(x / 800) * 100}%`,
      top: `${(y / 420) * 100}%`,
      transform: transformStr,
      opacity: 1,
    });

    setArrowStyle(isBelow ? {
      left: `${arrowPercent}%`,
      transform: "translateX(-50%) rotate(180deg)",
      bottom: "auto",
      top: "-8px", // offset for top arrow border sizing
    } : {
      left: `${arrowPercent}%`,
      transform: "translateX(-50%)",
      top: "auto",
      bottom: "-8px",
    });

  }, [x, y, containerRef]);

  return (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, scale: 0.94, y: style.transform?.includes("14px") ? 5 : -5 }}
      animate={{ 
        opacity: style.opacity, 
        scale: style.opacity === 1 ? 1 : 0.94,
        y: 0 
      }}
      exit={{ opacity: 0, scale: 0.94, y: style.transform?.includes("14px") ? 5 : -5 }}
      transition={{ type: "spring", damping: 20, stiffness: 280 }}
      className="absolute md:block hidden pointer-events-none bg-slate-950/95 text-white p-3.5 rounded-2xl shadow-xl shadow-slate-950/40 border border-slate-800 font-sans z-55 text-[11px] min-w-[190px] max-w-[245px] backdrop-blur-md"
      style={{
        left: style.left,
        top: style.top,
        transform: style.transform,
      }}
    >
      {/* Dynamic arrow */}
      <div 
        className="absolute w-0 h-0 border-x-4 border-x-transparent border-t-[8px] border-t-slate-950/95 z-55"
        style={arrowStyle}
      />
      
      {children}
    </motion.div>
  );
};
