import { useState } from 'react';
import TextField from '../shared/TextField';
import SelectField from '../shared/SelectField';
import PrimaryButton from '../shared/PrimaryButton';
import { differenceInYears } from 'date-fns';
import { Pencil, Sparkles, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StepOne({ data, updateData, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!data.name || data.name.length < 3) newErrors.name = "Enter a valid name!";
    if (!data.gender) newErrors.gender = "Please select a gender!";
    if (!data.dob) {
      newErrors.dob = "When is the birthday?";
    } else if (new Date(data.dob) > new Date()) {
      newErrors.dob = "Birthday can't be in the future!";
    } else if (data.age !== undefined && (data.age < 3 || data.age > 12)) {
      newErrors.dob = "You must be 3-12 years old!";
    }
    if (!data.class) newErrors.class = "What class are you in?";
    if (!data.mobile || !/^\d{10}$/.test(data.mobile)) newErrors.mobile = "Check the 10-digit mobile number!";
    if (!data.emergencyContact || !/^\d{10}$/.test(data.emergencyContact)) {
       newErrors.emergencyContact = "Need a valid 10-digit emergency number!";
    } else if (data.mobile === data.emergencyContact) {
       newErrors.emergencyContact = "Wait, must be a DIFFERENT number!";
    }
    if (!data.address || data.address.trim().length < 5) newErrors.address = "Where do you live?";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    if (validate()) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { x, y },
        colors: ['#FF5E7E', '#00D09C', '#FFC000', '#B066FF'],
        disableForReducedMotion: true,
        zIndex: 150,
        ticks: 100,
        gravity: 0.8
      });
      onNext();
    }
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    updateData({ dob: dobValue });
    
    if (dobValue) {
      const dobDate = new Date(dobValue);
      if (dobDate > new Date()) {
        updateData({ age: null });
        setErrors(prev => ({...prev, dob: "Birthday can't be in the future!"}));
      } else {
        const ageNum = differenceInYears(new Date(), dobDate);
        updateData({ age: ageNum });
        if (ageNum < 3 || ageNum > 12) {
           setErrors(prev => ({...prev, dob: "Must be 3-12 years old!"}));
        } else {
           setErrors(prev => { const n = {...prev}; delete n.dob; return n; });
        }
      }
    }
  };

  const classesList = ["Nursery", "KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

  return (
    <div className="w-full flex-shrink-0 px-4 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto bg-white rounded-3xl border-2 border-[var(--color-text-main)] shadow-solid mb-6">
      
      <div className="text-center mb-6 bg-[#FFE285] -mt-6 -mx-6 mb-6 p-6 rounded-t-3xl border-b-2 border-dashed border-[var(--color-text-main)] relative overflow-hidden">
        {/* Playful background icons */}
        <div className="absolute -top-4 -right-4 text-[var(--color-accent)] opacity-40 transform rotate-12">
          <Sparkles className="w-20 h-20" />
        </div>
        <div className="absolute top-2 -left-2 text-[var(--color-primary)] opacity-40 transform -rotate-12">
          <Pencil className="w-16 h-16" />
        </div>

        <h2 className="font-nunito font-black text-3xl text-[var(--color-text-main)] mb-1 relative z-10 flex items-center justify-center gap-2">
          About You! <Smile className="w-8 h-8 text-[var(--color-primary)]" />
        </h2>
        <p className="font-quicksand font-bold text-[var(--color-text-main)]/80 text-sm relative z-10">Let's get to know the superstar.</p>
      </div>

      <TextField 
        label="Full Name" 
        value={data.name || ''} 
        onChange={(e) => updateData({ name: e.target.value })} 
        error={errors.name}
        placeholder="e.g. Rahul Sharma"
      />

      <div className="flex flex-col mb-5">
        <label className="font-nunito font-black text-sm text-[var(--color-text-main)] mb-2">
          Gender
        </label>
        <div className="flex w-full gap-2 lg:gap-3">
          {["Male", "Female", "Other"].map((g) => {
            const isSelected = data.gender === g;
            return (
              <button
                key={g}
                onClick={() => updateData({ gender: g })}
                className={`
                  flex-1 h-12 font-nunito font-black text-[15px] flex items-center justify-center transition-all rounded-xl border-2
                  ${isSelected ? 'bg-[var(--color-secondary)] text-[var(--color-text-main)] border-[var(--color-text-main)] shadow-[3px_3px_0px_0px_rgba(45,55,72,1)] -translate-y-1' : 'bg-[#FAFAFA] text-gray-500 border-gray-300 hover:border-[var(--color-text-main)]'}
                `}
              >
                {g}
              </button>
            )
          })}
        </div>
        {errors.gender && <p className="font-quicksand font-bold text-sm text-[var(--color-primary)] mt-1.5 ml-1">{errors.gender}</p>}
      </div>

      <TextField 
        label="Birthday" 
        type="date"
        value={data.dob || ''} 
        onChange={handleDobChange} 
        error={errors.dob}
      />

      {data.age !== undefined && data.age !== null && (
        <div className="mb-5 -mt-3">
          <p className={`font-nunito font-black text-sm inline-block px-3 py-1 rounded bg-[#F8FAFC] border-2 border-[var(--color-text-main)] shadow-sm ${data.age >= 3 && data.age <= 12 ? 'text-[var(--color-secondary-dark)]' : 'text-red-500'}`}>
            {data.age >= 3 && data.age <= 12 ? `Awesome, you are ${data.age} years old!` : 'Wait, age must be 3-12!'}
          </p>
        </div>
      )}

      <SelectField 
        label="Class"
        options={classesList}
        value={data.class || ''}
        onChange={(e) => updateData({ class: e.target.value })}
        error={errors.class}
      />

      <TextField 
        label="Parent's Mobile" 
        prefix="+91"
        inputMode="numeric"
        value={data.mobile || ''} 
        onChange={(e) => updateData({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })} 
        error={errors.mobile}
        placeholder="9876543210"
      />

      <TextField 
        label="Emergency Contact" 
        prefix="+91"
        inputMode="numeric"
        value={data.emergencyContact || ''} 
        onChange={(e) => updateData({ emergencyContact: e.target.value.replace(/\D/g, '').slice(0, 10) })} 
        error={errors.emergencyContact}
        placeholder="Alternative 10-digit number"
      />

      <TextField 
        label="Address" 
        multiline
        value={data.address || ''} 
        onChange={(e) => updateData({ address: e.target.value })} 
        error={errors.address}
        placeholder="Which magical street do you live on?"
      />

      <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
        <PrimaryButton onClick={handleNext} className="w-full">
          Next Step!
        </PrimaryButton>
      </div>

    </div>
  );
}
