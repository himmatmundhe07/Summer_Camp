import { Heart, Sparkles, MapPin, Phone, MessageCircle, Star } from 'lucide-react';

// Custom WhatsApp SVG built to scale cleanly
const WhatsAppIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-12 px-6 lg:px-12 border-t-2 border-[var(--color-text-main)] text-center relative overflow-hidden">
      
      {/* Decorative shapes */}
      <div className="absolute top-10 right-[10%] opacity-50 animate-bounce-slow">
        <Sparkles className="w-16 h-16 text-[var(--color-accent)]" />
      </div>
      <div className="absolute top-[20%] left-[5%] opacity-50 animate-float">
        <Star className="w-12 h-12 text-[var(--color-primary)] fill-[var(--color-primary)]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        <div className="w-16 h-16 bg-[var(--color-purple)] rounded-2xl flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid mb-6 transform rotate-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-nunito font-black text-4xl text-[var(--color-text-main)] tracking-tight mb-2">
          Kalpana<span className="text-[var(--color-primary)]">Camp</span>
        </h2>
        
        <p className="font-quicksand font-bold text-lg text-[var(--color-text-muted)] mb-8 max-w-sm">
          Where summers turn into lifelong memories!
        </p>

        <div className="w-full h-0.5 bg-gray-200 mb-8 max-w-md mx-auto rounded"></div>

        <div className="bg-[var(--color-bg-yellow)] border-2 border-[var(--color-text-main)] shadow-solid p-6 md:p-8 rounded-2xl max-w-sm w-full mb-10 transform -rotate-1 relative">
          
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-text-main)] shadow-solid flex items-center justify-center transform rotate-12">
             <MessageCircle className="w-5 h-5 text-white" />
          </div>

          <h3 className="font-nunito font-black text-2xl text-[var(--color-text-main)] mb-4">Reach Out Us</h3>
          
          <div className="flex items-start justify-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
            <p className="font-quicksand font-bold text-[var(--color-text-main)] text-left leading-relaxed">
              123 Main Street, Near City Ground<br />
              Valsad, Gujarat 396001
            </p>
          </div>
          
          <a href="tel:+919737190333" className="w-full py-4 bg-[var(--color-secondary)] text-white font-nunito font-black text-[15px] border-2 border-[var(--color-text-main)] rounded-xl mb-3 flex items-center justify-center gap-2 hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[2px_2px_0px_0px_rgba(45,55,72,1)] hover:shadow-[6px_6px_0px_0px_rgba(45,55,72,1)]">
            <Phone className="w-5 h-5" />
            Call +91 97371 90333
          </a>
          <a href="https://wa.me/919737190333" target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-[#25D366] text-white font-nunito font-black text-[15px] border-2 border-[var(--color-text-main)] rounded-xl flex items-center justify-center gap-2.5 hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[2px_2px_0px_0px_rgba(45,55,72,1)] hover:shadow-[6px_6px_0px_0px_rgba(45,55,72,1)]">
            <WhatsAppIcon className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="font-quicksand font-bold text-[var(--color-text-muted)] flex items-center gap-2">
          Made with <Heart className="w-5 h-5 text-[var(--color-primary)] fill-[var(--color-primary)] animate-pulse-soft" /> for Kids
        </p>
        <p className="font-quicksand text-sm text-[var(--color-text-muted)] mt-2">
          &copy; {new Date().getFullYear()} Kalpana PreSchool.
        </p>

      </div>
    </footer>
  );
}
