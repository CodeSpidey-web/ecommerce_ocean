import React from 'react';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import SocialCards from '../components/SocialCards';
import { Phone, Mail, MapPin, Clock, Building } from 'lucide-react';

export const metadata = {
 title: 'Contact Us | Ocean Student Projects',
 description: 'Get in touch with Ocean Student Projects for robotics components, PCB manufacturing, 3D printing and electronics hardware inquiries.'
};

const FacebookIcon = () => (
 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
 </svg>
);

const InstagramIcon = () => (
 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
 </svg>
);

const YoutubeIcon = () => (
 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
 <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
 <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
 </svg>
);

const TwitterIcon = () => (
 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
 <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
 </svg>
);

const LinkedinIcon = () => (
 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
 <rect x="2" y="9" width="4" height="12"></rect>
 <circle cx="4" cy="4" r="2"></circle>
 </svg>
);

export default function ContactPage() {
 return (
 <main className="min-h-screen pt-12 pb-16 relative overflow-hidden bg-background">
 {/* CSS Dot Grid Background */}
 <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.04)_1.5px,transparent_1.5px)] [radial-gradient(rgba(96,165,250,0.02)_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-100 pointer-events-none" />

 {/* Background glowing flares */}
 <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
 <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

 <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start relative z-10">
 
 {/* Left Side: Info Column */}
 <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left w-full">
 {/* Pill Badge */}
 <div className="inline-flex px-5 py-2 rounded-full bg-primary text-primary-foreground font-extrabold text-[10px] uppercase tracking-widest select-none shadow-md shadow-primary/20">
 Support Desk
 </div>

 {/* Big Title */}
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.08]">
 Technical Support & <br />
 Business Inquiries
 </h1>

 {/* Subtitle */}
 <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
 Connect directly with our senior application engineers, PCB technologists, and vendor coordinators to set up project quotes or catalog listings.
 </p>

 {/* Aligned Details Container */}
 <div className="w-full max-w-lg p-6 rounded-[28px] bg-primary/5 border border-primary/20 space-y-6">
 
 {/* Phone Hotline */}
 <div className="flex items-center gap-4 text-left">
 <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-md shadow-primary/20 flex-shrink-0">
 <Phone size={16} />
 </div>
 <div className="flex flex-col">
 <span className="text-[9px] uppercase font-black text-muted-foreground tracking-wider leading-none">
 Technical Sales Desk
 </span>
 <span className="font-black text-base sm:text-lg text-foreground mt-2 leading-none">
 +91 73389 75699
 </span>
 </div>
 </div>

 {/* Email Queries */}
 <div className="flex items-center gap-4 text-left">
 <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-md shadow-primary/20 flex-shrink-0">
 <Mail size={16} />
 </div>
 <div className="flex flex-col">
 <span className="text-[9px] uppercase font-black text-muted-foreground tracking-wider leading-none">
 Email support
 </span>
 <span className="font-black text-base sm:text-[15px] text-foreground mt-2 leading-none select-all truncate">
 oceanstudentprojects@gmail.com 
 </span>
 </div>
 </div>

 {/* Working Hours */}
 <div className="flex items-center gap-4 text-left">
 <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-md shadow-primary/20 flex-shrink-0">
 <Clock size={16} />
 </div>
 <div className="flex flex-col">
 <span className="text-[9px] uppercase font-black text-muted-foreground tracking-wider leading-none">
 Working Hours
 </span>
 <span className="font-black text-xs sm:text-sm text-foreground mt-2 leading-none">
 Mon - Sat: 10:00 AM - 9:00 PM (IST)
 </span>
 </div>
 </div>

 {/* Office Address */}
 <div className="flex items-start gap-4 text-left">
 <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-md shadow-primary/20 flex-shrink-0 mt-0.5">
 <Building size={16} />
 </div>
 <div className="flex flex-col">
 <span className="text-[9px] uppercase font-black text-muted-foreground tracking-wider leading-none">
 Registered Address
 </span>
 <span className="font-semibold text-[11px] sm:text-xs text-foreground mt-2 leading-relaxed max-w-[240px]">
 No.12, Shop No.7, Narasingapuram Street, (Jothi Lodge Building) Mount Road, Chennai - 600 002.
 </span>
 </div>
 </div>

 </div>



 {/* Socials Follow Row */}
 <div className="space-y-3 text-left w-full mt-4">
 <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider block">
 Follow Us
 </span>
 <div className="flex items-center gap-3">
 {[
 { icon: <FacebookIcon />, href: '#' },
 { icon: <InstagramIcon />, href: '#' },
 { icon: <YoutubeIcon />, href: '#' },
 { icon: <TwitterIcon />, href: '#' },
 { icon: <LinkedinIcon />, href: '#' }
 ].map((social, idx) => (
 <a
 key={idx}
 href={social.href}
 className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-primary/20"
 >
 {social.icon}
 </a>
 ))}
 </div>
 </div>
 </div>

 {/* Right Side: Interactive Form */}
 <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
 <ContactForm />
 </div>
 </div>

 {/* Active Location Section */}
 <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-16 relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
 {/* Left Details Card */}
 <div className="lg:col-span-4 w-full bg-card border border-border/40 rounded-[28px] p-6 lg:p-7 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-center">
 <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-1.5 block">Active Location</span>
 <h2 className="text-2xl font-black text-foreground mb-6">Chennai</h2>
 
 <div className="space-y-4">
 {/* Address */}
 <div className="flex items-start gap-4">
 <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
 <MapPin size={16} />
 </div>
 <div>
 <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Address</h4>
 <p className="text-[13px] font-semibold text-foreground leading-snug">
 No.12, Shop No.7, Narasingapuram Street,<br/>
 (Jothi Lodge Building) Mount Road,<br/>
 Chennai - 600 002.
 </p>
 </div>
 </div>

 {/* Contact Numbers */}
 <div className="flex items-start gap-4">
 <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
 <Phone size={16} />
 </div>
 <div>
 <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Contact Numbers</h4>
 <p className="text-[13px] font-semibold text-foreground">
 +91 73389 75699
 </p>
 </div>
 </div>

 {/* Office Hours */}
 <div className="flex items-start gap-4">
 <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
 <Clock size={16} />
 </div>
 <div>
 <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Office Hours</h4>
 <p className="text-[13px] font-semibold text-foreground">
 Mon-Sat: 10:00 AM - 9:00 PM
 </p>
 </div>
 </div>
 </div>

 <a
 href="https://maps.app.goo.gl/5JayN4W8pj7VaYca8"
 target="_blank"
 rel="noopener noreferrer"
 className="mt-6 w-full py-3.5 rounded-full border-2 border-primary text-primary font-extrabold text-[13px] text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
 >
 Get Directions &rarr;
 </a>
 </div>

 {/* Right Map Iframe */}
 <div className="lg:col-span-8 w-full h-[350px] lg:h-auto rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-border/40 relative">
 <iframe
 src="https://maps.google.com/maps?q=Ocean+Student+Projects,+Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
 width="100%"
 height="100%"
 style={{ border: 0 }}
 allowFullScreen={false}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 className="absolute inset-0 w-full h-full"
 ></iframe>
 </div>
 </div>
 </div>

 {/* FAQs */}
 <FAQ />
 </main>
 );
}
