"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, Percent, BarChart3, PiggyBank } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function LumpsumCalculator() {
  const [inputs, setInputs] = useState({
    lumpsumAmount: "",
    annualReturn: "",
    years: "",
    inflationRate: "",
  })
  const [results, setResults] = useState(null)

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateLumpsum = () => {
    const P = Number.parseFloat(inputs.lumpsumAmount)
    const r = Number.parseFloat(inputs.annualReturn) / 100 // Annual return rate
    const n = Number.parseFloat(inputs.years) // Total years
    const inflationRate = Number.parseFloat(inputs.inflationRate) / 100

    if (!P || !r || !n || isNaN(inflationRate)) {
      alert("Please fill in all fields with valid numbers")
      return
    }

    // Lumpsum Maturity Value Formula: P * (1 + r)^n
    const maturityValue = P * Math.pow(1 + r, n)

    // Total Investment (same as initial lumpsum)
    const totalInvestment = P

    // Gained Value
    const gainedValue = maturityValue - totalInvestment

    // Inflation Adjusted Value (Present Value)
    const inflationAdjustedValue = maturityValue / Math.pow(1 + inflationRate, n)

    // Future Value of Maturity considering inflation
    const futureValueWithInflation = maturityValue * Math.pow(1 + inflationRate, n)

    // Generate year-wise data for charts
    const yearWiseData = []
    for (let year = 1; year <= n; year++) {
      const yearMaturityValue = P * Math.pow(1 + r, year)
      const yearInflationAdjustedValue = yearMaturityValue / Math.pow(1 + inflationRate, year)

      yearWiseData.push({
        year: year,
        totalInvestment: P, // Remains constant for lumpsum
        maturityValue: Math.round(yearMaturityValue),
        inflationAdjustedValue: Math.round(yearInflationAdjustedValue),
        gains: Math.round(yearMaturityValue - P),
      })
    }

    setResults({
      totalInvestment: totalInvestment,
      maturityValue: maturityValue,
      gainedValue: gainedValue,
      inflationAdjustedValue: inflationAdjustedValue,
      futureValueWithInflation: futureValueWithInflation,
      yearWiseData: yearWiseData,
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(Math.round(num))
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
          <p className="font-medium text-gray-800 mb-2">{`Year ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-gray-600">{entry.name}:</span>
              </div>
              <span className="font-medium text-gray-800">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <PiggyBank className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Lumpsum Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Calculate your one-time investment returns with inflation adjustment</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-600" />
              Investment Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lumpsum Investment Amount (₹)</label>
                <input
                  type="number"
                  value={inputs.lumpsumAmount}
                  onChange={(e) => handleInputChange("lumpsumAmount", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="e.g., 100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange("annualReturn", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                <input
                  type="number"
                  value={inputs.years}
                  onChange={(e) => handleInputChange("years", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Inflation Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.inflationRate}
                  onChange={(e) => handleInputChange("inflationRate", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="e.g., 6"
                />
              </div>

              <button
                onClick={calculateLumpsum}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Calculate Lumpsum Returns
              </button>
            </div>

            {/* Lumpsum Information Card */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <PiggyBank className="w-5 h-5 mr-2 text-purple-600" />
                About Lumpsum Investment
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What is Lumpsum Investment?</h4>
                  <p>
                    A lumpsum investment involves investing a large amount of money at once, rather than spreading it
                    over time. This strategy can be highly effective when you have surplus funds and want to maximize
                    the power of compounding.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>
                        <strong>Maximum Compounding:</strong> Your entire amount starts earning returns immediately
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>
                        <strong>Market Timing:</strong> Ideal when markets are at lower levels
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>
                        <strong>Simplicity:</strong> One-time investment with no recurring transactions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>
                        <strong>Lower Costs:</strong> Reduced transaction costs compared to multiple SIPs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>
                        <strong>Immediate Exposure:</strong> Full market exposure from day one
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">When to Choose Lumpsum:</h4>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold mr-3">
                          ✓
                        </div>
                        <span>You have a large sum available (bonus, inheritance, maturity proceeds)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold mr-3">
                          ✓
                        </div>
                        <span>Markets are at attractive valuations or in correction phase</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold mr-3">
                          ✓
                        </div>
                        <span>You have a long investment horizon (5+ years)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold mr-3">
                          ✓
                        </div>
                        <span>You can tolerate short-term volatility for long-term gains</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lumpsum vs SIP:</h4>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <h5 className="font-semibold text-purple-800 mb-2">Lumpsum Advantages</h5>
                        <ul className="space-y-1">
                          <li>• Higher returns in rising markets</li>
                          <li>• Maximum compounding benefit</li>
                          <li>• Lower transaction costs</li>
                          <li>• Immediate full exposure</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-800 mb-2">SIP Advantages</h5>
                        <ul className="space-y-1">
                          <li>• Rupee cost averaging</li>
                          <li>• Disciplined investing</li>
                          <li>• Lower risk through averaging</li>
                          <li>• Suitable for regular income</li>
                        </ul>
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
                        <span>Higher risk due to market timing dependency</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Requires larger initial capital compared to SIP</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>May experience higher short-term volatility</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Consider diversifying across asset classes and time</span>
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
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Investment Results
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Investment</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.totalInvestment)}</p>
                    <p className="text-sm text-blue-600 mt-1">Your one-time investment amount</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Maturity Value</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.maturityValue)}</p>
                    <p className="text-sm text-green-600 mt-1">Total value after {inputs.years} years</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Wealth Gained</h3>
                    <p className="text-3xl font-bold text-purple-900">{formatCurrency(results.gainedValue)}</p>
                    <p className="text-sm text-purple-600 mt-1">Your total gains from investment</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Present Value (Inflation Adjusted)</h3>
                    <p className="text-3xl font-bold text-orange-900">
                      {formatCurrency(results.inflationAdjustedValue)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">Real purchasing power in today's money</p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Future Value (With Inflation)</h3>
                      <p className="text-3xl font-bold text-red-900">
                        {formatCurrency(results.futureValueWithInflation)}
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        What your maturity amount would be worth in future money terms
                      </p>
                    </div>
                  </div>

                  {/* Additional Insights */}
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Nominal Return:</p>
                          <p className="font-semibold text-gray-800">
                            {((results.maturityValue / results.totalInvestment - 1) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Real Return:</p>
                          <p className="font-semibold text-gray-800">
                            {((results.inflationAdjustedValue / results.totalInvestment - 1) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Growth Multiple:</p>
                          <p className="font-semibold text-green-600">
                            {(results.maturityValue / results.totalInvestment).toFixed(1)}x
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Purchasing Power Loss:</p>
                          <p className="font-semibold text-red-600">
                            {(
                              ((results.maturityValue - results.inflationAdjustedValue) / results.maturityValue) *
                              100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your investment details and click calculate to see your lumpsum projections
                  </p>
                </div>
              )}
            </div>

            {/* Charts Section */}
            {results && results.yearWiseData && (
              <div className="space-y-6">
                {/* Growth Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                      Investment Growth Over Time
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Track your lumpsum investment progress year by year</p>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.yearWiseData} margin={{ top: 50, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          interval={
                            results.yearWiseData.length > 15
                              ? Math.ceil(results.yearWiseData.length / 10)
                              : results.yearWiseData.length > 10
                                ? 1
                                : 0
                          }
                          label={{
                            value: "Investment Period (Years)",
                            position: "insideBottom",
                            offset: -40,
                            style: { textAnchor: "middle", fontSize: "12px", fill: "#6b7280" },
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }} />
                        <Legend
                          wrapperStyle={{ paddingTop: "20px" }}
                          iconType="line"
                          align="left"
                          verticalAlign="top"
                          layout="horizontal"
                          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalInvestment"
                          stroke="#8b5cf6"
                          strokeWidth={2.5}
                          name="Initial Investment"
                          dot={false}
                          activeDot={{ r: 4, fill: "#8b5cf6" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="maturityValue"
                          stroke="#059669"
                          strokeWidth={2.5}
                          name="Total Value"
                          dot={false}
                          activeDot={{ r: 4, fill: "#059669" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="inflationAdjustedValue"
                          stroke="#d97706"
                          strokeWidth={2.5}
                          strokeDasharray="5 5"
                          name="Real Value (Inflation Adjusted)"
                          dot={false}
                          activeDot={{ r: 4, fill: "#d97706" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Gains Breakdown */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                      Investment vs Returns Breakdown
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">See how your initial investment grows over time</p>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.yearWiseData} margin={{ top: 50, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          interval={
                            results.yearWiseData.length > 15
                              ? Math.ceil(results.yearWiseData.length / 10)
                              : results.yearWiseData.length > 10
                                ? 1
                                : 0
                          }
                          label={{
                            value: "Investment Period (Years)",
                            position: "insideBottom",
                            offset: -40,
                            style: { textAnchor: "middle", fontSize: "12px", fill: "#6b7280" },
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                        <Legend
                          wrapperStyle={{ paddingBottom: "10px" }}
                          align="left"
                          verticalAlign="top"
                          layout="horizontal"
                          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                        <Bar
                          dataKey="totalInvestment"
                          stackId="a"
                          fill="#8b5cf6"
                          name="Initial Investment"
                          radius={[0, 0, 0, 0]}
                        />
                        <Bar dataKey="gains" stackId="a" fill="#10b981" name="Investment Gains" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formula Information */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Lumpsum Formula:</h4>
              <p>Maturity Value = P × (1 + r)^n</p>
              <p className="mt-2">Where: P = Principal Amount, r = Annual Return Rate, n = Number of Years</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Inflation Calculations:</h4>
              <p>
                <strong>Present Value:</strong> Maturity Value / (1 + inflation rate)^years
              </p>
              <p>
                <strong>Future Value:</strong> Maturity Value × (1 + inflation rate)^years
              </p>
              <p className="mt-2">
                Present value shows today's purchasing power; Future value shows what you'd need in future money terms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
