import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: April 27, 2026
    const targetDate = new Date('2026-04-27T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Unit = ({ value, label, color, rotate, delay }) => (
    <motion.div 
      initial={{ y: 30, opacity: 0, scale: 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      animate={{ scale: [1, 1.04, 1] }}
      whileHover={{ scale: 1.1, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        y: { type: "tween", duration: 0.4, ease: "easeOut", delay },
        opacity: { type: "tween", duration: 0.4, ease: "easeOut", delay },
        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`card-fun ${color} border-2 border-[var(--color-text-main)] rounded-2xl flex flex-col items-center justify-center py-6 px-4 ${rotate} cursor-pointer`}
    >
      <div className={`font-nunito font-black text-4xl lg:text-6xl text-[var(--color-text-main)] leading-tight`}>
        {value.toString().padStart(2, '0')}
      </div>
      <div className="font-quicksand font-bold text-xs lg:text-sm tracking-widest text-[var(--color-text-main)] mt-2">
        {label}
      </div>
    </motion.div>
  );

  return (
    <section className="bg-[var(--color-bg-yellow)] border-y-2 border-[var(--color-text-main)] py-20 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-[10%] w-full h-[200px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgwdjIwaC0ydi0weiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <div className="flex items-center justify-center gap-3 mb-10">
           <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid">
             <Clock className="w-6 h-6 text-white" />
           </div>
           <h2 className="font-nunito font-black text-3xl lg:text-5xl text-[var(--color-text-main)]">
             The adventure starts in...
           </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full">
          <Unit value={timeLeft.days} label="DAYS" color="bg-[#FF9EC0]" rotate="-rotate-2" delay={0.1} />
          <Unit value={timeLeft.hours} label="HOURS" color="bg-[#85E1C8]" rotate="rotate-2" delay={0.2} />
          <Unit value={timeLeft.minutes} label="MINUTES" color="bg-[#FFE285]" rotate="-rotate-1" delay={0.3} />
          <Unit value={timeLeft.seconds} label="SECONDS" color="bg-[#8CB8FF]" rotate="rotate-3" delay={0.4} />
        </div>

      </div>
    </section>
  );
}
