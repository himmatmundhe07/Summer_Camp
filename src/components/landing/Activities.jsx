import { motion } from 'framer-motion';
import { Palette, Scissors, Mic2, Calculator, BookOpen, Star, Sparkles } from 'lucide-react';

const activities = [
  {
    title: "Art Zone",
    desc: "Drawing, sketching, watercolours, and theme-based art projects. Because life is better in color!",
    Icon: Palette,
    color: "bg-[#FFE285]",
  },
  {
    title: "Craft & DIY",
    desc: "Paper cuts, 3D crafts, up-cycling household items creatively.",
    Icon: Scissors,
    color: "bg-[#FF9EC0]",
  },
  {
    title: "Public Speaking",
    desc: "Building confidence, stage presence, clear pronunciation. Everyone has a voice!",
    Icon: Mic2,
    color: "bg-[#D6AFFF]",
  },
  {
    title: "Math Fun",
    desc: "Mental sums, speed calculation, building a love for numbers.",
    Icon: Calculator,
    color: "bg-[#8CB8FF]",
  },
  {
    title: "Reading Skills",
    desc: "Phonics, vocabulary expansion, and magical storytelling sessions.",
    Icon: BookOpen,
    color: "bg-[#85E1C8]",
  }
];

export default function Activities() {
  return (
    <section id="activities" className="bg-[var(--color-bg-light)] py-24 px-6 lg:px-12 relative overflow-hidden">
      
      <div className="absolute top-20 lg:top-40 left-[2%] lg:left-[5%] opacity-30 lg:opacity-50 animate-bounce-slow scale-50 lg:scale-100">
        <Star className="w-16 h-16 text-[var(--color-accent)] fill-[var(--color-accent)]" />
      </div>
      <div className="absolute bottom-[2%] right-[2%] opacity-30 lg:opacity-50 animate-float scale-50 lg:scale-100" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-20 h-20 text-[var(--color-secondary)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--color-secondary)] border-2 border-[var(--color-text-main)] rounded-full px-4 py-2 mb-6 shadow-solid rotate-2">
            <span className="font-nunito font-bold text-white text-sm lg:text-base">What We Do!</span>
          </div>
          <h2 className="font-nunito font-black text-4xl lg:text-6xl text-[var(--color-text-main)] leading-tight max-w-2xl mx-auto">
            5 Ways to Spend Summer <span className="text-[var(--color-primary)] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/664131/underline.svg')] bg-no-repeat bg-bottom pb-4 bg-[length:100%_auto]">Better</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 lg:gap-8 pb-8 lg:pb-0 hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 auto-cols-[85%]">
          {activities.map((act, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`snap-center shrink-0 w-[85%] lg:w-full card-fun ${act.color} p-8 rounded-3xl border-2 border-[var(--color-text-main)] flex flex-col items-center text-center first:ml-0 last:mr-6 lg:last:mr-0`}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl border-2 border-[var(--color-text-main)] shadow-solid mb-5 lg:mb-6 flex items-center justify-center transform -rotate-3 text-[var(--color-text-main)] shrink-0">
                <act.Icon className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
              <h3 className="font-nunito font-black text-xl lg:text-2xl text-[var(--color-text-main)] mb-2 lg:mb-3">
                {act.title}
              </h3>
              <p className="font-quicksand font-bold text-sm lg:text-lg text-[var(--color-text-main)]/80 leading-relaxed">
                {act.desc}
              </p>
            </motion.div>
          ))}
          
          {/* Fun empty filler card for grid alignment on desktop */}
          <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className={`snap-center shrink-0 w-[85%] lg:w-full card-fun bg-white p-8 rounded-3xl border-2 border-dashed border-[var(--color-text-muted)] flex flex-col items-center justify-center text-center cursor-pointer mr-6 lg:mr-0`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
            >
              <div className="mb-4 animate-bounce-slow text-center bg-[var(--color-bg-yellow)] w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid mx-auto shrink-0">
                 <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-nunito font-black text-lg lg:text-xl text-[var(--color-text-muted)] mb-3">
                More surprises inside!
              </h3>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
