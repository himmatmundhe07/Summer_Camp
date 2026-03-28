import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/shared/PrimaryButton';
import { Sparkles, Eye, EyeOff, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error: sbError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (sbError || !data.user) {
      setError(true);
      setTimeout(() => setError(false), 500);
    } else {
      setError(false);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[100svh] bg-[var(--color-bg-blue)] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Playful background */}
      <div className="absolute top-10 right-[10%] w-64 h-64 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-reverse" />
      
      <div className="absolute top-[20%] left-[15%] opacity-40 animate-bounce-slow hidden md:block">
        <Sparkles className="w-12 h-12 text-[var(--color-yellow)]" />
      </div>
      <div className="absolute bottom-[25%] right-[15%] opacity-50 animate-float hidden md:block">
        <Star className="w-16 h-16 text-[var(--color-primary)] fill-[var(--color-primary)]" />
      </div>
      
      <div className="w-full max-w-sm bg-white rounded-3xl border-2 border-[var(--color-text-main)] shadow-[8px_8px_0px_0px_rgba(45,55,72,1)] p-8 relative z-10 flex flex-col items-center">
        
        <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid mb-6 transform -rotate-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <h1 className="font-nunito font-black text-3xl text-[var(--color-text-main)] leading-none">
            Kalpana
          </h1>
          <span className="font-quicksand font-bold text-lg text-[var(--color-secondary)] leading-none">
            Admin
          </span>
        </div>

        <h2 className="font-quicksand font-bold text-[var(--color-text-muted)] mb-8 text-center">
          Shh... Grown-ups only zone!
        </h2>

        <form onSubmit={handleLogin} className="w-full">
          
          <div className="flex flex-col mb-4">
            <label className="font-nunito font-bold text-sm text-[var(--color-text-main)] mb-1.5 ml-1">
              Secret Email
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-gray-50 border-2 border-gray-200 focus:border-[var(--color-primary)] focus:bg-white rounded-xl focus:outline-none px-4 font-quicksand font-bold text-base text-[var(--color-text-main)] transition-all shadow-sm focus:shadow-[4px_4px_0px_0px_rgba(255,94,126,0.3)]"
              required
              placeholder="admin@kalpana.com"
            />
          </div>

          <div className="flex flex-col mb-8 relative">
            <label className="font-nunito font-bold text-sm text-[var(--color-text-main)] mb-1.5 ml-1">
              Magic Password
            </label>
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-gray-50 border-2 border-gray-200 focus:border-[var(--color-accent)] focus:bg-white rounded-xl focus:outline-none pl-4 pr-12 font-quicksand font-bold text-base text-[var(--color-text-main)] transition-all shadow-sm focus:shadow-[4px_4px_0px_0px_rgba(255,192,0,0.3)]"
              required
              placeholder="admin123"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[32px] text-gray-400 hover:text-[var(--color-text-main)] transition-colors p-1"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative w-full">
            <PrimaryButton 
              type="submit" 
              className={`w-full h-12 rounded-xl text-lg ${error ? 'bg-red-500 animate-shake' : 'bg-[var(--color-text-main)]'}`}
              icon={false}
            >
              Enter Dashboard
            </PrimaryButton>
            {error && (
              <div className="absolute top-full left-0 w-full text-center mt-3 font-quicksand font-bold text-sm text-red-500 animate-bounce-slow">
                Oops! Wrong magic words.
              </div>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
