"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Product } from '../../types';
import Image from 'next/image';
import { RotateCw, Play, Pause, HelpCircle } from 'lucide-react';
import Button from './Button';

interface Viewer360Props {
 product: Product;
}

export default function Viewer360({ product }: Viewer360Props) {
 const [frameIndex, setFrameIndex] = useState(0);
 const [isAutoSpinning, setIsAutoSpinning] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);
 const autoSpinIntervalRef = useRef<NodeJS.Timeout | null>(null);

 // We have a list of images in product.images. To make a 360-degree rotation look realistic,
 // we can map the 360 degrees into a circular set of frames. Since we have ~2 to 3 images, 
 // we can interpolate or cycle through the product.images array. If we want to simulate a
 // higher frame rate, we can apply dynamic perspective scaling & 3D CSS rotateY variables!
 const frames = product.images;
 const totalFrames = frames.length;

 const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const val = parseInt(e.target.value, 10);
 // Map 0-360 value to frame indexes
 const idx = Math.floor((val / 360) * totalFrames) % totalFrames;
 setFrameIndex(idx);
 };

 // Drag interaction variables
 const x = useMotionValue(0);
 // Map horizontal drag offsets to 3D rotation angles (-180deg to 180deg)
 const rotateY = useTransform(x, [-150, 150], [-60, 60], { clamp: false });
 const rotateX = useTransform(x, [-150, 150], [-10, 10]);

 useEffect(() => {
 if (isAutoSpinning) {
 autoSpinIntervalRef.current = setInterval(() => {
 setFrameIndex((prev) => (prev + 1) % totalFrames);
 }, 800);
 } else {
 if (autoSpinIntervalRef.current) {
 clearInterval(autoSpinIntervalRef.current);
 }
 }

 return () => {
 if (autoSpinIntervalRef.current) {
 clearInterval(autoSpinIntervalRef.current);
 }
 };
 }, [isAutoSpinning, totalFrames]);

 const toggleAutoSpin = () => {
 setIsAutoSpinning(!isAutoSpinning);
 };

 const handleDrag = (_event: any, info: any) => {
 // If user is dragging, cycle through images based on delta offset
 const dragOffset = info.offset.x;
 const factor = Math.floor(dragOffset / 40); // Change image every 40px of drag
 const indexOffset = factor % totalFrames;
 let newIndex = (totalFrames + indexOffset) % totalFrames;
 if (isNaN(newIndex)) newIndex = 0;
 setFrameIndex(newIndex);
 };

 const currentAngle = (frameIndex / totalFrames) * 360;

 return (
 <div className="flex flex-col items-center gap-6 p-6 border border-border/40 rounded-[20px] bg-card/60 backdrop-blur-md glass-panel">
 
 {/* Instructions */}
 <div className="flex items-center gap-1.5 text-xs text-muted-foreground select-none">
 <HelpCircle size={14} />
 <span>Drag horizontally or use the slider below to rotate product</span>
 </div>

 {/* Main 360 Frame Container */}
 <div className="perspective-1000 w-full max-w-sm flex items-center justify-center py-6">
 <motion.div
 ref={containerRef}
 drag="x"
 dragConstraints={{ left: -100, right: 100 }}
 dragElastic={0.05}
 onDrag={handleDrag}
 style={{ rotateY, rotateX, transformStyle: 'preserve-3d' } as any}
 className="relative aspect-square w-64 h-64 cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden border border-border/20 bg-muted/10 shadow-lg flex items-center justify-center select-none"
 >
 {/* Animated Glow Circle */}
 <div className="absolute inset-4 rounded-full border border-dashed border-primary/20 animate-spin-slow pointer-events-none" />
 
 <Image
 src={frames[frameIndex]}
 alt={`${product.name} 360 view frame ${frameIndex}`}
 fill
 draggable={false}
 className="object-cover pointer-events-none select-none p-4"
 sizes="256px"
 priority
 />

 {/* Angle overlay */}
 <div className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white ">
 {Math.round(currentAngle)}°
 </div>
 </motion.div>
 </div>

 {/* Control bar */}
 <div className="w-full max-w-sm flex flex-col gap-4">
 {/* Slider */}
 <div className="flex items-center gap-3">
 <span className="text-[10px] font-bold text-muted-foreground uppercase">0°</span>
 <input
 type="range"
 min="0"
 max="359"
 value={Math.round(currentAngle)}
 onChange={handleSliderChange}
 className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
 />
 <span className="text-[10px] font-bold text-muted-foreground uppercase">360°</span>
 </div>

 {/* Spin buttons */}
 <div className="flex items-center justify-center gap-3">
 <Button
 variant="outline"
 size="sm"
 onClick={toggleAutoSpin}
 className="flex items-center gap-2 px-4 py-2 text-xs rounded-[20px]"
 >
 {isAutoSpinning ? (
 <>
 <Pause size={12} />
 Pause Auto Spin
 </>
 ) : (
 <>
 <Play size={12} />
 Auto Spin 360°
 </>
 )}
 </Button>

 <Button
 variant="ghost"
 size="sm"
 onClick={() => {
 setIsAutoSpinning(false);
 setFrameIndex(0);
 x.set(0);
 }}
 className="text-xs text-muted-foreground hover:text-foreground rounded-[20px]"
 >
 Reset
 </Button>
 </div>
 </div>
 </div>
 );
}
