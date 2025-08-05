"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, Shield, Calendar, DollarSign } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function EmergencyFundCalculator() {
  const [inputs, setInputs] = useState({
    monthlyExpenses: "",
    durationMonths: "",
    timeToBuiltYears: "",
    annualReturn: "",
  })
  const [results, setResults] = useState(null)

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateEmergencyFund = () => {
    const monthlyExpenses = Number.parseFloat(inputs.monthlyExpenses)
    const durationMonths = Number.parseFloat(inputs.durationMonths)
    const timeToBuiltYears = Number.parseFloat(inputs.timeToBuiltYears)
    const annualReturn = Number.parseFloat(inputs.annualReturn) / 100

    if (!monthlyExpenses || !durationMonths || !timeToBuiltYears || !annualReturn) {
      alert("Please fill in all fields")
      return
    }

    const totalEmergencyFund = monthlyExpenses * durationMonths
    const monthlyReturn = annualReturn / 12
    const totalMonths = timeToBuiltYears * 12

    // Monthly investment required (PMT calculation)
    const monthlyInvestment =
      totalEmergencyFund / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))

    const totalInvestment = monthlyInvestment * totalMonths
    const interestEarned = totalEmergencyFund - totalInvestment

    setResults({
      totalEmergencyFund,
      monthlyInvestment,
      totalInvestment,
      interestEarned,
      durationMonths,
      timeToBuiltYears,
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-10 h-10 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Emergency Fund Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Build your financial safety net for unexpected expenses</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-red-600" />
              Emergency Fund Details
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={inputs.monthlyExpenses}
                  onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                  placeholder="e.g., 40000"
                />
              </div>

              <div>
                <Label htmlFor="durationMonths">Duration Fund Should Cover (Months)</Label>
                <Input
                  id="durationMonths"
                  type="number"
                  value={inputs.durationMonths}
                  onChange={(e) => handleInputChange("durationMonths", e.target.value)}
                  placeholder="e.g., 6"
                />
                <p className="text-sm text-gray-500 mt-1">Recommended: 6-12 months</p>
              </div>

              <div>
                <Label htmlFor="timeToBuiltYears">Time to Build Fund (Years)</Label>
                <Input
                  id="timeToBuiltYears"
                  type="number"
                  value={inputs.timeToBuiltYears}
                  onChange={(e) => handleInputChange("timeToBuiltYears", e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>

              <div>
                <Label htmlFor="annualReturn">Annual Return on Investment (%)</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange("annualReturn", e.target.value)}
                  placeholder="e.g., 6"
                />
                <p className="text-sm text-gray-500 mt-1">Conservative return for emergency funds</p>
              </div>

              <Button onClick={calculateEmergencyFund} className="w-full" size="lg">
                Calculate Emergency Fund Plan
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-red-600" />
                Emergency Fund Plan
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Total Emergency Fund Required</h3>
                    <p className="text-3xl font-bold text-red-900">{formatCurrency(results.totalEmergencyFund)}</p>
                    <p className="text-sm text-red-600 mt-1">{results.durationMonths} months of expenses coverage</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Investment Required</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.monthlyInvestment)}</p>
                    <p className="text-sm text-green-600 mt-1">To build fund in {results.timeToBuiltYears} years</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Investment</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.totalInvestment)}</p>
                    <p className="text-sm text-blue-600 mt-1">Your total contributions</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Interest Earned</h3>
                    <p className="text-3xl font-bold text-purple-900">{formatCurrency(results.interestEarned)}</p>
                    <p className="text-sm text-purple-600 mt-1">Growth from investments</p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Fund Guidelines</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white p-3 rounded">
                          <h4 className="font-semibold text-green-800">Conservative (3-6 months)</h4>
                          <p className="text-gray-600">Stable job, dual income</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h4 className="font-semibold text-yellow-800">Moderate (6-9 months)</h4>
                          <p className="text-gray-600">Single income, variable income</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <h4 className="font-semibold text-red-800">Aggressive (9-12 months)</h4>
                          <p className="text-gray-600">Unstable job, business owner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your details to calculate your emergency fund requirements
                  </p>
                </div>
              )}
            </div>

            {/* Information Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Emergency Fund is Important</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Financial Security:</h4>
                  <p>
                    An emergency fund provides a financial cushion for unexpected expenses like medical bills, job loss,
                    or major repairs without derailing your long-term financial goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Investment Options:</h4>
                  <p>
                    Keep emergency funds in liquid, low-risk investments like savings accounts, liquid funds, or
                    short-term FDs for easy access when needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
