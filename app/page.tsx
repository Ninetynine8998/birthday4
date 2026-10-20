'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Mali } from 'next/font/google';
import { Heart, Sparkles, Gift, X } from 'lucide-react';

const mali = Mali({ subsets: ['thai'], weight: ['400', '600', '700'] });

const chipsData = [
  {
    id: 1,
    type: 'letter',
    icon: <Heart className="text-red-400" />,
    title: '2 year 3 months ',
    content: 'ขอบคุณที่คอยอยู่ข้างๆ กันมาตลอดนะ เป็นความสบายใจให้กันแบบนี้ไปนานๆ เลยนะคุณแฟน รักที่สุดเลยยยย',
  },
  {
    id: 2,
    type: 'wish',
    icon: <Sparkles className="text-yellow-500" />,
    title: 'Happy Birthday! ',
    content: 'มีความสุขมากๆ นะคะคนเก่ง ขอให้ปีนี้เป็นปีที่น่ารักสำหรับเตง ไม่ปวดหลัง ไม่ปวดหัว สมหวังทุกเรื่องเลยน้า',
  },
  {
    id: 3,
    type: 'reward',
    icon: <Gift className="text-pink-500" />,
    title: 'You got a Gift! ',
    content: 'ตั๋วตามใจ 1 วันเต็ม! & เลี้ยงชาบูชุดใหญ่  (แคปหน้าจอนี้มาทวงสิทธิ์ได้เลยทันที)',
  }
];

