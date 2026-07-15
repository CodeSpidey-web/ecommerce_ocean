"use client";

import React from 'react';

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent("Hi! I have a question about your products.");
    window.open(`https://api.whatsapp.com/send?phone=917338975699&text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 md:bottom-24 right-6 z-50 p-3.5 bg-white rounded-full shadow-lg shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.696.724 5.216 1.984 7.396L2.5 29.5l6.288-1.54A13.95 13.95 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 2c6.627 0 12 5.373 12 12s-5.373 12-12 12c-2.204 0-4.26-.6-6.028-1.632l-.452-.276-3.732.916.916-3.656-.296-.476A11.94 11.94 0 014 16C4 9.373 9.373 4 16 4z" fill="#25D366"/>
        <path d="M11.278 8.5c-.27 0-.71.102-1.09.51-.38.408-1.45 1.416-1.45 3.454s1.486 4.006 1.694 4.282c.208.276 2.804 4.47 6.934 6.09 3.782 1.484 4.134 1.054 4.882.988.748-.066 2.416-.988 2.756-1.942.34-.954.34-1.772.238-1.942-.102-.17-.374-.276-.782-.482-.408-.206-2.416-1.192-2.79-1.328-.374-.136-.646-.206-.918.206-.272.412-1.054 1.328-1.292 1.6-.238.272-.476.306-.884.102-.408-.204-1.724-.636-3.286-2.028-1.214-1.082-2.034-2.418-2.272-2.828-.238-.41-.026-.632.178-.836.184-.184.408-.48.612-.72.204-.24.272-.412.408-.688.136-.276.068-.516-.034-.722-.102-.206-.918-2.212-1.258-3.028-.33-.794-.666-.688-.918-.702-.238-.014-.51-.014-.78-.014z" fill="#25D366"/>
      </svg>
    </button>
  );
}
