import { Link } from 'react-router-dom';
import { ArrowRight, Star, Palette, Rocket, Puzzle, Trophy, User, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-[120px] lg:pt-[140px] pb-16 flex items-center justify-center overflow-hidden px-6 lg:px-12 bg-[var(--color-bg-light)]">
      
      {/* Decorative Blobs */}
      <div className="absolute top-[10%] right-[-5%] w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute top-[30%] left-[-5%] w-72 h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow" />

      {/* Floating High-Quality SVG Icons */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[12%] left-[2%] lg:top-[20%] lg:left-[10%] animate-float scale-75 lg:scale-100 opacity-60 lg:opacity-100 z-0">
        <div className="bg-white p-3 lg:p-4 rounded-2xl border-2 border-[var(--color-text-main)] shadow-solid transform -rotate-6">
          <Palette className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--color-primary)]" />
        </div>
      </motion.div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute top-[18%] right-[2%] lg:top-[25%] lg:right-[15%] animate-float-reverse scale-75 lg:scale-100 opacity-60 lg:opacity-100 z-0">
        <div className="bg-white p-3 lg:p-4 rounded-2xl border-2 border-[var(--color-text-main)] shadow-solid transform rotate-12">
          <Rocket className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--color-accent)]" />
        </div>
      </motion.div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="absolute bottom-[28%] right-[2%] lg:bottom-[20%] lg:right-[20%] animate-float scale-75 lg:scale-100 opacity-60 lg:opacity-100 z-0">
        <div className="bg-white p-3 lg:p-4 rounded-2xl border-2 border-[var(--color-text-main)] shadow-solid transform -rotate-12">
          <Puzzle className="w-10 h-10 lg:w-12 lg:h-12 text-[var(--color-secondary)]" />
        </div>
      </motion.div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-[22%] left-[2%] lg:bottom-[15%] lg:left-[20%] animate-float-reverse scale-75 lg:scale-100 opacity-60 lg:opacity-100 z-0">
        <div className="bg-white p-3 lg:p-4 rounded-2xl border-2 border-[var(--color-text-main)] shadow-solid transform rotate-6">
          <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--color-blue)]" />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center w-full">
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-white border-2 border-[var(--color-text-main)] rounded-full px-4 py-1.5 lg:py-2 mb-6 shadow-[2px_2px_0px_0px_rgba(45,55,72,1)] transform -rotate-1 lg:-rotate-2"
        >
          <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--color-accent)] fill-[var(--color-accent)]" />
          <span className="font-nunito font-bold text-xs lg:text-sm">Ages 3-12 Years • Limited Seats!</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="font-nunito font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[var(--color-text-main)] leading-[1.15] mb-5 tracking-tight max-w-4xl"
        >
          The Most Magical <br/>
          <span className="relative inline-block mt-2 lg:mt-3 px-6 py-1 lg:py-2">
            <span className="absolute inset-0 bg-[var(--color-primary)] rounded-2xl lg:rounded-3xl -rotate-2 z-0 border-4 border-[var(--color-text-main)] shadow-solid"></span>
            <span className="relative z-10 text-white [-webkit-text-stroke:1px_#2D3748] lg:[-webkit-text-stroke:2px_#2D3748]">
              Summer Camp
            </span>
          </span><br className="hidden sm:block"/>
          <span className="inline-block mt-2 sm:mt-0"> in Valsad!</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="font-quicksand font-bold text-base sm:text-lg lg:text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl leading-relaxed px-4"
        >
          Art, music, games, and confidence building! Unplug your kids from screens and let them discover the joy of real-world creativity.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0 relative z-20"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link 
              to="/register" 
              className="btn-fun bg-[var(--color-secondary)] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-nunito font-black text-lg lg:text-xl flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Book Their Spot
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <a 
              href="#activities"
              className="btn-fun bg-white text-[var(--color-text-main)] px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-nunito font-black text-lg lg:text-xl flex items-center justify-center w-full sm:w-auto"
            >
              See Activities
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="mt-10 lg:mt-12 flex items-center gap-3 lg:gap-4 bg-white/50 backdrop-blur-sm pr-5 lg:pr-6 pl-1.5 lg:pl-2 py-1.5 lg:py-2 rounded-full border-2 border-dashed border-gray-300"
        >
          <div className="flex -space-x-3 lg:-space-x-4">
             <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-primary)] border-2 border-white flex items-center justify-center transform -rotate-6 shadow-sm">
                <Smile className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
             </div>
             <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-accent)] border-2 border-white flex items-center justify-center z-10 shadow-sm">
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
             </div>
             <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--color-secondary)] border-2 border-white flex items-center justify-center transform rotate-6 shadow-sm">
                <Smile className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
             </div>
          </div>
          <p className="font-quicksand font-bold text-xs lg:text-sm text-[var(--color-text-main)]">
            Join <span className="text-[var(--color-primary)]">50+ happy kids</span> this summer!
          </p>
        </motion.div>

      </div>
    </section>
  );
}
