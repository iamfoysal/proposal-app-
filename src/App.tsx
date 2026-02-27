/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, Music, Sparkles, Send, Gift } from 'lucide-react';

const IMAGES = [
  { url: 'https://picsum.photos/seed/love1/800/1000', caption: 'The first time I saw you...' },
  { url: 'https://picsum.photos/seed/love2/800/1000', caption: 'That smile that brightens my day.' },
  { url: 'https://picsum.photos/seed/love3/800/1000', caption: 'Every moment with you is a treasure.' },
  { url: 'https://picsum.photos/seed/love4/800/1000', caption: 'You make the world a better place.' },
];

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isCrazy, setIsCrazy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const padding = 50;
    
    // Generate random position within the container
    const newX = Math.random() * (container.width - 150) - (container.width / 2) + 75;
    const newY = Math.random() * (container.height - 100) - (container.height / 2) + 50;
    
    setNoButtonPos({ x: newX, y: newY });
    setIsCrazy(true);
    
    // Reset "crazy" state after animation
    setTimeout(() => setIsCrazy(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] text-[#4a0e0e] font-sans selection:bg-rose-200">
      {/* Hero Section */}
      <header className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-rose-50 to-[#fff5f7]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6 fill-rose-500 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Hey Beautiful,</h1>
          <p className="text-xl text-rose-400 font-light tracking-widest uppercase">I have something to tell you...</p>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-sm opacity-50">Scroll down</p>
        </motion.div>
      </header>

      {/* Image Gallery */}
      <main className="max-w-4xl mx-auto py-20 px-6 space-y-32">
        {IMAGES.map((img, index) => (
          <motion.section 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
          >
            <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-rose-200/50">
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-rose-300 font-mono text-sm mb-2 block">0{index + 1}</span>
              <h2 className="text-3xl font-serif italic mb-4">{img.caption}</h2>
              <div className="h-px w-20 bg-rose-200 mx-auto md:mx-0"></div>
            </div>
          </motion.section>
        ))}

        {/* The Proposal Section */}
        <section ref={containerRef} className="relative min-h-[600px] flex items-center justify-center py-20">
          <AnimatePresence mode="wait">
            {!accepted ? (
              <motion.div
                key="proposal-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                className="bg-white p-12 rounded-[2rem] shadow-xl border border-rose-100 text-center max-w-md w-full relative z-10"
              >
                <Stars className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                <h3 className="text-3xl font-serif italic mb-8">
                  Do you accept my proposal if I propose you?
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    onClick={() => setAccepted(true)}
                    className="px-10 py-4 bg-rose-500 text-white rounded-full font-semibold shadow-lg shadow-rose-200 hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                  >
                    Yes! ❤️
                  </button>

                  <motion.button
                    animate={{ 
                      x: noButtonPos.x, 
                      y: noButtonPos.y,
                      rotate: isCrazy ? [0, 10, -10, 0] : 0
                    }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    className="px-10 py-4 bg-stone-100 text-stone-400 rounded-full font-semibold border border-stone-200 cursor-default w-full sm:w-auto"
                  >
                    No
                  </motion.button>
                </div>
                
                {isCrazy && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-10 left-0 right-0 text-rose-400 text-sm font-medium"
                  >
                    Nice try! But you can't say no! 😉
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-rose-100 text-center max-w-2xl w-full relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300"></div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-64 h-64 bg-rose-50 rounded-full opacity-50"
                />
                
                <div className="relative z-10">
                  <div className="flex justify-center gap-4 mb-8">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                    </motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>
                      <Sparkles className="w-12 h-12 text-amber-400" />
                    </motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>
                      <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                    </motion.div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-rose-600">
                    I Knew You'd Say Yes!
                  </h2>
                  
                  <div className="space-y-6 text-lg leading-relaxed text-stone-600 mb-10">
                    <p>
                      From the moment you walked into my life, everything changed. 
                      You are my favorite thought, my biggest inspiration, and the person 
                      I want to share all my tomorrows with.
                    </p>
                    <p className="font-serif italic text-2xl text-rose-400">
                      "You are the best thing that's ever been mine."
                    </p>
                    <p>
                      Thank you for being you. I promise to cherish every moment, 
                      to make you laugh every day, and to love you with all my heart.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
                        >
                          <Heart className="w-6 h-6 text-rose-300 fill-rose-300" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-rose-500 font-bold tracking-widest uppercase text-sm">Forever & Always</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-rose-300 text-sm">
        <p>Made with ❤️ just for you</p>
      </footer>

      {/* Floating Hearts Animation Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 + "%", 
              y: "110%" 
            }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: "-10%",
              x: (Math.random() * 100) + (Math.sin(i) * 10) + "%"
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 20 
            }}
            className="absolute"
          >
            <Heart className="w-4 h-4 text-rose-200 fill-rose-100" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
