import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MobileStickyCTA() {
  const popConfetti = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ['#FF5E7E', '#00D09C', '#FFC000', '#4589FF'],
      zIndex: 9999
    });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-[var(--color-text-main)] p-4 z-40 lg:hidden pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <Link 
        to="/register" 
        onClick={popConfetti}
        className="w-full flex items-center justify-center gap-2 bg-[var(--color-text-main)] text-white py-3.5 rounded-xl font-nunito font-black text-[18px] shadow-[4px_4px_0px_0px_rgba(255,192,0,1)] active:shadow-none active:translate-y-1 transition-all"
      >
        <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
        Join the Fun!
      </Link>
    </div>
  );
}
