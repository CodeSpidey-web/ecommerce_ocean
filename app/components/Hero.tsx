"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cpu, Wifi, Zap, Radar, Settings, Printer, Battery, Wind,
  ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck
} from "lucide-react";

/* ─── Slide data ─────────────────────────────────────── */
const slides = [
  {
    badge: "INDIA'S LARGEST ENGINEERING MARKETPLACE",
    headline1: "Build The",
    headline2: "Future.",
    sub: "One-stop shop for Robotics, IoT, PCB Manufacturing, 3D Printing and Maker Hardware — shipped same day from Bengaluru.",
    cta1: { label: "Shop Components", href: "/products" },
    cta2: { label: "Explore Services", href: "#services" },
    benefit1: "Same Day Shipping",
    benefit2: "GST Invoice Support",
    accentFrom: "#10b981",
    accentTo: "#34d399",
  },
  {
    badge: "AUTHENTIC MAKER HARDWARE",
    headline1: "Next-Gen Dev",
    headline2: "Boards.",
    sub: "Arduino UNO R4, Raspberry Pi 5, ESP32-S3, STM32 Blue Pill — original, certified and in stock.",
    cta1: { label: "Browse Boards", href: "/products?category=Development%20Boards" },
    cta2: { label: "Technical Support", href: "/contact" },
    benefit1: "Original Components",
    benefit2: "Datasheet Included",
    accentFrom: "#059669",
    accentTo: "#10b981",
  },
  {
    badge: "RAPID MANUFACTURING LAB",
    headline1: "Custom PCB &",
    headline2: "3D Prints.",
    sub: "Upload your Gerber or STL files and get an instant quote on FR4 PCBs, SLA/FDM prints and acrylic laser cutting.",
    cta1: { label: "PCB Quote", href: "/contact" },
    cta2: { label: "3D Print Quote", href: "/contact" },
    benefit1: "24-Hour Lead Time",
    benefit2: "Quality Reports",
    accentFrom: "#16a34a",
    accentTo: "#4ade80",
  },
];

/* ─── Floating icons config ──────────────────────────── */
const floatingIcons = [
  { Icon: Cpu,      top: "12%", left: "8%",   delay: 0,    size: 28, color: "#3b82f6" },
  { Icon: Wifi,     top: "20%", left: "88%",  delay: 0.5,  size: 22, color: "#06b6d4" },
  { Icon: Zap,      top: "55%", left: "92%",  delay: 1,    size: 24, color: "#f59e0b" },
  { Icon: Radar,    top: "70%", left: "6%",   delay: 0.3,  size: 20, color: "#ef4444" },
  { Icon: Settings, top: "38%", left: "4%",   delay: 0.8,  size: 22, color: "#f97316" },
  { Icon: Printer,  top: "80%", left: "84%",  delay: 1.2,  size: 20, color: "#a855f7" },
  { Icon: Battery,  top: "15%", left: "75%",  delay: 0.6,  size: 18, color: "#22c55e" },
  { Icon: Wind,     top: "62%", left: "78%",  delay: 1.5,  size: 18, color: "#14b8a6" },
];

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setSlide((p) => (p + 1) % slides.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const next = () => { setDir(1);  setSlide((p) => (p + 1) % slides.length); };
  const prev = () => { setDir(-1); setSlide((p) => (p - 1 + slides.length) % slides.length); };

  const s = slides[slide];

  const textVariants = {
    enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit:   (d: number) => ({ opacity: 0, y: d < 0 ? 40 : -40 }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* ── Light gradient base ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Soft radial glow blobs ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`blob-${slide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] opacity-10"
            style={{ background: `radial-gradient(circle, ${s.accentFrom}, transparent 70%)` }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[110px] opacity-10"
            style={{ background: `radial-gradient(circle, ${s.accentTo}, transparent 70%)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Floating Icons ── */}
      {floatingIcons.map(({ Icon, top, left, delay, size, color }, i) => (
        <motion.div
          key={i}
          className="absolute z-10 pointer-events-none"
          style={{ top, left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            y: [0, -14, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 4 + i * 0.4,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="rounded-2xl flex items-center justify-center shadow-sm"
            style={{
              width: size * 2.2,
              height: size * 2.2,
              background: `rgba(${hexToRgb(color)}, 0.08)`,
              border: `1.5px solid rgba(${hexToRgb(color)}, 0.20)`,
              backdropFilter: "blur(6px)",
            }}
          >
            <Icon size={size} style={{ color }} />
          </div>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-10 text-center flex flex-col items-center gap-7">

        {/* Badge */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`badge-${slide}`}
            custom={dir}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black tracking-widest uppercase select-none shadow-sm"
            style={{
              borderColor: `rgba(${hexToRgb(s.accentFrom)}, 0.35)`,
              background: `rgba(${hexToRgb(s.accentFrom)}, 0.10)`,
              color: s.accentFrom,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accentFrom }} />
            {s.badge}
          </motion.div>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.h1
            key={`head-${slide}`}
            custom={dir}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-slate-900"
          >
            {s.headline1}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${s.accentFrom}, ${s.accentTo})` }}
            >
              {s.headline2}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.p
            key={`sub-${slide}`}
            custom={dir}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, delay: 0.1 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed font-light"
          >
            {s.sub}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`cta-${slide}`}
            custom={dir}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={s.cta1.href}>
              <button
                className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${s.accentFrom}, ${s.accentTo})`,
                  boxShadow: `0 8px 32px rgba(${hexToRgb(s.accentFrom)}, 0.4)`,
                }}
              >
                {s.cta1.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href={s.cta2.href}>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-slate-700 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                {s.cta2.label}
              </button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Benefits row */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`ben-${slide}`}
            custom={dir}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-6 text-xs font-semibold text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-emerald-400" />
              {s.benefit1}
            </span>
            <span className="w-px h-4 bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sky-400" />
              {s.benefit2}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Nav Arrows ── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 flex items-center justify-center backdrop-blur-md shadow-sm transition-all"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 flex items-center justify-center backdrop-blur-md shadow-sm transition-all"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > slide ? 1 : -1); setSlide(i); }}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: slide === i ? 28 : 8,
              background: slide === i ? s.accentFrom : "rgba(15,23,42,0.20)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* Utility: convert hex to "r,g,b" string for rgba() */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
