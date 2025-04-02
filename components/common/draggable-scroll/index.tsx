"use client";

import React, { useRef, useState, useEffect } from "react";

interface DraggableScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DraggableScroll: React.FC<DraggableScrollProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrollable(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isScrollable) return;
    setIsDragging(true);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.add("cursor-grabbing");
      scrollContainerRef.current.classList.remove("cursor-grab");
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    if (!isScrollable) return;
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove("cursor-grabbing");
      scrollContainerRef.current.classList.add("cursor-grab");
    }
  };

  const handleMouseUp = () => {
    if (!isScrollable) return;
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove("cursor-grabbing");
      scrollContainerRef.current.classList.add("cursor-grab");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isScrollable) return;
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`${className} overflow-auto ${
        isScrollable ? "cursor-grab" : "cursor-auto"
      }`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default DraggableScroll;
