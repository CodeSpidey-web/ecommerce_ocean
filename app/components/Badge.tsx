import React from 'react';

interface BadgeProps {
 children: React.ReactNode;
 variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';
 className?: string;
}

export default function Badge({
 children,
 variant = 'primary',
 className = ''
}: BadgeProps) {
 
 const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full tracking-wide';
 
 const variants = {
 primary: 'bg-primary/10 text-primary border border-primary/20',
 secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
 accent: 'bg-accent/10 text-accent-foreground border border-accent/20',
 success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
 warning: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
 danger: 'bg-red-500/10 text-red-600 border border-red-500/20',
 outline: 'border border-border text-muted-foreground'
 };

 return (
 <span className={`${baseStyles} ${variants[variant]} ${className}`}>
 {children}
 </span>
 );
}
