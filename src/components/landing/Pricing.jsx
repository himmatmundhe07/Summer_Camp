import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Ticket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function Pricing() {
  
  const popConfetti = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ['#FF5E7E', '#00D09C', '#FFC000'],
      zIndex: 150
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <section id="pricing" className="bg-[var(--color-bg-blue)] border-t-2 border-[var(--color-text-main)] py-24 px-6 lg:px-12 relative">
      
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-accent)] border-2 border-[var(--color-text-main)] rounded-full px-4 py-2 mb-6 shadow-solid -rotate-2">
            <span className="font-nunito font-bold text-[var(--color-text-main)] text-sm lg:text-base">Simple Pricing</span>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            <h2 className="font-nunito font-black text-4xl lg:text-6xl text-[var(--color-text-main)] leading-tight">
              Choose What Fits Best!
            </h2>
            <div className="w-16 h-16 bg-white rounded-full border-2 border-[var(--color-text-main)] shadow-solid flex items-center justify-center transform rotate-12">
               <Ticket className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Option 1 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="card-fun bg-white rounded-3xl border-2 border-[var(--color-text-main)] p-8 flex flex-col cursor-pointer"
          >
            <h3 className="font-nunito font-black text-2xl text-[var(--color-text-main)] mb-2">Daily 3 Hours</h3>
            <p className="font-quicksand font-bold text-[var(--color-text-muted)] mb-6">Perfect for morning energy bursts!</p>
            
            <div className="mb-8">
              <span className="font-nunito font-black text-5xl text-[var(--color-text-main)]">₹500</span>
            </div>

            <ul className="space-y-4 font-quicksand font-bold text-lg text-[var(--color-text-main)] mb-10 flex-grow">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)] shrink-0" /> Morning sessions</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)] shrink-0" /> 8 AM to 11 AM daily</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)] shrink-0" /> All activities included</li>
            </ul>

            <Link 
              to="/register" 
              onClick={popConfetti}
              className="btn-fun bg-[var(--color-primary)] text-white w-full py-4 rounded-xl font-nunito font-black text-xl flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              Select Plan
            </Link>
          </motion.div>

          {/* Option 2 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="card-fun bg-[#FFE285] rounded-3xl border-2 border-[var(--color-text-main)] p-8 flex flex-col relative transform lg:-translate-y-4 cursor-pointer"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white font-nunito font-bold px-4 py-1.5 rounded-full border-2 border-[var(--color-text-main)] shadow-solid whitespace-nowrap flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Most Popular!
            </div>
            
            <h3 className="font-nunito font-black text-2xl text-[var(--color-text-main)] mb-2 mt-2">Day Care</h3>
            <p className="font-quicksand font-bold text-[var(--color-text-main)]/70 mb-6">For busy parents who want peace of mind.</p>
            
            <div className="mb-8 flex items-baseline gap-2">
              <span className="font-nunito font-black text-5xl text-[var(--color-text-main)]">₹2500</span>
            </div>

            <ul className="space-y-4 font-quicksand font-bold text-lg text-[var(--color-text-main)] mb-10 flex-grow">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-text-main)] shrink-0" /> Everything in Class</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-text-main)] shrink-0" /> Extended care till 6 PM</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-text-main)] shrink-0" /> Engaging afternoon activities</li>
            </ul>

            <Link 
              to="/register" 
              onClick={popConfetti}
              className="btn-fun bg-[var(--color-text-main)] text-white w-full py-4 rounded-xl font-nunito font-black text-xl flex items-center justify-center active:scale-[0.98] transition-transform hover:shadow-[6px_6px_0px_0px_rgba(255,94,126,1)]"
            >
              Select Plan
            </Link>
          </motion.div>

          {/* Option 3 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="card-fun bg-white rounded-3xl border-2 border-[var(--color-text-main)] p-8 flex flex-col cursor-pointer"
          >
            <h3 className="font-nunito font-black text-2xl text-[var(--color-text-main)] mb-2">Hostel</h3>
            <p className="font-quicksand font-bold text-[var(--color-text-muted)] mb-6">The ultimate summer vacation away!</p>
            
            <div className="mb-8 flex items-baseline gap-2">
              <span className="font-nunito font-black text-5xl text-[var(--color-text-main)]">₹7000</span>
            </div>

            <ul className="space-y-4 font-quicksand font-bold text-lg text-[var(--color-text-main)] mb-10 flex-grow">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)] shrink-0" /> Class + Day Care</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)] shrink-0" /> Full residential facility</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)] shrink-0" /> 24/7 care and supervision</li>
            </ul>

            <Link 
              to="/register" 
              onClick={popConfetti}
              className="btn-fun bg-[var(--color-blue)] text-white w-full py-4 rounded-xl font-nunito font-black text-xl flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              Select Plan
            </Link>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
           <div className="inline-block bg-white border-2 border-dashed border-[var(--color-text-muted)] rounded-2xl p-6 shadow-sm">
             <p className="font-quicksand font-bold text-lg text-[var(--color-text-main)]">
                Have questions about Day Care or Hostel pricing? <br/>
                <a href="tel:+919737190333" className="text-[var(--color-primary)] hover:underline mt-2 inline-block">Dial Kalpana: +91 97371 90333 📞</a>
             </p>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
