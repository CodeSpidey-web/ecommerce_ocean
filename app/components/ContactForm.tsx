"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useToast } from '../context/AppContext';
import { Send, CheckCircle2, ChevronDown } from 'lucide-react';

export default function ContactForm() {
 const { addToast } = useToast();
 const [formData, setFormData] = useState({
 name: '',
 phone: '',
 email: '',
 category: '',
 message: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitted, setSubmitted] = useState(false);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 const { name, value } = e.target;
 setFormData((prev) => ({
 ...prev,
 [name]: value
 }));
 };

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!formData.name || !formData.phone || !formData.email || !formData.category) {
 addToast("Please fill in all required fields.", "error");
 return;
 }

 setIsSubmitting(true);
 
 // Simulate API call
 setTimeout(() => {
 setIsSubmitting(false);
 setSubmitted(true);
 addToast("Inquiry sent successfully! Our technical team will get back to you soon.", "success");
 setFormData({ name: '', phone: '', email: '', category: '', message: '' });
 }, 1500);
 };

 return (
 <div id="contact-form-section" className="bg-card border border-border/40 rounded-[28px] p-6 md:p-8 shadow-xl relative overflow-hidden text-left bg-gradient-to-b from-card to-card/95 z-10">
 {submitted ? (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="flex flex-col items-center justify-center text-center py-16 gap-5"
 >
 <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
 <CheckCircle2 size={32} />
 </div>
 <div>
 <h3 className="text-xl font-extrabold text-foreground">Message Sent!</h3>
 <p className="text-xs md:text-sm text-muted-foreground max-w-sm mt-2 font-light leading-relaxed">
 Thank you for contacting us. Our technical sales coordinators and engineers will review your specifications and reply to your email within 4 hours.
 </p>
 </div>
 <button
 onClick={() => setSubmitted(false)}
 className="mt-4 px-6 py-2.5 rounded-full border border-border text-xs font-bold hover:bg-muted transition-colors cursor-pointer"
 >
 Send Another Inquiry
 </button>
 </motion.div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-6">
 {/* Header block */}
 <div>
 <h2 className="text-2xl font-black text-foreground tracking-tight">Send Us an Inquiry</h2>
 <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 font-light leading-normal">
 Select your inquiry category below, and our engineering desk will reach out within 4 hours.
 </p>
 </div>

 <div className="space-y-4">
 {/* Row 1: Name and Phone */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="relative">
 <input
 type="text"
 name="name"
 required
 value={formData.name}
 onChange={handleChange}
 placeholder="Your Full Name *"
 className="w-full text-xs px-5 py-3.5 rounded-full border border-border/80 bg-muted/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
 />
 </div>
 
 <div className="relative">
 <input
 type="tel"
 name="phone"
 required
 value={formData.phone}
 onChange={handleChange}
 placeholder="Phone Number *"
 className="w-full text-xs px-5 py-3.5 rounded-full border border-border/80 bg-muted/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
 />
 </div>
 </div>

 {/* Row 2: Email */}
 <div className="relative">
 <input
 type="email"
 name="email"
 required
 value={formData.email}
 onChange={handleChange}
 placeholder="Email Address *"
 className="w-full text-xs px-5 py-3.5 rounded-full border border-border/80 bg-muted/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
 />
 </div>

 {/* Row 3: Inquiry Category Selection */}
 <div className="relative">
 <select
 name="category"
 required
 value={formData.category}
 onChange={handleChange}
 className="w-full text-xs px-5 py-3.5 rounded-full border border-border/80 bg-muted/10 text-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-all cursor-pointer appearance-none pr-10"
 >
 <option value="" disabled className="text-muted-foreground/60">Select Inquiry Type *</option>
 <option value="technical_sales">Technical Sales Support</option>
 <option value="pcb_inquiry">PCB Manufacturing Inquiry</option>
 <option value="printing_inquiry">3D Printing Inquiry</option>
 <option value="laser_inquiry">Laser Cutting Inquiry</option>
 <option value="vendor_registration">Vendor Registration Form</option>
 <option value="bulk_order">Bulk Order Inquiry</option>
 <option value="partnership">Business Partnerships</option>
 <option value="consultation">Technical Consultation</option>
 </select>
 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
 <ChevronDown size={14} />
 </div>
 </div>

 {/* Row 4: Message */}
 <div className="relative">
 <textarea
 name="message"
 rows={4}
 value={formData.message}
 onChange={handleChange}
 placeholder="Describe your design specifications or requirements (e.g., thickness, material, quantity)"
 className="w-full text-xs px-5 py-4 rounded-[22px] border border-border/80 bg-muted/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-card transition-all resize-none"
 />
 </div>
 </div>

 {/* Row 5: Submit Button with Indigo gradient */}
 <div className="space-y-3">
 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full py-4 rounded-full bg-primary text-primary-foreground font-extrabold uppercase text-xs tracking-widest shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
 >
 {isSubmitting ? (
 <span>Submitting...</span>
 ) : (
 <>
 <Send size={13} />
 <span>Submit Inquiry</span>
 </>
 )}
 </button>

 {/* Row 6: Footnote */}
 <p className="text-[10px] text-center text-muted-foreground font-light leading-normal">
 By submitting an inquiry, you agree to our <a href="#" className="underline hover:text-primary transition-colors">Terms & Conditions</a> and <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
 </p>
 </div>
 </form>
 )}
 </div>
 );
}
