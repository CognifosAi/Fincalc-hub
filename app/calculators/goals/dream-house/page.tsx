"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, TrendingUp, DollarSign } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function DreamHouseCalculator() {
  const [inputs, setInputs] = useState({
    houseCost: "",
    downPaymentPercent: "",
    yearsUntilPurchase: "",
    currentSavings: "",
    annualReturn: "",
  })
  const [results, setResults] = useState(null)

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateDreamHouse = () => {
    const houseCost = Number.parseFloat(inputs.houseCost)
    const downPaymentPercent = Number.parseFloat(inputs.downPaymentPercent)
    const yearsUntilPurchase = Number.parseFloat(inputs.yearsUntilPurchase)
    const currentSavings = Number.parseFloat(inputs.currentSavings) || 0
    const annualReturn = Number.parseFloat(inputs.annualReturn) / 100

    if (!houseCost || !downPaymentPercent || !yearsUntilPurchase || !annualReturn) {
      alert("Please fill in all required fields")
      return
    }

    const downPaymentAmount = (houseCost * downPaymentPercent) / 100
    const loanAmount = houseCost - downPaymentAmount

    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsUntilPurchase)

    // Remaining amount needed for down payment
    const remainingAmount = downPaymentAmount - futureValueCurrentSavings

    // Monthly investment required
    const monthlyReturn = annualReturn / 12
    const totalMonths = yearsUntilPurchase * 12

    let monthlyInvestment = 0
    if (remainingAmount > 0) {
      monthlyInvestment =
        remainingAmount / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))
    }

    const totalInvestment = monthlyInvestment * totalMonths
    const totalContribution = totalInvestment + currentSavings

    // EMI calculation for remaining loan (assuming 20 years, 8.5% interest)
    const loanTenureYears = 20
    const loanInterestRate = 8.5 / 100 / 12
    const loanMonths = loanTenureYears * 12
    const emi =
      (loanAmount * loanInterestRate * Math.pow(1 + loanInterestRate, loanMonths)) /
      (Math.pow(1 + loanInterestRate, loanMonths) - 1)

    setResults({
      houseCost,
      downPaymentAmount,
      loanAmount,
      futureValueCurrentSavings,
      remainingAmount: Math.max(0, remainingAmount),
      monthlyInvestment: Math.max(0, monthlyInvestment),
      totalInvestment,
      totalContribution,
      yearsUntilPurchase,
      emi,
      downPaymentPercent,
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Home className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Buy Dream House Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Plan and save for your dream home down payment</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Home className="w-6 h-6 mr-2 text-blue-600" />
              House Purchase Details
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="houseCost">Cost of Dream House (₹) *</Label>
                <Input
                  id="houseCost"
                  type="number"
                  value={inputs.houseCost}
                  onChange={(e) => handleInputChange("houseCost", e.target.value)}
                  placeholder="e.g., 5000000"
                />
              </div>

              <div>
                <Label htmlFor="downPaymentPercent">Down Payment Required (%) *</Label>
                <Input
                  id="downPaymentPercent"
                  type="number"
                  value={inputs.downPaymentPercent}
                  onChange={(e) => handleInputChange("downPaymentPercent", e.target.value)}
                  placeholder="e.g., 20"
                />
                <p className="text-sm text-gray-500 mt-1">Typically 10-30% of house cost</p>
              </div>

              <div>
                <Label htmlFor="yearsUntilPurchase">Years Until Purchase *</Label>
                <Input
                  id="yearsUntilPurchase"
                  type="number"
                  value={inputs.yearsUntilPurchase}
                  onChange={(e) => handleInputChange("yearsUntilPurchase", e.target.value)}
                  placeholder="e.g., 5"
                />
              </div>

              <div>
                <Label htmlFor="currentSavings">Current Savings for House (₹)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={inputs.currentSavings}
                  onChange={(e) => handleInputChange("currentSavings", e.target.value)}
                  placeholder="e.g., 200000"
                />
              </div>

              <div>
                <Label htmlFor="annualReturn">Expected Annual Return (%) *</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange("annualReturn", e.target.value)}
                  placeholder="e.g., 12"
                />
              </div>

              <Button onClick={calculateDreamHouse} className="w-full" size="lg">
                Calculate House Purchase Plan
              </Button>
            </div>

            {/* House Purchase Tips */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-blue-600" />
                Home Buying Tips
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Down Payment Guidelines:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Minimum:</strong> 10-20% for most home loans
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Recommended:</strong> 20-30% to reduce EMI burden
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Higher down payment:</strong> Lower interest rates, reduced EMI
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Additional Costs to Consider:</h4>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-medium">Registration:</span> 1-3% of property value
                      </div>
                      <div>
                        <span className="font-medium">Stamp Duty:</span> 3-10% varies by state
                      </div>
                      <div>
                        <span className="font-medium">Legal Fees:</span> 0.5-1% of property value
                      </div>
                      <div>
                        <span className="font-medium">Home Insurance:</span> 0.1-0.5% annually
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Investment Strategy:</h4>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium text-green-700">Short-term (1-3 years):</span> Debt funds, FDs
                      </div>
                      <div>
                        <span className="font-medium text-blue-700">Medium-term (3-5 years):</span> Balanced funds,
                        hybrid funds
                      </div>
                      <div>
                        <span className="font-medium text-purple-700">Long-term (5+ years):</span> Equity funds, SIPs
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Important Considerations:</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Factor in property appreciation and inflation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Keep emergency fund separate from house fund</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Consider location, amenities, and future development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Get pre-approved for home loan to know eligibility</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                House Purchase Plan
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">House Cost</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.houseCost)}</p>
                    <p className="text-sm text-blue-600 mt-1">Total cost of your dream house</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Down Payment Required</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.downPaymentAmount)}</p>
                    <p className="text-sm text-green-600 mt-1">{results.downPaymentPercent}% of house cost</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Monthly Investment Required</h3>
                    <p className="text-3xl font-bold text-purple-900">{formatCurrency(results.monthlyInvestment)}</p>
                    <p className="text-sm text-purple-600 mt-1">To save for down payment</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Home Loan Amount</h3>
                    <p className="text-3xl font-bold text-orange-900">{formatCurrency(results.loanAmount)}</p>
                    <p className="text-sm text-orange-600 mt-1">Amount to be financed through loan</p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Estimated EMI</h3>
                    <p className="text-3xl font-bold text-red-900">{formatCurrency(results.emi)}</p>
                    <p className="text-sm text-red-600 mt-1">Monthly EMI for 20 years @ 8.5%</p>
                  </div>

                  <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                    <h3 className="text-lg font-semibold text-cyan-800 mb-2">Future Value of Current Savings</h3>
                    <p className="text-3xl font-bold text-cyan-900">
                      {formatCurrency(results.futureValueCurrentSavings)}
                    </p>
                    <p className="text-sm text-cyan-600 mt-1">Growth of existing savings</p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Time to Purchase:</p>
                          <p className="font-semibold text-gray-800">{results.yearsUntilPurchase} years</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Investment:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.totalInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Contribution:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.totalContribution)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Loan-to-Value:</p>
                          <p className="font-semibold text-gray-800">
                            {((results.loanAmount / results.houseCost) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Enter your house purchase details to see the investment plan</p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Home Buying Process</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Before You Buy:</h4>
                  <ul className="space-y-1">
                    <li>• Check credit score and improve if needed</li>
                    <li>• Get pre-approved for home loan</li>
                    <li>• Research locations and property prices</li>
                    <li>• Save for down payment and additional costs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tax Benefits:</h4>
                  <ul className="space-y-1">
                    <li>• Home loan principal: Up to ₹1.5L under 80C</li>
                    <li>• Home loan interest: Up to ₹2L under 24(b)</li>
                    <li>• First-time buyers: Additional ₹50K under 80EEA</li>
                    <li>• Registration fees: Deduction under 80C</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
