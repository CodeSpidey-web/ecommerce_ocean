"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useToast } from '../context/AppContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
 const { addToast } = useToast();
 const [email, setEmail] = useState('');
 const [subscribed, setSubscribed] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const handleSubscribe = (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;

 setIsLoading(true);
 // Simulate API subscribing
 setTimeout(() => {
 setIsLoading(false);
 setSubscribed(true);
 addToast("Subscribed successfully! Check your inbox for your 10% coupon.", "success");
 setEmail('');
 }, 1500);
 };

 return (
 <section className="py-4 bg-background relative overflow-hidden z-10 border-t border-border/20">
 <div className="max-w-7xl mx-auto px-4 md:px-8">
 
 {/* Banner container */}
 <motion.div
 initial={{ opacity: 0, y: 15 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="relative max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 rounded-[20px] p-5 md:py-5 md:px-8 border border-primary/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
 >
 {/* Left Text */}
 <div className="flex-1 max-w-md space-y-2 text-left">
 <div className="inline-flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest">
 <Mail size={10} />
 <span>Newsletter Updates</span>
 </div>
 <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-foreground leading-tight">
 Unlock 10% Off Your Next Order
 </h3>
 <p className="text-[11px] md:text-xs text-muted-foreground font-light leading-relaxed">
 Subscribe to receive updates on exclusive hardware announcements, limited restocks, and curated product collections.
 </p>
 </div>

 {/* Right Input Form */}
 <div className="flex-shrink-0 w-full md:w-auto min-w-[280px]">
 {subscribed ? (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-3 px-4 rounded-full"
 >
 <CheckCircle2 size={16} className="flex-shrink-0" />
 <div className="text-[10px] font-black uppercase tracking-wider">You are on the list!</div>
 </motion.div>
 ) : (
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Enter your email address"
 className="flex-1 px-4.5 py-2.5 text-xs rounded-full border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-all w-full min-w-[180px] shadow-sm"
 />
 
 <Button
 variant="primary"
 type="submit"
 disabled={isLoading}
 className="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md shadow-primary/5"
 >
 {isLoading ? 'Subscribing...' : 'Subscribe'}
 </Button>
 </form>
 )}
 </div>

 </motion.div>
 </div>
 </section>
 );
}
