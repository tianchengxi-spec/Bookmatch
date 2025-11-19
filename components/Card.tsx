import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, useAnimation } from 'framer-motion';
import { Book } from '../types';
import { Info, X, Heart } from 'lucide-react';

interface CardProps {
  book: Book;
  onSwipe: (direction: 'left' | 'right') => void;
  frontCard: boolean;
}

export const Card: React.FC<CardProps> = ({ book, onSwipe, frontCard }) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Overlay opacities
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      await controls.start({ x: 500, transition: { duration: 0.2 } });
      onSwipe('right');
    } else if (offset < -100 || velocity < -500) {
      await controls.start({ x: -500, transition: { duration: 0.2 } });
      onSwipe('left');
    } else {
      controls.start({ x: 0 });
    }
  };

  if (!frontCard) {
    return (
      <div className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform scale-95 translate-y-4 opacity-50 pointer-events-none">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-2/3 object-cover filter grayscale"
        />
        <div className="p-6 bg-white h-1/3">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      drag={true}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      animate={controls}
      className="absolute inset-0 bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden select-none border border-gray-200"
    >
      {/* Swipe Indicators */}
      <motion.div 
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 z-20 border-4 border-green-500 rounded-lg px-4 py-2 transform -rotate-12"
      >
        <span className="text-green-500 font-bold text-4xl uppercase tracking-wider">Like</span>
      </motion.div>

      <motion.div 
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-8 z-20 border-4 border-red-500 rounded-lg px-4 py-2 transform rotate-12"
      >
        <span className="text-red-500 font-bold text-4xl uppercase tracking-wider">Nope</span>
      </motion.div>

      {/* Card Content */}
      <div className="relative h-full flex flex-col">
        <div className="h-3/4 relative bg-gray-100">
            <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-white">
                 <h2 className="text-3xl font-bold serif leading-tight">{book.title}</h2>
                 <p className="text-lg text-gray-200 opacity-90">{book.author}</p>
            </div>
        </div>

        <div className="flex-1 p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
                {book.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wide rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
          </div>
          
          <div className="flex justify-between items-center text-gray-400 text-sm mt-2">
             <div className="flex items-center gap-2">
                <Info size={16} />
                <span>Tap for details</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Control Hints Overlay (Bottom) */}
      <div className="absolute bottom-0 w-full h-1 bg-gray-100">
          <div className="grid grid-cols-2 h-full">
             <div className="bg-red-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
             <div className="bg-green-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </div>
      </div>

    </motion.div>
  );
};