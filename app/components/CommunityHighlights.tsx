"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
import { Heart, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { useToast } from '../context/AppContext';

interface CommunityProject {
  id: string;
  title: string;
  builder: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  award?: string;
}

export default function CommunityHighlights() {
  const { addToast } = useToast();

  const handleLike = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    addToast(`Liked project: "${title}"!`, "success");
  };

  const handleInteract = (title: string) => {
    addToast(`Opening community forum comments for: "${title}"...`, "info");
  };

  const projects: CommunityProject[] = [
    {
      id: 'hydroponics',
      title: 'Smart Hydroponics Control Grid',
      builder: 'Team AgroIoT • Pune',
      description: 'An automated climate, pH, and water pump monitoring grid powered by ESP32 WiFi nodes pushing metrics to Home Assistant via MQTT protocols.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400&auto=format&fit=crop',
      likes: 124,
      comments: 18,
      award: 'IoT Innovation Prize'
    },
    {
      id: 'robotarm',
      title: 'Inverse Kinematics 6-Axis Robot Arm',
      builder: 'IIT Robotics Club • Mumbai',
      description: 'Designed in Fusion360, SLA printed with engineering-grade resin, and actuated via high-voltage NEMA17 stepper motors controlled by STM32 boards.',
      image: '/Inverse%20Kinematics%206-Axis%20Robot%20Arm.png',
      likes: 242,
      comments: 32,
      award: 'Maker of the Month'
    },
    {
      id: 'drone',
      title: 'Autonomous FPV Racing Quadcopter',
      builder: 'Vidyut UAV Lab • Bengaluru',
      description: 'Custom carbon fiber frame, configured with Emax brushless motors, SKYRC power distributions, and real-time flight controllers running custom Betaflight profiles.',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400&auto=format&fit=crop',
      likes: 189,
      comments: 24,
      award: 'Aerospace Engineering Cup'
    }
  ];

  return (
    <section id="community" className="py-20 bg-background relative z-10 border-b border-border/30">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.01)_2px,transparent_2px)] [background-size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title="Community Builder Highlights"
          subtitle="Explore the latest systems engineered by our community makers, hackers, and students using Antigravity hardware."
          badge="Maker Hub"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => handleInteract(project.title)}
              className="bg-card border border-border/40 hover:border-primary/20 rounded-[28px] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 text-left cursor-pointer group glass-panel"
            >
              <div>
                {/* Project Image Layout */}
                <div className="relative aspect-video w-full bg-muted/20 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  
                  {project.award && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-500 text-zinc-950 border border-amber-400 rounded-full text-[8px] uppercase font-black flex items-center gap-1 shadow-md select-none">
                      <Award size={10} fill="currentColor" />
                      <span>{project.award}</span>
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <div className="p-5 space-y-3">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-primary font-bold">
                    {project.builder}
                  </span>
                  <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-3 border-t border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                  <button
                    onClick={(e) => handleLike(e, project.title)}
                    className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group/btn"
                  >
                    <Heart size={13} className="group-hover/btn:fill-rose-500 group-hover/btn:text-rose-500" />
                    <span>{project.likes}</span>
                  </button>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={13} />
                    <span>{project.comments}</span>
                  </span>
                </div>

                <button
                  onClick={() => handleInteract(project.title)}
                  className="text-xs font-extrabold text-primary hover:underline flex items-center gap-1 transition-all"
                >
                  <span>Discuss Project</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
