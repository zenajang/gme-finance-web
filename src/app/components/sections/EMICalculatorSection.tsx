'use client';

import React, { useState, useEffect } from 'react';

interface EMICalculatorSectionProps {
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  titleColor?: string;
}

export default function EMICalculatorSection({
  buttonBgColor = '#DC2626',
  buttonHoverBgColor = '#B91C1C',
  titleColor = '#1F2937'
}: EMICalculatorSectionProps) {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateEMI = () => {
    // Input validation
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const months = parseInt(term);

    if (isNaN(principal) || isNaN(rate) || isNaN(months)) {
      setMonthlyPayment('Please enter valid numbers');
      return;
    }

    if (principal <= 0 || rate < 0 || months <= 0) {
      setMonthlyPayment('Please enter positive values');
      return;
    }

    setIsCalculating(true);

    // EMI Calculation Formula
    // EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    // where P = Principal, r = monthly interest rate, n = number of months
    
    setTimeout(() => {
      const monthlyRate = rate / 12 / 100;
      
      if (rate === 0) {
        // If interest rate is 0, simply divide principal by months
        const emi = principal / months;
        setMonthlyPayment(emi.toFixed(2));
      } else {
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) 
                    / (Math.pow(1 + monthlyRate, months) - 1);
        setMonthlyPayment(emi.toFixed(2));
      }
      
      setIsCalculating(false);
    }, 300); // Small delay for better UX
  };

  // Auto-calculate when all fields are filled
  useEffect(() => {
    if (loanAmount && interestRate && term) {
      const timer = setTimeout(() => {
        calculateEMI();
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, interestRate, term]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <section className="px-4 md:px-8 lg:px-90 min-h-screen flex items-center justify-center">
      <div className="relative z-10 w-full mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12" style={{ color: titleColor }}>
          EMI Calculator
        </h2>
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-10 relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-4">
              <label htmlFor="loanAmount" className="text-lg font-medium text-gray-700 w-60 flex-shrink-0">
                Loan Amount
              </label>
              <input
                id="loanAmount"
                type="text"
                value={loanAmount}
                onChange={(e) => handleInputChange(e, setLoanAmount)}
                placeholder="Enter loan amount"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="interestRate" className="text-lg font-medium text-gray-700 w-60 flex-shrink-0">
                Interest Rates (%)
              </label>
              <input
                id="interestRate"
                type="text"
                value={interestRate}
                onChange={(e) => handleInputChange(e, setInterestRate)}
                placeholder="Enter annual interest rate"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="term" className="text-lg font-medium text-gray-700 w-60 flex-shrink-0">
                Term (Months)
              </label>
              <input
                id="term"
                type="text"
                value={term}
                onChange={(e) => handleInputChange(e, setTerm)}
                placeholder="Enter loan term in months"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-800"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-60 flex-shrink-0"></div>
              <button
                onClick={calculateEMI}
                disabled={!loanAmount || !interestRate || !term || isCalculating}
                className="px-12 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                style={{ backgroundColor: buttonBgColor }}
                onMouseEnter={(e) => {
                  if (!isCalculating && loanAmount && interestRate && term) {
                    e.currentTarget.style.backgroundColor = buttonHoverBgColor;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = buttonBgColor;
                }}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  'Calculate'
                )}
              </button>
            </div>

            {/* Monthly Payment Result */}
            <div className="flex items-center gap-4 pt-2">
              <label htmlFor="monthlyPayment" className="text-lg font-medium text-gray-700 w-60 flex-shrink-0">
                Monthly Payment (EMI)
              </label>
              <div className="relative flex-1">
                <input
                  id="monthlyPayment"
                  type="text"
                  value={monthlyPayment}
                  readOnly
                  placeholder="Your EMI will appear here"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg transition-all duration-300 text-gray-800 font-semibold ${
                    monthlyPayment && !monthlyPayment.includes('Please') 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}