"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, MapPin, Calendar, DollarSign } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function TravelGoalCalculator() {
  const [inputs, setInputs] = useState({
    destination: "",
    travelBudget: "",
    yearsUntilTrip: "",
    currentSavings: "",
    annualReturn: "",
    travelType: "",
    numberOfPeople: "",
  })
  const [results, setResults] = useState(null)

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateTravelGoal = () => {
    const travelBudget = Number.parseFloat(inputs.travelBudget)
    const yearsUntilTrip = Number.parseFloat(inputs.yearsUntilTrip)
    const currentSavings = Number.parseFloat(inputs.currentSavings) || 0
    const annualReturn = Number.parseFloat(inputs.annualReturn) / 100

    if (!travelBudget || !yearsUntilTrip || !annualReturn) {
      alert("Please fill in all required fields")
      return
    }

    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsUntilTrip)

    // Remaining amount needed
    const remainingAmount = travelBudget - futureValueCurrentSavings

    // Monthly investment required
    const monthlyReturn = annualReturn / 12
    const totalMonths = yearsUntilTrip * 12

    let monthlyInvestment = 0
    if (remainingAmount > 0) {
      monthlyInvestment =
        remainingAmount / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))
    }

    const totalInvestment = monthlyInvestment * totalMonths
    const totalContribution = totalInvestment + currentSavings

    // Calculate per person cost if multiple people
    const numberOfPeople = Number.parseFloat(inputs.numberOfPeople) || 1
    const costPerPerson = travelBudget / numberOfPeople

    setResults({
      travelBudget,
      futureValueCurrentSavings,
      remainingAmount: Math.max(0, remainingAmount),
      monthlyInvestment: Math.max(0, monthlyInvestment),
      totalInvestment,
      totalContribution,
      yearsUntilTrip,
      destination: inputs.destination,
      travelType: inputs.travelType,
      numberOfPeople,
      costPerPerson,
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const travelDestinations = [
    "Europe Tour",
    "Japan",
    "Thailand",
    "Dubai",
    "Singapore",
    "Maldives",
    "Switzerland",
    "USA",
    "Australia",
    "New Zealand",
    "Domestic (India)",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-10 h-10 text-cyan-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Travel Goal Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Plan and save for your dream vacation</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-cyan-600" />
              Travel Details
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select value={inputs.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {travelDestinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="travelType">Travel Type</Label>
                <Select value={inputs.travelType} onValueChange={(value) => handleInputChange("travelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget Travel</SelectItem>
                    <SelectItem value="mid-range">Mid-range</SelectItem>
                    <SelectItem value="luxury">Luxury Travel</SelectItem>
                    <SelectItem value="backpacking">Backpacking</SelectItem>
                    <SelectItem value="family">Family Vacation</SelectItem>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="numberOfPeople">Number of People</Label>
                <Input
                  id="numberOfPeople"
                  type="number"
                  value={inputs.numberOfPeople}
                  onChange={(e) => handleInputChange("numberOfPeople", e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>

              <div>
                <Label htmlFor="travelBudget">Total Travel Budget (₹) *</Label>
                <Input
                  id="travelBudget"
                  type="number"
                  value={inputs.travelBudget}
                  onChange={(e) => handleInputChange("travelBudget", e.target.value)}
                  placeholder="e.g., 300000"
                />
              </div>

              <div>
                <Label htmlFor="yearsUntilTrip">Years Until Trip *</Label>
                <Input
                  id="yearsUntilTrip"
                  type="number"
                  step="0.5"
                  value={inputs.yearsUntilTrip}
                  onChange={(e) => handleInputChange("yearsUntilTrip", e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>

              <div>
                <Label htmlFor="currentSavings">Current Savings for Travel (₹)</Label>
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
                  placeholder="e.g., 8"
                />
                <p className="text-sm text-gray-500 mt-1">Conservative return for short-term goals</p>
              </div>

              <Button onClick={calculateTravelGoal} className="w-full" size="lg">
                Calculate Travel Plan
              </Button>
            </div>

            {/* Travel Tips */}
            <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Plane className="w-5 h-5 mr-2 text-cyan-600" />
                Travel Planning Tips
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Budget Breakdown:</h4>
                  <div className="bg-white rounded-lg p-4 border border-cyan-100">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-medium">Flights:</span> 30-40% of budget
                      </div>
                      <div>
                        <span className="font-medium">Accommodation:</span> 25-35% of budget
                      </div>
                      <div>
                        <span className="font-medium">Food:</span> 15-25% of budget
                      </div>
                      <div>
                        <span className="font-medium">Activities:</span> 10-20% of budget
                      </div>
                      <div>
                        <span className="font-medium">Local Transport:</span> 5-10% of budget
                      </div>
                      <div>
                        <span className="font-medium">Miscellaneous:</span> 5-10% of budget
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Money-Saving Tips:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Book flights and hotels in advance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Travel during off-season for better deals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Use travel reward credit cards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Consider alternative accommodations</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Investment Strategy:</h4>
                  <div className="bg-white rounded-lg p-4 border border-cyan-100">
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium text-green-700">Short-term (6 months - 1 year):</span> Liquid
                        funds, savings account
                      </div>
                      <div>
                        <span className="font-medium text-blue-700">Medium-term (1-3 years):</span> Debt funds, FDs
                      </div>
                      <div>
                        <span className="font-medium text-purple-700">Long-term (3+ years):</span> Balanced funds,
                        conservative equity
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Don't Forget:</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Travel insurance and visa costs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Currency exchange rates and fees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Emergency fund for unexpected expenses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Factor in inflation for future trips</span>
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
                <Calendar className="w-6 h-6 mr-2 text-cyan-600" />
                {results ? `${results.destination || "Travel"} Plan` : "Travel Plan"}
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                    <h3 className="text-lg font-semibold text-cyan-800 mb-2">Total Travel Budget</h3>
                    <p className="text-3xl font-bold text-cyan-900">{formatCurrency(results.travelBudget)}</p>
                    <p className="text-sm text-cyan-600 mt-1">
                      {results.destination && `for ${results.destination}`}
                      {results.travelType && ` (${results.travelType})`}
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Investment Required</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.monthlyInvestment)}</p>
                    <p className="text-sm text-green-600 mt-1">To reach your travel goal</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Time to Travel</h3>
                    <p className="text-3xl font-bold text-purple-900">{results.yearsUntilTrip} Years</p>
                    <p className="text-sm text-purple-600 mt-1">Timeline to achieve goal</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Future Value of Current Savings</h3>
                    <p className="text-3xl font-bold text-orange-900">
                      {formatCurrency(results.futureValueCurrentSavings)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">Growth of existing savings</p>
                  </div>

                  {results.numberOfPeople > 1 && (
                    <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Cost Per Person</h3>
                      <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.costPerPerson)}</p>
                      <p className="text-sm text-blue-600 mt-1">For {results.numberOfPeople} people</p>
                    </div>
                  )}

                  {results.remainingAmount > 0 && (
                    <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Additional Amount Needed</h3>
                      <p className="text-2xl font-bold text-yellow-900">{formatCurrency(results.remainingAmount)}</p>
                      <p className="text-sm text-yellow-600 mt-1">Amount to be invested</p>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Travel Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Investment:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.totalInvestment)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Contribution:</p>
                          <p className="font-semibold text-gray-800">{formatCurrency(results.totalContribution)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Travel Type:</p>
                          <p className="font-semibold text-gray-800">{results.travelType || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Group Size:</p>
                          <p className="font-semibold text-gray-800">
                            {results.numberOfPeople} {results.numberOfPeople === 1 ? "person" : "people"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Enter your travel details to see the savings plan</p>
                </div>
              )}
            </div>

            {/* Popular Destinations Budget Guide */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations Budget Guide</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">International (Per Person, 7-10 days)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Thailand:</span>
                      <span className="font-medium">₹40,000 - ₹80,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dubai:</span>
                      <span className="font-medium">₹60,000 - ₹1,20,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Singapore:</span>
                      <span className="font-medium">₹70,000 - ₹1,40,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Europe:</span>
                      <span className="font-medium">₹1,50,000 - ₹3,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Japan:</span>
                      <span className="font-medium">₹1,20,000 - ₹2,50,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Domestic (Per Person, 5-7 days)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Goa:</span>
                      <span className="font-medium">₹15,000 - ₹35,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kerala:</span>
                      <span className="font-medium">₹20,000 - ₹45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rajasthan:</span>
                      <span className="font-medium">₹18,000 - ₹40,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Himachal:</span>
                      <span className="font-medium">₹12,000 - ₹30,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kashmir:</span>
                      <span className="font-medium">₹25,000 - ₹50,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
