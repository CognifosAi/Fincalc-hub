"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PiggyBank, TrendingUp, Calendar, DollarSign } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function RetireEarlyCalculator() {
  const [inputs, setInputs] = useState({
    targetRetirementAge: "",
    currentAge: "",
    monthlyExpenses: "",
    currentSavings: "",
    expectedAnnualReturn: "",
  })
  const [results, setResults] = useState(null)

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateRetirement = () => {
    const targetAge = Number.parseFloat(inputs.targetRetirementAge)
    const currentAge = Number.parseFloat(inputs.currentAge)
    const monthlyExpenses = Number.parseFloat(inputs.monthlyExpenses)
    const currentSavings = Number.parseFloat(inputs.currentSavings)
    const annualReturn = Number.parseFloat(inputs.expectedAnnualReturn) / 100

    if (!targetAge || !currentAge || !monthlyExpenses || !annualReturn) {
      alert("Please fill in all required fields")
      return
    }

    const yearsToRetirement = targetAge - currentAge
    const annualExpenses = monthlyExpenses * 12

    // Using 4% withdrawal rule (25x annual expenses)
    const requiredCorpus = annualExpenses * 25

    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement)

    // Remaining amount needed
    const remainingAmount = requiredCorpus - futureValueCurrentSavings

    // Monthly investment required (PMT calculation)
    const monthlyReturn = annualReturn / 12
    const totalMonths = yearsToRetirement * 12

    let monthlyInvestmentRequired = 0
    if (remainingAmount > 0) {
      monthlyInvestmentRequired =
        remainingAmount / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))
    }

    setResults({
      yearsToRetirement,
      requiredCorpus,
      futureValueCurrentSavings,
      remainingAmount: Math.max(0, remainingAmount),
      monthlyInvestmentRequired: Math.max(0, monthlyInvestmentRequired),
      annualExpenses,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <PiggyBank className="w-10 h-10 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Retire Early Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Plan your path to financial independence and early retirement</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-green-600" />
              Retirement Details
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="targetRetirementAge">Target Retirement Age</Label>
                <Input
                  id="targetRetirementAge"
                  type="number"
                  value={inputs.targetRetirementAge}
                  onChange={(e) => handleInputChange("targetRetirementAge", e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div>
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  value={inputs.currentAge}
                  onChange={(e) => handleInputChange("currentAge", e.target.value)}
                  placeholder="e.g., 30"
                />
              </div>

              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses During Retirement (₹)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={inputs.monthlyExpenses}
                  onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                  placeholder="e.g., 50000"
                />
              </div>

              <div>
                <Label htmlFor="currentSavings">Current Savings (₹)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={inputs.currentSavings}
                  onChange={(e) => handleInputChange("currentSavings", e.target.value)}
                  placeholder="e.g., 500000"
                />
              </div>

              <div>
                <Label htmlFor="expectedAnnualReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedAnnualReturn"
                  type="number"
                  step="0.1"
                  value={inputs.expectedAnnualReturn}
                  onChange={(e) => handleInputChange("expectedAnnualReturn", e.target.value)}
                  placeholder="e.g., 12"
                />
              </div>

              <Button onClick={calculateRetirement} className="w-full" size="lg">
                Calculate Retirement Plan
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Retirement Plan Results
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Required Retirement Corpus</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.requiredCorpus)}</p>
                    <p className="text-sm text-blue-600 mt-1">Based on 4% withdrawal rule</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Investment Required</h3>
                    <p className="text-3xl font-bold text-green-900">
                      {formatCurrency(results.monthlyInvestmentRequired)}
                    </p>
                    <p className="text-sm text-green-600 mt-1">To reach your retirement goal</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Years to Retirement</h3>
                    <p className="text-3xl font-bold text-purple-900">{results.yearsToRetirement}</p>
                    <p className="text-sm text-purple-600 mt-1">Time available to build corpus</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Future Value of Current Savings</h3>
                    <p className="text-3xl font-bold text-orange-900">
                      {formatCurrency(results.futureValueCurrentSavings)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">Growth of existing savings</p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Annual Expenses:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.annualExpenses)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Remaining Amount Needed:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.remainingAmount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Corpus Multiple:</p>
                          <p className="font-semibold text-gray-800">25x Annual Expenses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your retirement details to calculate your early retirement plan
                  </p>
                </div>
              )}
            </div>

            {/* Information Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Retirement Strategy</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">4% Withdrawal Rule:</h4>
                  <p>
                    The 4% rule suggests you can safely withdraw 4% of your retirement corpus annually. This means you
                    need 25 times your annual expenses.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">FIRE Movement:</h4>
                  <p>
                    Financial Independence, Retire Early (FIRE) focuses on aggressive saving and investing to achieve
                    financial freedom much earlier than traditional retirement age.
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
