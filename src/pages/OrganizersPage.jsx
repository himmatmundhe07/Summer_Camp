import { useEffect } from 'react';
import { Sparkles, Trophy, Star, Target, Users, Cloud, StarHalf } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function OrganizersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100svh] flex flex-col bg-[var(--color-bg-light)]">
      <Navbar />
      
      <main className="flex-grow pt-[100px] lg:pt-[100px] pb-12 lg:pb-8 px-6 lg:px-12 relative overflow-hidden flex flex-col justify-center">
        
        {/* Decorative elements */}
        <div className="absolute top-[15%] left-[5%] opacity-40 animate-float hidden lg:block">
          <Star className="w-12 h-12 text-[var(--color-accent)] fill-[var(--color-accent)]" />
        </div>
        <div className="absolute top-[40%] right-[5%] opacity-40 animate-bounce-slow hidden lg:block">
          <Sparkles className="w-16 h-16 text-[var(--color-primary)]" />
        </div>
        <div className="absolute bottom-[20%] left-[10%] opacity-30 animate-float-reverse hidden lg:block">
          <Cloud className="w-20 h-20 text-[var(--color-blue)] fill-[var(--color-blue)]" />
        </div>
        <div className="absolute bottom-[10%] right-[15%] opacity-40 animate-bounce-slow hidden lg:block">
          <StarHalf className="w-10 h-10 text-[var(--color-yellow)] fill-[var(--color-yellow)] rotate-45" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 w-full mt-4 lg:mt-0">
          
          <div className="text-center mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 bg-[var(--color-text-main)] border-2 border-[var(--color-text-main)] rounded-full px-3 py-1.5 mb-4 shadow-solid rotate-2">
              <Users className="w-4 h-4 text-white" />
              <span className="font-nunito font-bold text-white text-xs lg:text-sm">Meet the Team</span>
            </div>
            <h1 className="font-nunito font-black text-3xl lg:text-5xl text-[var(--color-text-main)] leading-tight">
              The Minds Behind <span className="text-[var(--color-primary)]">The Magic!</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Organizer 1: Hanuman Mundhe (Main) */}
            <div className="bg-white rounded-[2rem] border-2 border-[var(--color-text-main)] shadow-[6px_6px_0px_0px_rgba(45,55,72,1)] p-6 relative flex flex-col items-center text-center transform -rotate-1 lg:hover:-translate-y-2 lg:transition-transform cursor-default">
              <div className="absolute -top-4 -right-2 lg:-right-4 bg-[var(--color-primary)] text-white font-nunito font-black text-[10px] lg:text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border-2 border-[var(--color-text-main)] shadow-solid rotate-6 flex items-center gap-1 z-10">
                <Trophy className="w-3 h-3 lg:w-4 lg:h-4" /> Director
              </div>
              
              <div className="w-24 h-24 lg:w-28 lg:h-28 bg-[#FFE285] rounded-full border-2 border-[var(--color-text-main)] shadow-solid mb-4 flex items-center justify-center relative -mt-2">
                <span className="font-nunito font-black text-[var(--color-text-main)] text-3xl lg:text-4xl opacity-40">HM</span>
              </div>
              
              <h2 className="font-nunito font-black text-2xl lg:text-3xl text-[var(--color-text-main)] mb-1">
                Hanuman Mundhe
              </h2>
              <h3 className="font-quicksand font-bold text-base lg:text-lg text-[var(--color-primary)] mb-4">
                Main Organizer & Visionary
              </h3>
              
              <p className="font-quicksand font-bold text-sm lg:text-base text-[var(--color-text-muted)] leading-relaxed mb-4">
                Hanuman is the driving force behind the Kalpana Camp. With a deep passion for unlocking creative confidence, he designs innovative curriculum modules that blend fun with genuine skillset growth.
              </p>
              
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                <span className="px-2 py-1 bg-[#F8FAFC] border-2 border-[var(--color-text-main)] rounded-lg font-quicksand font-bold text-[10px] lg:text-xs text-[var(--color-text-main)] shadow-sm">Leadership</span>
                <span className="px-2 py-1 bg-[#F8FAFC] border-2 border-[var(--color-text-main)] rounded-lg font-quicksand font-bold text-[10px] lg:text-xs text-[var(--color-text-main)] shadow-sm">Strategy</span>
              </div>
            </div>

            {/* Organizer 2: Kalpana Mundhe */}
            <div className="bg-[#FFFBEA] rounded-[2rem] border-2 border-[var(--color-text-main)] shadow-[6px_6px_0px_0px_rgba(45,55,72,1)] p-6 relative flex flex-col items-center text-center transform rotate-1 lg:hover:-translate-y-2 lg:transition-transform cursor-default lg:mt-4">
              <div className="absolute -top-4 -right-2 lg:-right-4 bg-[var(--color-secondary)] text-white font-nunito font-black text-[10px] lg:text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border-2 border-[var(--color-text-main)] shadow-solid -rotate-6 flex items-center gap-1 z-10">
                <Target className="w-3 h-3 lg:w-4 lg:h-4" /> Co-Director
              </div>
              
              <div className="w-24 h-24 lg:w-28 lg:h-28 bg-[#FF9EC0] rounded-full border-2 border-[var(--color-text-main)] shadow-solid mb-4 flex items-center justify-center relative -mt-2">
                <span className="font-nunito font-black text-[var(--color-text-main)] text-3xl lg:text-4xl opacity-40">KM</span>
              </div>
              
              <h2 className="font-nunito font-black text-2xl lg:text-3xl text-[var(--color-text-main)] mb-1">
                Kalpana Mundhe
              </h2>
              <h3 className="font-quicksand font-bold text-base lg:text-lg text-[var(--color-secondary)] mb-4">
                Co-Organizer
              </h3>
              
              <p className="font-quicksand font-bold text-sm lg:text-base text-[var(--color-text-muted)] leading-relaxed mb-4">
                Kalpana is the heart of the camp operations. Her incredible attention to detail ensures every child is safe, happy, and fully engaged. She coordinates everything from art supplies to daily nutrition.
              </p>
              
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                <span className="px-2 py-1 bg-white border-2 border-[var(--color-text-main)] rounded-lg font-quicksand font-bold text-[10px] lg:text-xs text-[var(--color-text-main)] shadow-sm">Operations</span>
                <span className="px-2 py-1 bg-white border-2 border-[var(--color-text-main)] rounded-lg font-quicksand font-bold text-[10px] lg:text-xs text-[var(--color-text-main)] shadow-sm">Child Care</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
