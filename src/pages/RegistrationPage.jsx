import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import StepIndicator from '../components/registration/StepIndicator';
import StepOne from '../components/registration/StepOne';
import StepTwo from '../components/registration/StepTwo';
import StepThree from '../components/registration/StepThree';
import { ArrowLeft, Home, Sparkles, Cloud, Star, StarHalf } from 'lucide-react';

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [step]);

  const updateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
  };

  return (
    <div className="min-h-[100svh] bg-[var(--color-bg-blue)] overflow-x-hidden flex flex-col relative">
      
      {/* Decorative background vectors */}
      <div className="absolute top-20 left-10 opacity-30 animate-float hidden lg:block">
        <Cloud className="w-24 h-24 text-[var(--color-primary)] fill-[var(--color-primary)]" />
      </div>
      <div className="absolute top-40 right-20 opacity-30 animate-float-reverse hidden lg:block">
        <Cloud className="w-32 h-32 text-white fill-white" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] opacity-40 animate-bounce-slow hidden lg:block">
        <Star className="w-16 h-16 text-[var(--color-yellow)] fill-[var(--color-yellow)]" />
      </div>
      <div className="absolute bottom-[10%] right-[15%] opacity-40 animate-float hidden lg:block">
        <StarHalf className="w-12 h-12 text-[var(--color-blue)] fill-[var(--color-blue)] rotate-45" />
      </div>

      {/* Header */}
      <div className="w-full py-4 px-6 flex items-center justify-between relative z-40 lg:max-w-4xl lg:mx-auto mt-4">
        <Link to="/" className="absolute left-6 lg:left-8 top-6 lg:top-8 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid active:translate-y-1 active:shadow-sm transition-all z-20 hover:bg-gray-50">
          <Home className="w-6 h-6 text-[var(--color-text-main)]" />
        </Link>

        {/* Floating fun title */}
        <div className="w-full flex justify-center pt-8 z-10 relative">
          <div className="bg-white px-6 py-2 rounded-full border-2 border-[var(--color-text-main)] shadow-solid inline-flex items-center gap-2">
            <span className="font-nunito font-black text-[var(--color-text-main)] text-xl flex items-center gap-2">
              Register for Fun! <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col w-full lg:max-w-4xl lg:mx-auto mt-2 pb-20 z-10">
        <StepIndicator currentStep={step} />

        <div className="w-full flex-grow flex justify-center mt-2 px-4 pb-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="w-full flex flex-col items-center"
            >
              {step === 1 && <StepOne data={formData} updateData={updateData} onNext={nextStep} />}
              {step === 2 && <StepTwo data={formData} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
              {step === 3 && <StepThree data={formData} onBack={prevStep} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
