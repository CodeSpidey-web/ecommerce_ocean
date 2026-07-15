"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export default function ToastContainer() {
 const { toasts, removeToast } = useToast();

 const icons = {
 success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
 info: <Info className="w-5 h-5 text-blue-500" />,
 warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
 error: <AlertCircle className="w-5 h-5 text-red-500" />
 };

 const borderColors = {
 success: 'border-emerald-500/20 ',
 info: 'border-blue-500/20 ',
 warning: 'border-amber-500/20 ',
 error: 'border-red-500/20 '
 };

 return (
 <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4">
 <AnimatePresence>
 {toasts.map((toast) => (
 <motion.div
 key={toast.id}
 initial={{ opacity: 0, y: 50, scale: 0.9 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -20, scale: 0.9 }}
 transition={{ type: 'spring', stiffness: 350, damping: 25 }}
 className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border glass-panel pointer-events-auto ${borderColors[toast.type]}`}
 >
 <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
 
 <div className="flex-1 text-sm font-medium text-foreground">
 {toast.message}
 </div>
 
 <button
 onClick={() => removeToast(toast.id)}
 className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
 aria-label="Close notification"
 >
 <X className="w-4 h-4" />
 </button>
 </motion.div>
 ))}
 </AnimatePresence>
 </div>
 );
}
