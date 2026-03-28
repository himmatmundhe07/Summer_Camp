import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../shared/PrimaryButton';
import { Lock, Rocket, Sparkles, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';

export default function StepThree({ data, onBack }) {
  const navigate = useNavigate();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const finalizeBooking = async (method, e) => {
    const rect = e ? e.currentTarget.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 };
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    toast.loading(method === 'online' ? "Preparing your magical ticket..." : "Booking your magical slot...", {
      id: "payment",
    });

    try {
      const bId = `CAMP2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            booking_id: bId,
            student_name: data.name,
            gender: data.gender,
            dob: data.dob,
            age: data.age,
            class_name: data.class,
            parent_mobile: data.mobile,
            address: data.address,
            camp_type: data.campType,
            amount: 500,
            payment_method: method === 'online' ? 'Online' : 'Cash',
            status: method === 'online' ? 'Paid' : 'Pending',
            agreed_terms: true
          }
        ]);

      if (error) throw error;

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x, y },
        colors: ['#FF5E7E', '#00D09C', '#FFC000', '#B066FF'],
        disableForReducedMotion: true,
        zIndex: 150,
      });

      toast.success(method === 'online' ? "Yay! Payment successful!" : "Booked! Please pay cash at school.", {
        id: "payment",
      });
      navigate('/confirmation', { state: { registrationData: { ...data, paymentMethod: method, booking_id: bId } } });

    } catch (error) {
      console.error("DB Insert Error:", error);
      toast.error("Uh oh! There was a database glitch. Is your Supabase table configured correctly?", { id: "payment", duration: 5000 });
    }
  };

  const handlePayment = async (e, method = 'online') => {
    e.preventDefault();

    if (method === 'offline') {
       await finalizeBooking('offline', e);
       return;
    }

    // Load actual Razorpay for Online method!
    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay failed to load. Are you connected to the internet?");
      return;
    }

    // Replace this key with the user's actual Razorpay Test/Live Key!
    const keyToUse = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_TzY0aBweVbK3zV"; 

    const options = {
      key: keyToUse, 
      amount: 500 * 100, // 500 INR in paise
      currency: "INR",
      name: "Kalpana PreSchool",
      description: "Summer Camp 2026 Registration Fee",
      image: "/Logo.webp",
      handler: async function (response) {
        // Once payment succeeds, finalize the DB insertion
        toast.success(`Payment ID Captured: ${response.razorpay_payment_id}`);
        await finalizeBooking('online', e);
      },
      prefill: {
        name: data.name || "Adventurer Details",
        contact: data.mobile || "",
      },
      theme: {
        color: "#FF5E7E"
      }
    };

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on('payment.failed', function (response){
        toast.error(`Payment Failed: ${response.error.description}`);
    });

    paymentObject.open();
  };

  const getCampName = (id) => {
    const map = {
      class: "Class Only",
      daycare: "Day Care",
      hostel: "Hostel"
    };
    return map[id] || id;
  };

  const SummaryRow = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b-2 border-dashed border-gray-200 last:border-b-0">
      <span className="font-nunito font-black text-xs uppercase text-[var(--color-text-muted)] tracking-wider w-1/3 shrink-0">{label}</span>
      <span className="font-quicksand font-bold text-sm sm:text-[15px] text-[var(--color-text-main)] text-right break-words w-2/3">{value}</span>
    </div>
  );

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

      <div className="w-full bg-[#FAFAFA] border-2 border-[var(--color-text-main)] rounded-2xl p-4 sm:p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] transform -rotate-1">
        <h3 className="font-nunito font-black text-xl border-b-2 border-[var(--color-text-main)] pb-3 mb-2 flex justify-between tracking-tight text-[var(--color-text-main)]">
          <span>Your Ticket</span>
          <Ticket className="w-6 h-6 text-[var(--color-primary)] shrink-0" />
        </h3>
        <SummaryRow label="Explorer" value={data.name || "N/A"} />
        <SummaryRow label="Bio" value={`${data.gender || "N/A"} • ${data.age ? `${data.age} yrs` : "N/A"}`} />
        <SummaryRow label="Class" value={data.class || "N/A"} />
        <SummaryRow label="Contact" value={data.mobile ? `+91 ${data.mobile}` : "N/A"} />
        <SummaryRow label="Adventure" value={getCampName(data.campType)} />
        <SummaryRow label="Booking Fee" value="₹500" />
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-center gap-2 mb-6 bg-green-50 text-green-700 py-3 rounded-xl border-2 border-green-200">
          <Lock className="w-4 h-4" />
          <span className="font-quicksand font-bold text-xs sm:text-sm">Secure Payment via Razorpay</span>
        </div>

        <PrimaryButton onClick={(e) => handlePayment(e, 'online')} className="bg-[var(--color-secondary)] border-[var(--color-text-main)] shadow-solid mb-4">
          Pay ₹500 Securely
        </PrimaryButton>
        <button 
          onClick={(e) => handlePayment(e, 'offline')}
          className="w-full h-14 rounded-xl font-nunito font-black text-xl border-2 border-[var(--color-text-main)] bg-[#FFE285] text-[var(--color-text-main)] hover:bg-[#FFD033] transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-[4px_4px_0px_0px_rgba(45,55,72,1)]"
        >
          Pay Cash at School
        </button>
        <button 
          onClick={onBack}
          className="w-full mt-6 h-12 font-quicksand font-bold text-base text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)] active:scale-95 transition-all rounded-xl hover:bg-gray-100"
        >
          ← Wait, I need to change something
        </button>
      </div>

    </div>
  );
}