export default function LaysBagTheme() {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [currentChipIndex, setCurrentChipIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [showPoppingChips, setShowPoppingChips] = useState(false);
  
  const topControls = useAnimation();

  // ฟังก์ชันเช็คการดึงฉีกถุง (Drag)
  const handleDragEnd = (event: any, info: any) => {
    if (Math.abs(info.offset.x) > 80 || info.offset.y < -80) {
      if (!isBagOpen) {
        
        topControls.start({ 
          x: info.offset.x * 3, 
          y: info.offset.y * 3 - 200, 
          rotate: info.offset.x > 0 ? 45 : -45, 
          opacity: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        });

        // หน่วงเวลาแก้บั๊คแอนิเมชันสะดุดบน iOS Safari
        setTimeout(() => {
          setIsBagOpen(true);
          setShowPoppingChips(true);
        }, 50);

        setTimeout(() => setShowPoppingChips(false), 1550);
      }
    }
  };

  const handlePickChip = () => setActiveModal(currentChipIndex);
  
  const handleCloseModal = () => {
    setActiveModal(null);
    if (currentChipIndex < chipsData.length) {
      setCurrentChipIndex(prev => prev + 1);
    }
  };

  return (
    <div className={`${mali.className} min-h-screen bg-[#FDF8E1] flex flex-col items-center justify-center p-4 overflow-x-hidden select-none touch-none`}>
      
      <motion.div 
        layout
        // ใช้ flex-col เป็นค่าเริ่มต้น (มือถือ ถุงจะอยู่ตรงกลาง Recap อยู่ล่าง) และใช้ md:flex-row สำหรับ PC (แบ่งซ้าย-ขวา)
        className={`flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16 w-full transition-all duration-1000 ease-in-out ${isBagOpen ? 'max-w-5xl' : 'max-w-sm'}`}
      >
        
        {/* ฝั่งซ้าย (PC) / ด้านบน (มือถือ): ถุงขนม */}
        <motion.div layout className="relative flex flex-col items-center z-10 w-full max-w-sm shrink-0">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#3d5a80] mb-1 drop-shadow-sm">A snack arrived!</h1>
            <p className="text-[#98c1d9] font-medium text-lg">for you</p>
          </div>

          <div className="relative w-[260px] h-[340px] flex flex-col items-center justify-end mt-4">
            
            <AnimatePresence>
              {showPoppingChips && (
                <>
                  <motion.div 
                    initial={{ y: 30, x: 0, scale: 0.5, opacity: 0, rotate: 0 }}
                    animate={{ y: -80, x: -30, scale: 1, opacity: 1, rotate: -25 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute top-0 left-[25%] z-0 w-12 h-14 bg-[#FFCA28] rounded-full shadow-sm"
                    style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                  />
                  <motion.div 
                    initial={{ y: 30, x: 0, scale: 0.5, opacity: 0, rotate: 0 }}
                    animate={{ y: -100, x: 20, scale: 1.2, opacity: 1, rotate: 40 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    className="absolute top-0 left-[45%] z-0 w-14 h-12 bg-[#FFCA28] rounded-full shadow-sm"
                    style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                  />
                  <motion.div 
                    initial={{ y: 30, x: 0, scale: 0.5, opacity: 0, rotate: 0 }}
                    animate={{ y: -60, x: 60, scale: 0.9, opacity: 1, rotate: 80 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                    className="absolute top-0 left-[60%] z-0 w-10 h-12 bg-[#FFCA28] rounded-full shadow-sm"
                    style={{ borderRadius: '50% 50% 40% 60% / 50% 60% 40% 50%' }}
                  />
                </>
              )}
            </AnimatePresence>

            {!isBagOpen && (
              <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                animate={topControls}
                className="absolute top-[-30px] left-0 w-full h-[70px] bg-[#FFCA28] z-30 flex flex-col justify-center items-center rounded-t-xl cursor-grab active:cursor-grabbing shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
              >
                <div className="absolute top-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDUsMCAxMCwxMCIgZmlsbD0iI0ZERjhFMSIvPjwvc3ZnPg==')] bg-repeat-x opacity-40" />
                <div className="bg-white/40 px-4 py-1.5 rounded-full text-yellow-900 text-sm font-bold animate-pulse shadow-sm pointer-events-none mt-2">
                  จับตรงนี้แล้วดึงเพื่อฉีกถุง 
                </div>
                <div className="absolute bottom-1 w-full border-b-[3px] border-dashed border-yellow-700/30" />
              </motion.div>
            )}

            <div className="w-full h-[320px] rounded-b-2xl shadow-xl flex flex-col items-center justify-center relative z-20 bg-[#FFD54F]">
              <div className="absolute top-[-20px] left-0 w-full h-[25px] overflow-hidden">
                <svg width="260" height="25" viewBox="0 0 260 25" style={{ display: 'block' }}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <g key={i} transform={`translate(${i * 26}, 0)`}>
                      <polygon points="0,25 13,5 26,25" fill="#FFD54F" />
                      <polygon points="10.5,9 13,5 15.5,9" fill="#D32F2F" />
                    </g>
                  ))}
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center mt-6">
                <div className="w-[110px] h-[110px] bg-[#f94144] rounded-full flex items-center justify-center border-[5px] border-white shadow-md transform -rotate-[10deg]">
                  <span className="text-white font-black text-3xl italic tracking-wider">Luvs</span>
                </div>
                <div className="mt-5 bg-[#FFCA28] px-6 py-2 rounded-full text-[#C62828] font-bold text-sm shadow-inner border border-yellow-500/50">
                  Flavor: 100% Yours
                </div>
              </div>
              
              <div className="absolute bottom-5 w-full flex flex-col gap-1.5 opacity-90">
                <div className="w-full h-[8px] bg-[#E65100]" />
                <div className="w-full h-[4px] bg-[#FF9800]" />
              </div>
            </div>
          </div>

          <div className="mt-12 h-16 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {isBagOpen && currentChipIndex < chipsData.length && (
                <motion.button
                  key="pick-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePickChip}
                  className="bg-[#f94144] hover:bg-[#d90429] text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 text-lg w-full max-w-[260px] justify-center transition-all cursor-pointer"
                >
                  หยิบแผ่นที่ {currentChipIndex + 1} 
                </motion.button>
              )}
              
              {isBagOpen && currentChipIndex >= chipsData.length && (
                <motion.p 
                  key="empty-text"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-gray-500 font-bold text-lg"
                >
                  หมดถุงแล้วจ้า! อร่อยมั้ยย 
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ฝั่งขวา (PC) / ด้านล่าง (มือถือ): โซน Recap */}
        <AnimatePresence>
          {isBagOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full md:w-1/2 max-w-sm md:max-w-md flex flex-col gap-4 mt-8 md:mt-16"
            >
              <h2 className="text-2xl font-bold text-[#f94144] mb-2 text-center md:text-left border-b-2 border-red-200 pb-2 flex items-center gap-2 justify-center md:justify-start">
                <span>ความทรงจำในถุง</span>
              </h2>
              
              {currentChipIndex === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-gray-400 font-medium text-center md:text-left animate-pulse py-8"
                >
                  ยังไม่มีแผ่นที่ถูกเปิด กดหยิบเลย์เลย! 
                </motion.div>
              )}

              <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-2 pb-10">
                {chipsData.slice(0, currentChipIndex).map((chip, idx) => (
                  <motion.div 
                    key={chip.id}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                    onClick={() => setActiveModal(idx)}
                    className="bg-white p-4 rounded-2xl shadow-sm border-2 border-yellow-200 flex items-center gap-4 hover:shadow-md hover:border-pink-300 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {React.cloneElement(chip.icon, { className: 'w-6 h-6 text-red-500' })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-md truncate">{chip.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1 leading-snug mt-1">{chip.content}</p>
                    </div>
                    <span className="text-xs bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full font-bold shrink-0">
                      อ่าน 
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* ป๊อปอัปแสดงรายละเอียดข้อความแบบเต็ม */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.8, rotate: -5 }} 
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }} 
              exit={{ opacity: 0, y: 50, scale: 0.9, rotate: 5 }}
              className="relative z-10 bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
              
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mt-2 relative z-10">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.cloneElement(chipsData[activeModal].icon, { className: 'w-8 h-8 text-red-500' })}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                  {chipsData[activeModal].title}
                </h2>
                <motion.div 
                  initial={{ filter: 'blur(8px)', opacity: 0 }}
                  animate={{ filter: 'blur(0px)', opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="text-gray-600 leading-relaxed font-medium min-h-[100px] text-lg text-left bg-pink-50/50 p-4 rounded-xl border border-pink-100"
                >
                  {chipsData[activeModal].content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}