"use client";

import React, { useEffect, useState } from "react";

function EmiCalculator({ price = 1000 }) {
  const [loanAmount, setLoanAmount] = useState(price);
  const [downPayment, setDownPayment] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTenure, setLoanTenure] = useState(1);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleLoanAmountChange = (value) => {
    const newLoanAmount = Math.min(Math.max(value, 1000), 150000);
    setLoanAmount(newLoanAmount);
    const newDownPayment = (downPaymentPercent / 100) * newLoanAmount;
    setDownPayment(newDownPayment);
    calculateLoan(newLoanAmount, newDownPayment, interestRate, loanTenure);
  };

  const handleDownPaymentChange = (value) => {
    const newDownPayment = Math.min(Math.max(value, 0), loanAmount);
    setDownPayment(newDownPayment);
    setDownPaymentPercent((newDownPayment / loanAmount) * 100);
    calculateLoan(loanAmount, newDownPayment, interestRate, loanTenure);
  };

  const handleDownPaymentPercentChange = (percent) => {
    const newPercent = Math.min(Math.max(percent, 0), 100);
    setDownPaymentPercent(newPercent);
    const newDownPayment = (newPercent / 100) * loanAmount;
    setDownPayment(newDownPayment);
    calculateLoan(loanAmount, newDownPayment, interestRate, loanTenure);
  };

  const handleInterestRateChange = (value) => {
    const newRate = Math.min(Math.max(value, 0.1), 25);
    setInterestRate(newRate);
    calculateLoan(loanAmount, downPayment, newRate, loanTenure);
  };

  const handleLoanTenureChange = (value) => {
    const newTenure = Math.min(Math.max(value, 1), 8);
    setLoanTenure(newTenure);
    calculateLoan(loanAmount, downPayment, interestRate, newTenure);
  };

  const calculateLoan = (principal, down, rate, years) => {
    const loanPrincipal = principal - down;
    if (loanPrincipal <= 0) {
      setResults(null);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const emi =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanPrincipal;

    setResults({
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      loanPrincipal: loanPrincipal.toFixed(2),
      downPayment: down.toFixed(2),
    });
  };

  useEffect(() => {
    calculateLoan(loanAmount, downPayment, interestRate, loanTenure);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto pr-1 bg-white">
      <div className="w-full">
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
            <h2 className="text-lg font-inter font-semibold text-black mb-3">
              Vehicle Price
            </h2>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-black">$</span>
                </div>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) =>
                    handleLoanAmountChange(parseFloat(e.target.value))
                  }
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="150000"
                value={loanAmount}
                onChange={(e) =>
                  handleLoanAmountChange(parseFloat(e.target.value))
                }
                className="w-full accent-blue-500"
              />
            </div>
          </div>

          <div c    lassName="bg-white rounded-xl p-4">
            <h2 className="text-lg font-inter font-semibold text-black mb-3">
              Down Payment
            </h2>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-black">$</span>
                </div>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) =>
                    handleDownPaymentChange(parseFloat(e.target.value))
                  }
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>
              <input
                type="range"
                min="0"
                max={loanAmount}
                value={downPayment}
                onChange={(e) =>
                  handleDownPaymentChange(parseFloat(e.target.value))
                }
                className="w-full accent-blue-500"
              />
              <div className="text-sm text-black">
                Down payment: {downPaymentPercent.toFixed(1)}% of vehicle price
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-lg font-inter font-semibold text-black mb-3">
                Interest Rate
              </h2>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) =>
                      handleInterestRateChange(parseFloat(e.target.value))
                    }
                    className="w-full pr-8 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-black">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) =>
                    handleInterestRateChange(parseFloat(e.target.value))
                  }
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h2 className="text-lg font-inter font-semibold text-black mb-3">
                Loan Term
              </h2>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) =>
                      handleLoanTenureChange(parseFloat(e.target.value))
                    }
                    className="w-full pr-12 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-black">
                      Years
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={loanTenure}
                  onChange={(e) =>
                    handleLoanTenureChange(parseFloat(e.target.value))
                  }
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-3 border-2 border-red-500 bg-white p-3 rounded-md">
              {error}
            </div>
          )}

          {results && (
            <div className="bg-white rounded-xl p-4 mt-4">
              <div className="text-center mb-4 pb-4 border-b border-gray-300">
                <div className="text-sm font-inter text-black">
                  Monthly Payment
                </div>
                <div className="text-3xl font-bold text-black mt-1">
                  ${formatNumber(results.emi)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-inter text-black">
                    Vehicle Price
                  </div>
                  <div className="text-lg font-bold text-black mt-1">
                    ${formatNumber(loanAmount)}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-inter text-black">
                    Down Payment
                  </div>
                  <div className="text-lg font-bold text-black mt-1">
                    ${formatNumber(results.downPayment)}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-inter text-black">
                    Loan Amount
                  </div>
                  <div className="text-lg font-bold text-black mt-1">
                    ${formatNumber(results.loanPrincipal)}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-inter text-black">
                    Total Interest
                  </div>
                  <div className="text-lg font-bold text-black mt-1">
                    ${formatNumber(results.totalInterest)}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg md:col-span-2">
                  <div className="text-sm font-inter text-black">
                    Total Amount (Down Payment + Total Payments)
                  </div>
                  <div className="text-lg font-bold text-black mt-1">
                    $
                    {formatNumber(
                      parseFloat(results.downPayment) +
                        parseFloat(results.totalPayment)
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-black text-center font-inter">
            This is an estimate. Actual EMI may vary based on your credit score
            and lender terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;