'use client';

import { Button } from "@radix-ui/themes";
import { FormEvent } from "react";
import { COUNTRIES } from "@/constants/countries";
import { COMMON_COLORS } from "@/constants/colors";

type LoanApplicationFormProps = {
  subtitleColor?: string;
  buttonColor?: string;
}

export default function LoanApplicationForm({
  subtitleColor = COMMON_COLORS.primary,
  buttonColor = COMMON_COLORS.primary
}: LoanApplicationFormProps) {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      nationality: formData.get('nationality'),
    };

    console.log('Form submitted:', data);
    // TODO: 실제 제출 로직 추가
    alert(`Form submitted:\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}\nNationality: ${data.nationality}`);
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 relative z-10">
      <div className="container mx-auto px-4 md:px-30 lg:px-30 max-w-lg">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-15 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-black text-center mb-4 md:mb-5 lg:mb-5">Apply Loan from GME App</h2>
          <p className={`text-sm md:text-2xl lg:text-3xl text-center mb-3 md:mb-4 lg:mb-4`} style={{color:subtitleColor}}>Loan up to 30 Million KRW</p>
          <p className="text-center text-base text-[0.65rem] md:text-lg lg:text-lg text-gray-600 mx-auto">
            GME Finance makes it easy and convenient <br className="hidden md:block lg:block"/>to apply for a GME Loan. Apply now!
          </p>
          <form className="space-y-4 px-0 md:px-12 lg:px-15 pt-5 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10" onSubmit={handleSubmit}>
            <p className="text-subheading">Name
              <span className="font-bold text-red-600">*</span>
            </p>
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              required
              className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              required
              className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg"
            />
            <p className="text-subheading mt-1 md:mt-10 lg:mt-10">Nationality
              <span className="font-bold text-red-600">*</span>
            </p>
            <select
              name="nationality"
              required
              className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg text-gray-500"
            >
              <option value="">Nature of city*</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              className="py-3 rounded-lg font-mediums"
              style={{
                width:'100%',
                display: 'block',
                backgroundColor: buttonColor,
                fontSize: '1.25rem',
                height: '3.5rem'
              }}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
