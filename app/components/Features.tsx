"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Truck, Award, FileText, Headphones, ShieldCheck, Zap, RotateCcw, Cpu } from 'lucide-react';
import SectionTitle from './SectionTitle';

/* ── Animated Counter ─────────────────────────────── */
interface StatItemProps {
  toValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color: string;
}

function StatItem({ toValue, suffix = '', prefix = '', label, color }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, toValue, { duration: 2.2, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { ctrl.stop(); unsub(); };
  }, [inView, count, toValue, rounded]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-1.5 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center"
    >
      <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight" style={{ color }}>
        {prefix}{display}{suffix}
      </div>
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </motion.div>
  );
}

/* ── Feature card data ───────────────────────────── */
const features = [
  {
    icon: Truck,
    title: 'Same Day Shipping',
    desc: 'Orders placed before 3 PM are dispatched the same day from our Bengaluru warehouse.',
    color: '#10b981',
    bg: 'from-emerald-50 to-white',
  },
  {
    icon: Award,
    title: '140+ Global Brands',
    desc: 'Authorised distributor for Arduino, Raspberry Pi, DJI, Cytron, Adafruit and more.',
    color: '#059669',
    bg: 'from-emerald-50/70 to-white',
  },
  {
    icon: FileText,
    title: 'GST Invoice Support',
    desc: 'Tax-compliant invoice with your company / institute GSTIN, sent instantly on shipping.',
    color: '#34d399',
    bg: 'from-green-50 to-white',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    desc: 'Expert hardware & firmware diagnostics from our dedicated engineering support team.',
    color: '#047857',
    bg: 'from-emerald-100/50 to-white',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Encrypted gateway supporting Net Banking, UPI, Cards and Institutional POs.',
    color: '#22c55e',
    bg: 'from-green-50/80 to-white',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Express networks reach top Indian cities and maker spaces within 24–48 hours.',
    color: '#16a34a',
    bg: 'from-green-50 to-white',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '10-day replacement policy for manufacturing defects on un-soldered components.',
    color: '#4ade80',
    bg: 'from-green-50/60 to-white',
  },
  {
    icon: Cpu,
    title: 'Original Components',
    desc: 'Strict quality control — no clone microchips or counterfeit materials in our stock.',
    color: '#065f46',
    bg: 'from-emerald-100/40 to-white',
  },
];

const stats = [
  { toValue: 140,  suffix: '+',  label: 'Global Brands',         color: '#10b981' },
  { toValue: 100,  suffix: '%',  label: 'Original Components',   color: '#059669' },
  { toValue: 50000,suffix: '+',  label: 'Orders Fulfilled',      color: '#34d399' },
  { toValue: 24,   suffix: '/7', label: 'Technical Sales Desk',  color: '#047857' },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <SectionTitle
          title="Why Choose Ocean Student Projects"
          subtitle="India's premier verified hardware pipeline — original components, rapid logistics and expert engineering support."
          badge="Marketplace Values"
        />

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 mb-16">
          {features.map(({ icon: Icon, title, desc, color, bg }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className={`group relative flex flex-col gap-4 p-6 rounded-3xl bg-gradient-to-b ${bg} border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              {/* Left colour bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full opacity-70"
                style={{ background: color }}
              />

              {/* Icon bubble */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <div>
                <h3 className="font-extrabold text-[15px] text-slate-800 leading-snug mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Animated stat counters ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
        </div>

      </div>
    </section>
  );
}
