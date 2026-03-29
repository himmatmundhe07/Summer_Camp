import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../shared/PrimaryButton';
import { Rocket, Sparkles, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';

export default function StepThree({ data, siblings = [], isWaitlisted, onBack, onAddSibling }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalizeBooking = async (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const rect = e ? e.currentTarget.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 };
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    toast.loading(isWaitlisted ? "Adding to waitlist..." : "Booking your slots...", {
      id: "payment",
    });

    try {
      const allCampers = [...siblings, data];
      const inserts = allCampers.map((camper, idx) => ({
        booking_id: `CAMP2026-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).toUpperCase()}${idx}`,
        student_name: camper.name,
        gender: camper.gender,
        dob: camper.dob,
        age: camper.age,
        class_name: camper.class,
        parent_mobile: camper.mobile || data.mobile,
        emergency_contact: camper.emergencyContact || data.emergencyContact,
        address: camper.address || data.address,
        camp_type: camper.campType,
        amount: getCampPrice(camper.campType),
        payment_method: isWaitlisted ? 'Waitlist' : 'Cash',
        status: isWaitlisted ? 'Waitlisted' : 'Pending',
        agreed_terms: true
      }));

      const { error } = await supabase.from('registrations').insert(inserts);

      if (error) throw error;

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5E7E', '#00D09C', '#FFC000', '#B066FF'],
        disableForReducedMotion: true,
        zIndex: 150,
      });

      toast.success(isWaitlisted ? "Added to Waitlist!" : "Booked! Please pay cash at school.", {
        id: "payment",
      });
      localStorage.removeItem('camp_form');
      localStorage.removeItem('camp_sibs');
      navigate('/confirmation', { replace: true, state: { registrationData: { ...data, paymentMethod: isWaitlisted ? 'Waitlist' : 'Cash', booking_id: inserts[0].booking_id }, siblings, isWaitlisted } });

    } catch (error) {
      console.error("DB Insert Error:", error);
      setIsSubmitting(false);
      toast.error(error?.message || "There was a database glitch. Is your Supabase table configured correctly?", { id: "payment", duration: 5000 });
    }
  };

  const getCampName = (id) => {
    const map = {
      class: "Daily 3 Hours",
      daycare: "Day Care",
      hostel: "Hostel"
    };
    return map[id] || id;
  };

  const getCampPrice = (id) => {
    const map = {
      class: 500,
      daycare: 2500,
      hostel: 7000
    };
    return map[id] || 500;
  };

  return (
    <div className="w-full flex-shrink-0 px-4 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto bg-white rounded-3xl border-2 border-[var(--color-text-main)] shadow-solid mb-12 flex flex-col min-h-[calc(100svh-150px)] overflow-hidden relative">
      
      <div className="text-center bg-[#FF9EC0] -mx-4 sm:-mx-6 -mt-6 sm:-mt-8 mb-6 p-6 border-b-2 border-dashed border-[var(--color-text-main)] relative">
        <div className="absolute top-2 right-2 text-[var(--color-primary)] opacity-50 transform rotate-12">
          <Rocket className="w-16 h-16" />
        </div>
        <div className="absolute -bottom-2 left-2 text-[var(--color-accent)] opacity-40 transform -rotate-12">
          <Sparkles className="w-20 h-20" />
        </div>
        <h2 className="font-nunito font-black text-3xl text-[var(--color-text-main)] mb-1 relative z-10 flex items-center justify-center gap-2">
          Almost Done! <Rocket className="w-8 h-8 text-[var(--color-blue)]" />
        </h2>
        <p className="font-quicksand font-bold text-[var(--color-text-main)]/80 text-sm relative z-10">Check your details before takeoff.</p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {[...siblings, data].map((camper, idx) => (
          <div key={idx} className="w-full bg-[#FAFAFA] border-2 border-dashed border-gray-300 rounded-2xl p-4 sm:p-5 relative overflow-hidden group">
            <h3 className="font-nunito font-black text-lg pb-1 mb-1 flex justify-between tracking-tight text-[var(--color-text-main)]">
              <span className="truncate pr-4 max-w-[200px]" title={camper.name || "Explorer"}>{camper.name || "Explorer"}</span>
              <Ticket className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
            </h3>
            <div className="font-quicksand font-bold text-xs uppercase text-gray-500 mb-1">{camper.gender} • {camper.age} yrs • Cls {camper.class}</div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-gray-200 border-dashed">
              <span className="font-nunito font-black text-[var(--color-text-main)] text-sm">{getCampName(camper.campType)}</span>
              <span className="font-nunito font-black text-[var(--color-primary)] bg-white px-2 py-1 rounded border-2 border-[var(--color-text-main)]">₹{getCampPrice(camper.campType)}</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onAddSibling}
        className="w-full h-12 mb-6 rounded-xl font-nunito font-black text-[var(--color-text-main)] border-2 border-[var(--color-text-main)] bg-white hover:bg-[#FFE285] hover:-translate-y-1 flex items-center justify-center gap-2 shadow-solid transition-all"
      >
        + Add Another Sibling
      </button>

      <div className="mb-6 flex justify-between items-center bg-[#F8FAFC] border-2 border-[var(--color-text-main)] p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(45,55,72,1)]">
        <span className="font-nunito font-black text-[var(--color-text-muted)] text-base uppercase">Grand Total</span>
        <span className="font-nunito font-black text-3xl text-[var(--color-text-main)]">₹{[...siblings, data].reduce((s, c) => s + getCampPrice(c.campType), 0)}</span>
      </div>

      <div className="mt-auto">
        {isWaitlisted && (
          <div className="mb-4 text-center p-3 bg-red-50 border-2 border-red-500 rounded-xl">
             <p className="font-quicksand font-bold text-red-600 text-sm">🚨 Camp is at 100% capacity!</p>
             <p className="font-quicksand font-bold text-red-500 text-xs mt-1">You will be added to the free waitlist.</p>
          </div>
        )}

        <button 
          onClick={finalizeBooking}
          disabled={isSubmitting}
          className={`w-full h-14 rounded-xl font-nunito font-black text-xl border-2 border-[var(--color-text-main)] text-[var(--color-text-main)] transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] ${isSubmitting ? 'bg-gray-200 cursor-not-allowed opacity-60' : 'bg-[#FFE285] hover:bg-[#FFD033] active:scale-95'}`}
        >
          {isSubmitting ? "Booking..." : isWaitlisted ? "Join Waitlist Free" : "Pay Cash at School"}
        </button>
        <button 
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full mt-6 h-12 font-quicksand font-bold text-base text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)] active:scale-95 transition-all rounded-xl hover:bg-gray-100"
        >
          ← Wait, I need to change something
        </button>
      </div>

    </div>
  );
}
