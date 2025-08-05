"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Target, Calendar, DollarSign } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function CustomGoalCalculator() {
  const [inputs, setInputs] = useState({
    goalName: "",
    goalDescription: "",
    goalCost: "",
    achieveInYears: "",
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

  const calculateCustomGoal = () => {
    const goalCost = Number.parseFloat(inputs.goalCost)
    const achieveInYears = Number.parseFloat(inputs.achieveInYears)
    const currentSavings = Number.parseFloat(inputs.currentSavings) || 0
    const annualReturn = Number.parseFloat(inputs.annualReturn) / 100

    if (!goalCost || !achieveInYears || !annualReturn || !inputs.goalName) {
      alert("Please fill in all required fields")
      return
    }

    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + annualReturn, achieveInYears)

    // Remaining amount needed
    const remainingAmount = goalCost - futureValueCurrentSavings

    // Monthly investment required
    const monthlyReturn = annualReturn / 12
    const totalMonths = achieveInYears * 12

    let monthlyInvestment = 0
    if (remainingAmount > 0) {
      monthlyInvestment =
        remainingAmount / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))
    }

    const totalInvestment = monthlyInvestment * totalMonths
    const totalContribution = totalInvestment + currentSavings

    setResults({
      goalCost,
      futureValueCurrentSavings,
      remainingAmount: Math.max(0, remainingAmount),
      monthlyInvestment: Math.max(0, monthlyInvestment),
      totalInvestment,
      totalContribution,
      achieveInYears,
      goalName: inputs.goalName,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Settings className="w-10 h-10 text-gray-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Custom Goal Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Create and plan for your personalized financial goals</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-gray-600" />
              Define Your Goal
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="goalName">Goal Name *</Label>
                <Input
                  id="goalName"
                  type="text"
                  value={inputs.goalName}
                  onChange={(e) => handleInputChange("goalName", e.target.value)}
                  placeholder="e.g., Buy a Motorcycle, Study Abroad, etc."
                />
              </div>

              <div>
                <Label htmlFor="goalDescription">Goal Description (Optional)</Label>
                <Textarea
                  id="goalDescription"
                  value={inputs.goalDescription}
                  onChange={(e) => handleInputChange("goalDescription", e.target.value)}
                  placeholder="Describe your goal in detail..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="goalCost">Goal Cost (₹) *</Label>
                <Input
                  id="goalCost"
                  type="number"
                  value={inputs.goalCost}
                  onChange={(e) => handleInputChange("goalCost", e.target.value)}
                  placeholder="e.g., 200000"
                />
              </div>

              <div>
                <Label htmlFor="achieveInYears">Achieve Goal In (Years) *</Label>
                <Input
                  id="achieveInYears"
                  type="number"
                  value={inputs.achieveInYears}
                  onChange={(e) => handleInputChange("achieveInYears", e.target.value)}
                  placeholder="e.g., 3"
                />
              </div>

              <div>
                <Label htmlFor="currentSavings">Current Savings for This Goal (₹)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={inputs.currentSavings}
                  onChange={(e) => handleInputChange("currentSavings", e.target.value)}
                  placeholder="e.g., 50000"
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
                  placeholder="e.g., 10"
                />
              </div>

              <Button onClick={calculateCustomGoal} className="w-full" size="lg">
                Calculate Goal Plan
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-gray-600" />
                {results ? `${results.goalName} Plan` : "Your Goal Plan"}
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Goal Cost</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.goalCost)}</p>
                    <p className="text-sm text-blue-600 mt-1">Total amount needed</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Investment Required</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.monthlyInvestment)}</p>
                    <p className="text-sm text-green-600 mt-1">To achieve your goal</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Time to Goal</h3>
                    <p className="text-3xl font-bold text-purple-900">{results.achieveInYears} Years</p>
                    <p className="text-sm text-purple-600 mt-1">Timeline to achieve goal</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Future Value of Current Savings</h3>
                    <p className="text-3xl font-bold text-orange-900">
                      {formatCurrency(results.futureValueCurrentSavings)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">Growth of existing savings</p>
                  </div>

                  {results.remainingAmount > 0 && (
                    <div className="md:col-span-2">
                      <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Additional Amount Needed</h3>
                        <p className="text-2xl font-bold text-yellow-900">{formatCurrency(results.remainingAmount)}</p>
                        <p className="text-sm text-yellow-600 mt-1">Amount to be invested over time</p>
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Monthly Investment:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.monthlyInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total New Investment:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.totalInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Contribution:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.totalContribution)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Define your custom goal to see the investment plan</p>
                </div>
              )}
            </div>

            {/* Information Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Tips for Custom Goal Planning</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Be Specific:</h4>
                  <p>
                    Define clear, measurable goals with specific amounts and timelines. This helps in creating a focused
                    investment strategy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Consider Inflation:</h4>
                  <p>
                    Factor in inflation when setting goal amounts, especially for long-term goals. What costs ₹1 lakh
                    today might cost more in the future.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Regular Review:</h4>
                  <p>
                    Review and adjust your goals periodically based on changing circumstances, income levels, and market
                    conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Prioritize Goals:</h4>
                  <p>
                    If you have multiple goals, prioritize them based on importance and timeline. Focus on emergency
                    fund and retirement first.
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
