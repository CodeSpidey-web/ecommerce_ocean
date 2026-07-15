"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Printer, Scissors, BatteryCharging, ArrowRight, Upload, Zap } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { useToast } from '../context/AppContext';

interface ServiceItem {
 id: string;
 title: string;
 icon: React.ReactNode;
 description: string;
 details: string[];
 ctaText: string;
 badge?: string;
}

export default function ServicesSection() {
 const { addToast } = useToast();
 const [activeUpload, setActiveUpload] = useState<string | null>(null);

 const handleCtaClick = (serviceTitle: string) => {
 addToast(`Inquiry wizard for ${serviceTitle} launched! Redirecting to Contact page...`, "success");
 // Scroll to contact form or redirect if on another page
 const contactForm = document.getElementById('contact-form-section');
 if (contactForm) {
 contactForm.scrollIntoView({ behavior: 'smooth' });
 } else {
 window.location.href = '/contact';
 }
 };

 const services: ServiceItem[] = [
 {
 id: 'pcb',
 title: 'PCB Manufacturing',
 icon: <Cpu className="w-6 h-6" />,
 description: 'Professional grade FR4 and Aluminum PCB prototyping. Single/Double sided and multi-layer board fabrication with custom green/blue/black solder masks.',
 details: ['4-Layer Prototyping', 'Impedance Control', 'Min Trace: 4mil', 'HASL & ENIG Finish'],
 ctaText: 'Upload Gerber Files',
 badge: 'Rapid 24h Turnaround'
 },
 {
 id: '3dprint',
 title: '3D Printing (FDM & SLA)',
 icon: <Printer className="w-6 h-6" />,
 description: 'High precision 3D printing services for mechanical enclosures, brackets, and organic components using PLA, PETG, ABS, and UV photopolymer resins.',
 details: ['FDM Layer Height: 0.1mm', 'SLA Layer Height: 0.025mm', 'Engineering materials', 'Industrial finishing'],
 ctaText: 'Instant Quote',
 badge: 'FDM & SLA'
 },
 {
 id: 'lasercut',
 title: 'Laser Cutting',
 icon: <Scissors className="w-6 h-6" />,
 description: 'Precision laser profiling for chassis plates, structural mount panels, and custom gears across industrial acrylic, wood, and sheet metals.',
 details: ['Acrylic up to 12mm', 'MDF & Wood up to 10mm', 'Aluminum & Steel up to 3mm', 'Kerf offset compensation'],
 ctaText: 'Submit Drawing',
 badge: 'Metal & Acrylic'
 },
 {
 id: 'battery',
 title: 'Custom Battery Assembly',
 icon: <BatteryCharging className="w-6 h-6" />,
 description: 'Tailored Lithium-ion (18650/21700) and LiPo battery pack compilation. Spot-welded assemblies with integrated Smart BMS circuitry, specific shapes, and capacity thresholds.',
 details: ['Spot-welded Nickel sheets', 'Custom BMS Integration', 'Voltage configuration (1S-10S)', 'Thermal sleeve encapsulation'],
 ctaText: 'Design Battery Pack',
 badge: 'Certified Safe'
 }
 ];

 return (
 <section id="services" className="py-20 bg-background/50 border-t border-b border-border/30 relative z-10">
 <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

 <div className="max-w-7xl mx-auto px-4 md:px-8">
 <SectionTitle
 title="Custom Engineering Services"
 subtitle="Submit your design files and manufacturing requirements to receive custom prototype quotes within hours."
 badge="Rapid Prototyping"
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
 {services.map((svc, idx) => (
 <motion.div
 key={svc.id}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: idx * 0.1 }}
 whileHover={{ y: -6 }}
 className="bg-card border border-border/40 hover:border-primary/30 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:shadow-2xl transition-all duration-300 text-left glass-panel"
 >
 {/* Top ambient glow on hover */}
 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
 <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

 <div>
 <div className="flex items-center justify-between gap-4 mb-5">
 <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
 {svc.icon}
 </div>
 {svc.badge && (
 <span className="text-[9px] uppercase font-black tracking-wider px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-primary select-none">
 {svc.badge}
 </span>
 )}
 </div>

 <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors mb-3">
 {svc.title}
 </h3>
 <p className="text-xs text-muted-foreground leading-relaxed font-light mb-6">
 {svc.description}
 </p>

 <div className="grid grid-cols-2 gap-2 mb-8">
 {svc.details.map((detail, dIdx) => (
 <div key={dIdx} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
 <Zap size={10} className="text-amber-500" />
 <span>{detail}</span>
 </div>
 ))}
 </div>
 </div>

 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-border/30">
 <Button
 variant="primary"
 className="rounded-full flex-1 gap-2 text-xs font-bold py-3 uppercase tracking-wider"
 onClick={() => handleCtaClick(svc.title)}
 >
 <Upload size={13} />
 <span>{svc.ctaText}</span>
 </Button>

 <button
 onClick={() => handleCtaClick(svc.title)}
 className="text-xs font-extrabold hover:text-primary text-muted-foreground hover:underline transition-all flex items-center justify-center gap-1.5 cursor-pointer"
 >
 <span>Request Custom Quote</span>
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
