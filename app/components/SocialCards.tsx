"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const Instagram = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Twitter = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

interface SocialPost {
  id: string;
  username: string;
  avatar: string;
  platform: 'instagram' | 'twitter';
  handle: string;
  image?: string;
  content: string;
  likes: string;
  comments: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'p1',
    username: 'alex_tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    platform: 'instagram',
    handle: '@alex_tech',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop',
    content: 'Just upgraded my workspace with the Samsung Odyssey OLED G9 monitor! Dual-QHD 240Hz is absolutely insane for programming and gaming. Minimalist desk setup is complete. 🖥️✨ #desksetup #oled #pcsetup',
    likes: '1,420',
    comments: '87'
  },
  {
    id: 'p2',
    username: 'lisa_creates',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    platform: 'instagram',
    handle: '@lisa_creates',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop',
    content: 'Editing photos on the new Apple MacBook Pro M4 Pro. The Tandem Liquid Retina screen is breathtaking. Color grading has never been so accurate. 📸💻 #creative #apple #macbookpro #photography',
    likes: '984',
    comments: '42'
  },
  {
    id: 'p3',
    username: 'design_minimal',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    platform: 'twitter',
    handle: '@design_minimal',
    content: 'The Nothing Phone (3) glyph interface is such a beautiful design choice. Real conversation starter, and stock Nothing OS is incredibly snappy. Less screen time, more focus. 📱🖤 @nothing #nothingphone #techdesign',
    likes: '512',
    comments: '18'
  }
];

export default function SocialCards() {
  return (
    <div className="py-12">
      <SectionTitle
        title="Community Gallery"
        subtitle="See how our community integrates premium gear into their setups. Tag us on socials to get featured!"
        badge="Social Feed"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8">
        {SOCIAL_POSTS.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-between bg-card border border-border/40 rounded-[20px] overflow-hidden shadow-lg glass-panel"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/30">
                  <Image
                    src={post.avatar}
                    alt={post.username}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground leading-none">{post.username}</h4>
                  <span className="text-[10px] text-muted-foreground">{post.handle}</span>
                </div>
              </div>
              <div>
                {post.platform === 'instagram' ? (
                  <Instagram size={16} className="text-pink-500" />
                ) : (
                  <Twitter size={16} className="text-sky-500" />
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="flex-1 flex flex-col justify-between">
              {post.image && (
                <div className="relative aspect-video w-full bg-muted/20 overflow-hidden border-b border-border/10">
                  <Image
                    src={post.image}
                    alt="Social media post attachment"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              
              <div className="p-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Post Footer Action Bar */}
            <div className="p-4 border-t border-border/10 flex items-center justify-between">
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart size={14} />
                  <span className="text-[10px] font-bold">{post.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageCircle size={14} />
                  <span className="text-[10px] font-bold">{post.comments}</span>
                </button>
                
                <button className="hover:text-primary transition-colors">
                  <Send size={14} />
                </button>
              </div>

              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Bookmark size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
