import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Printer, Home, PartyPopper, Star, Ticket } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function ConfirmationView() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.registrationData || {};
  const siblings = location.state?.siblings || [];
  const isWaitlisted = location.state?.isWaitlisted || false;
  const allCampers = [...siblings, data].filter(c => c.name);
  
  // Registration ID use real booking_id if we have it, else mock (if direct visit)
  const regId = data.booking_id || `CAMP2026-0000`;

  useEffect(() => {
    if (!data.name) return; // Don't fire celebration if no real data
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF5E7E', '#00D09C', '#FFC000', '#4589FF', '#B066FF'],
        gravity: 0.8
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF5E7E', '#00D09C', '#FFC000', '#4589FF', '#B066FF'],
        gravity: 0.8
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [data.name]);

  if (!data.name) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-[var(--color-bg-light)]">
        <h2 className="font-nunito font-black text-[var(--color-text-main)] text-3xl">No magic ticket found!</h2>
        <button 
          onClick={() => navigate('/')}
          className="btn-fun bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-nunito font-black"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-[var(--color-bg-yellow)] print:bg-white px-6 py-12 print:p-0 flex flex-col items-center justify-center relative overflow-hidden print:overflow-visible">
      
      {/* Decorative floating elements (hidden on print) */}
      <div className="absolute top-[10%] left-[10%] animate-float opacity-70 hidden md:block text-[var(--color-primary)] print:hidden">
         <Sparkles className="w-16 h-16" />
      </div>
      <div className="absolute bottom-[20%] right-[10%] animate-float-reverse opacity-70 hidden md:block text-[#00D09C] print:hidden">
         <PartyPopper className="w-20 h-20" />
      </div>
      <div className="absolute top-[30%] right-[20%] animate-bounce-slow opacity-70 hidden md:block text-[var(--color-accent)] print:hidden">
         <Star className="w-12 h-12 fill-current" />
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[32px] border-4 border-[var(--color-text-main)] shadow-[12px_12px_0px_0px_rgba(45,55,72,1)] print:shadow-none print:border-2 print:rounded-3xl flex flex-col items-center relative z-10 overflow-hidden print:m-0 print:w-[8in] print:max-w-none">
        
        {/* Header Block */}
        <div className="w-full bg-[#00D09C] border-b-4 border-[var(--color-text-main)] print:border-b-2 p-8 text-center relative">
          <h1 className="font-nunito font-black text-white text-4xl md:text-5xl print:text-black print:[text-shadow:none] drop-shadow-md tracking-tight uppercase">Kalpana Camp</h1>
          <p className="font-quicksand font-bold text-white/90 print:text-gray-600 tracking-[0.3em] uppercase mt-3">2026 Entry Pass</p>
          
          {/* Side Cutouts */}
          <div className="absolute top-[90%] -right-8 w-16 h-16 bg-[var(--color-bg-yellow)] print:bg-white rounded-full border-4 border-[var(--color-text-main)] print:border-2 z-20"></div>
          <div className="absolute top-[90%] -left-8 w-16 h-16 bg-[var(--color-bg-yellow)] print:bg-white rounded-full border-4 border-[var(--color-text-main)] print:border-2 z-20"></div>
        </div>

        {/* Content Block */}
        {allCampers.map((camper, idx) => (
          <div key={idx} className={`w-full flex flex-col sm:flex-row print:flex-row bg-[#FAFAFA] print:bg-white min-h-[300px] ${idx !== allCampers.length - 1 ? 'border-b-4 border-dashed border-gray-300' : ''}`}>
             
             <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center gap-6 relative">
                <div className="border-b-2 border-dashed border-gray-300 pb-4">
                  <p className="text-xs font-nunito font-black uppercase tracking-widest text-[var(--color-primary)] mb-1">Camper</p>
                  <p className="text-3xl font-quicksand font-bold text-[var(--color-text-main)] truncate max-w-[200px] sm:max-w-[350px] print:max-w-[400px]" title={camper.name}>{camper.name}</p>
                </div>
                
                <div className="flex gap-4 border-b-2 border-dashed border-gray-300 pb-4">
                  <div className="flex-[0.8]">
                    <p className="text-xs font-nunito font-black uppercase tracking-widest text-[#4589FF] mb-1">Age & Class</p>
                    <p className="text-xl font-quicksand font-bold text-[var(--color-text-main)]">{camper.age} Yrs • {camper.class}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-nunito font-black uppercase tracking-widest text-[#B066FF] mb-1">Package</p>
                    <p className="text-xl font-quicksand font-bold text-[var(--color-text-main)]">
                      {camper.campType === 'daycare' ? 'Day Care' : camper.campType === 'hostel' ? 'Hostel' : 'Daily 3 Hours'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-nunito font-black uppercase tracking-widest text-gray-500 mb-2">Booking ID</p>
                  <p className="text-2xl font-nunito font-black text-[var(--color-text-main)] flex items-center gap-2 bg-white border-2 border-[var(--color-text-main)] rounded-xl px-4 py-2 inline-flex shadow-sm">
                    <Ticket className="w-6 h-6 text-[#FFC000]" /> {regId}
                  </p>
                </div>
             </div>

             {/* Tear-off Stub / Status block */}
             <div className="sm:w-[220px] print:w-[220px] border-t-4 sm:border-t-0 sm:border-l-4 border-dashed border-[var(--color-text-main)] print:border-[var(--color-text-main)] p-8 flex flex-col items-center justify-center gap-6 bg-white shrink-0">
                 <div className="text-center w-full">
                     <p className="text-[10px] font-nunito font-black text-gray-400 uppercase tracking-widest mb-2">Payment Status</p>
                     <div className={`py-3 px-4 ${isWaitlisted ? 'bg-red-500 border-red-700 text-white' : 'bg-[#FFE285] border-[#E6AC00]'} border-2 rounded-xl font-nunito font-black uppercase tracking-widest text-[10px] sm:text-sm inline-block w-full shadow-solid overflow-hidden px-1`}>
                       {isWaitlisted ? 'WAITLISTED' : 'PENDING'}
                     </div>
                 </div>
                 
                 {/* Real QR Code */}
                 <div className="w-full aspect-square border-4 border-[var(--color-text-main)] rounded-xl flex items-center justify-center p-3 relative bg-white">
                     <QRCodeSVG 
                       value={`${regId}-${camper.name}`} 
                       size={100} 
                       style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                       fgColor="#2D3748"
                     />
                 </div>
                 
                 <p className="text-[9px] text-gray-400 font-quicksand font-bold text-center uppercase tracking-widest leading-tight">Must present ticket <br/>at drop-off</p>
             </div>

          </div>
        ))}
      </div>
      
      {/* Controls Container (Hidden on Print) */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 print:hidden w-full max-w-md">
          <button 
            onClick={() => window.print()}
            className="flex-1 btn-fun bg-white border-4 border-[var(--color-text-main)] text-[var(--color-text-main)] h-16 rounded-2xl font-nunito font-black flex items-center justify-center gap-3 text-lg shadow-[8px_8px_0px_0px_rgba(45,55,72,1)] hover:bg-gray-50 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] transition-all"
          >
            <Printer className="w-6 h-6 text-[var(--color-primary)]" />
            Print Ticket
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex-1 btn-fun bg-[var(--color-blue)] border-4 border-[var(--color-text-main)] text-white h-16 rounded-2xl font-nunito font-black flex items-center justify-center gap-3 text-lg shadow-[8px_8px_0px_0px_rgba(45,55,72,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] transition-all"
          >
            <Home className="w-6 h-6" />
            Go Home
          </button>
      </div>

    </div>
  );
}
