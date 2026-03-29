import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are the camp timings?",
      answer: "The 'Daily 3 Hours' session runs from 8:00 AM to 11:00 AM. For parents who need extended care, our 'Day Care' option runs until 6:00 PM!"
    },
    {
      question: "Are meals provided?",
      answer: "Meals are provided exclusively for our Hostel option! Healthy, delicious, and kid-approved meals and snacks are fully included."
    },
    {
      question: "What should my child bring?",
      answer: "Just comfortable clothes, a water bottle, and their imagination! All art supplies, craft materials, and tools are provided by the camp."
    },
    {
      question: "Is there a sibling discount?",
      answer: "Absolutely! If a group of 5 siblings or friends join the camp together, we will give a special ₹100 OFF the total!"
    }
  ];

  return (
    <section className="bg-[var(--color-bg-light)] border-t-2 border-[var(--color-text-main)] py-20 px-6 lg:px-12 relative overflow-hidden">
      
      <div className="absolute top-[5%] lg:top-[10%] left-[2%] lg:left-[5%] opacity-30 lg:opacity-50 animate-pulse-soft scale-50 lg:scale-100">
        <Sparkles className="w-16 h-16 text-[var(--color-primary)]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 bg-white border-2 border-[var(--color-text-main)] rounded-full px-4 py-2 shadow-solid rotate-1">
            <HelpCircle className="w-5 h-5 text-[var(--color-purple)]" />
            <span className="font-nunito font-bold text-[var(--color-text-main)] text-sm lg:text-base">Got Questions?</span>
          </div>
          <h2 className="font-nunito font-black text-4xl lg:text-5xl text-[var(--color-text-main)]">
            Frequently Asked
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`bg-white border-2 border-[var(--color-text-main)] rounded-2xl overflow-hidden transition-all ${isOpen ? 'shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] bg-[#FFFBEA]' : 'shadow-sm'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left focus:outline-none"
                >
                  <span className="font-nunito font-black text-[17px] lg:text-xl text-[var(--color-text-main)] pr-8">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full border-2 border-[var(--color-text-main)] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-[var(--color-primary)] text-white rotate-180' : 'bg-gray-100 text-[var(--color-text-main)]'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 lg:p-6 pt-0 font-quicksand font-bold text-[15px] lg:text-lg text-[var(--color-text-muted)] leading-relaxed border-t-2 border-dashed border-gray-200 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
