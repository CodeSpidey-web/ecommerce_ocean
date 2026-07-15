"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { youtubeVideos } from '../../lib/products';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
import { Play, Tv, Eye, Clock } from 'lucide-react';
import { useToast } from '../context/AppContext';

export default function YoutubeSection() {
 const { addToast } = useToast();

 const handleVideoClick = (title: string) => {
 addToast(`Launching video player overlay for: "${title}"...`, "info");
 };

 return (
 <section id="videos" className="py-20 bg-background/50 border-t border-b border-border/30 relative z-10">
 <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.02)_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />

 <div className="max-w-7xl mx-auto px-4 md:px-8">
 <SectionTitle
 title="Latest Technical Videos"
 subtitle="Watch step-by-step instructions, device unboxings, and custom flight setups from our senior hardware specialists."
 badge="Video Library"
 />

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
 {youtubeVideos.map((video, idx) => (
 <motion.div
 key={video.id}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: idx * 0.05 }}
 onClick={() => handleVideoClick(video.title)}
 className="bg-card border border-border/40 hover:border-primary/20 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 text-left cursor-pointer group glass-panel"
 >
 {/* Thumbnail Container */}
 <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
 <Image
 src={video.thumbnail}
 alt={video.title}
 fill
 className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
 sizes="(max-width: 768px) 100vw, 30vw"
 />
 
 {/* Play Button Overlay with Pulse Animation */}
 <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
 <motion.div
 whileHover={{ scale: 1.15 }}
 className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 relative"
 >
 <Play fill="currentColor" size={18} className="ml-1 text-white" />
 <span className="absolute -inset-2 rounded-full border border-primary/40 animate-ping opacity-60 pointer-events-none" />
 </motion.div>
 </div>

 {/* Duration Tag */}
 <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[9px] font-bold text-white flex items-center gap-1 font-mono">
 <Clock size={10} />
 <span>{video.duration}</span>
 </div>

 {/* Category Tag */}
 <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-full text-[9px] font-black text-primary ">
 {video.category}
 </div>
 </div>

 {/* Title & Info */}
 <div className="p-5 space-y-3">
 <h3 className="font-extrabold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
 {video.title}
 </h3>
 <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold">
 <span className="flex items-center gap-1">
 <Tv size={11} className="text-primary" />
 YouTube Channel
 </span>
 <span className="flex items-center gap-1">
 <Eye size={11} className="text-primary" />
 {video.views}
 </span>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
