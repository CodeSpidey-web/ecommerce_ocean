"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { tutorials } from '../../lib/products';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '../context/AppContext';

export default function BlogSection() {
  const { addToast } = useToast();

  const handleReadMoreClick = (title: string) => {
    addToast(`Launching reader view for: "${title}". (Offline mode: opening locally)`, "info");
  };

  return (
    <section id="blog" className="py-20 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title="Latest Technical Tutorials"
          subtitle="Deepen your embedded engineering expertise with register-level guides, PID loops, and IoT networking guides authored by maker experts."
          badge="Learn & Build"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {tutorials.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-card border border-border/45 hover:border-primary/20 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 text-left glass-panel"
            >
              <div>
                {/* Tutorial image block */}
                <div className="relative aspect-video w-full bg-muted/30 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/95 backdrop-blur-sm border border-border/40 rounded-full text-[9px] uppercase font-black text-primary select-none">
                    {post.category}
                  </div>
                </div>

                {/* Card body content */}
                <div className="p-5 space-y-3.5">
                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-primary" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={11} className="text-primary" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-primary" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Actions footer */}
              <div className="p-5 pt-3 border-t border-border/30 flex items-center justify-between">
                <button
                  onClick={() => handleReadMoreClick(post.title)}
                  className="text-xs font-extrabold text-primary hover:text-primary/80 transition-colors cursor-pointer flex items-center gap-1 group"
                >
                  <span>Read Tutorial</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
