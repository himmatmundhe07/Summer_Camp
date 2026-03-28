import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    
    // If not on home page, navigate home then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md z-50 border-b-2 border-gray-100 flex items-center justify-between px-6 lg:px-12 shadow-sm">
        {/* Brand */}
        <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl overflow-hidden rotate-3 group-hover:rotate-12 transition-transform flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid bg-white">
            <img src="/src/assets/Logo.webp" alt="Kalpana Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-nunito font-black text-2xl text-[var(--color-text-main)] tracking-tight">
            Kalpana<span className="text-[var(--color-secondary)]">Camp</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-quicksand font-bold text-[16px] text-[var(--color-text-muted)]">
          <Link to="/organizers" className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Organizers</Link>
          <button onClick={(e) => handleScroll(e, 'activities')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Activities</button>
          <button onClick={(e) => handleScroll(e, 'pricing')} className="hover:text-[var(--color-secondary)] transition-colors cursor-pointer">Pricing</button>
          <Link to="/admin" className="hover:text-[var(--color-orange)] transition-colors cursor-pointer flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> Admin</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link 
            to="/register" 
            className="btn-fun bg-[var(--color-accent)] text-[var(--color-text-main)] px-6 py-2.5 rounded-xl font-nunito font-bold text-[16px] flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Join the Fun!
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden text-[var(--color-text-main)] p-2 z-50 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 bg-white z-40 p-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top-4 duration-200 shadow-md">
          <Link to="/organizers" onClick={() => setIsOpen(false)} className="font-nunito font-bold text-2xl text-[var(--color-text-main)] text-left pb-4 border-b border-gray-100">Organizers</Link>
          <button onClick={(e) => handleScroll(e, 'activities')} className="font-nunito font-bold text-2xl text-[var(--color-text-main)] text-left pb-4 border-b border-gray-100">Activities</button>
          <button onClick={(e) => handleScroll(e, 'pricing')} className="font-nunito font-bold text-2xl text-[var(--color-text-main)] text-left pb-4 border-b border-gray-100">Pricing</button>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="font-nunito font-bold text-2xl text-[var(--color-text-muted)] text-left pb-4 border-b border-gray-100 flex items-center justify-between">Admin Dashboard <Sparkles className="w-5 h-5"/></Link>
          <div className="mt-auto pb-8">
            <Link 
              to="/register" 
              onClick={() => setIsOpen(false)}
              className="btn-fun w-full bg-[var(--color-accent)] text-[var(--color-text-main)] px-6 py-4 rounded-xl font-nunito font-black text-xl flex items-center justify-center gap-2"
            >
              <Calendar className="w-6 h-6" />
              Join the Fun!
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
