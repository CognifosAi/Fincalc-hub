"use client"

import { useState } from "react"
import { Calculator, TrendingUp, DollarSign, Percent, BarChart3 } from "lucide-react"
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

export default function SIPCalculator() {
  const [inputs, setInputs] = useState({
    monthlyInvestment: "",
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

  const calculateSIP = () => {
    const P = Number.parseFloat(inputs.monthlyInvestment)
    const r = Number.parseFloat(inputs.annualReturn) / 100 / 12 // Monthly return rate
    const n = Number.parseFloat(inputs.years) * 12 // Total months
    const inflationRate = Number.parseFloat(inputs.inflationRate) / 100
    const years = Number.parseFloat(inputs.years)

    if (!P || !r || !n || isNaN(inflationRate)) {
      alert("Please fill in all fields with valid numbers")
      return
    }

    // SIP Maturity Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    const maturityValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r))

    // Total Investment
    const totalInvestment = P * n

    // Gained Value
    const gainedValue = maturityValue - totalInvestment

    // Inflation Adjusted Value (Present Value)
    const inflationAdjustedValue = maturityValue / Math.pow(1 + inflationRate, years)

    // Future Value of Maturity considering inflation
    const futureValueWithInflation = maturityValue * Math.pow(1 + inflationRate, years)

    // Generate year-wise data for charts
    const yearWiseData = []
    for (let year = 1; year <= years; year++) {
      const monthsCompleted = year * 12
      const yearMaturityValue = P * (((Math.pow(1 + r, monthsCompleted) - 1) / r) * (1 + r))
      const yearTotalInvestment = P * monthsCompleted
      const yearInflationAdjustedValue = yearMaturityValue / Math.pow(1 + inflationRate, year)

      yearWiseData.push({
        year: year,
        totalInvestment: Math.round(yearTotalInvestment),
        maturityValue: Math.round(yearMaturityValue),
        inflationAdjustedValue: Math.round(yearInflationAdjustedValue),
        gains: Math.round(yearMaturityValue - yearTotalInvestment),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-10 h-10 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">SIP Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Calculate your Systematic Investment Plan returns with inflation adjustment
          </p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Investment Amount (₹)</label>
                <input
                  type="number"
                  value={inputs.monthlyInvestment}
                  onChange={(e) => handleInputChange("monthlyInvestment", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange("annualReturn", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                <input
                  type="number"
                  value={inputs.years}
                  onChange={(e) => handleInputChange("years", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="e.g., 6"
                />
              </div>

              <button
                onClick={calculateSIP}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Calculate SIP Returns
              </button>
            </div>

            {/* SIP Information Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                About SIP (Systematic Investment Plan)
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What is SIP?</h4>
                  <p>
                    A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds.
                    It's a disciplined approach to investing that helps you build wealth over time through the power of
                    compounding.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Rupee Cost Averaging:</strong> Buy more units when prices are low, fewer when high
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Disciplined Investing:</strong> Automated investments build consistent saving habits
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Power of Compounding:</strong> Your returns generate their own returns over time
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Flexibility:</strong> Start with as little as ₹500 per month
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Tax Benefits:</strong> ELSS SIPs offer tax deductions under Section 80C
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How SIP Works:</h4>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                          1
                        </div>
                        <span>Choose a mutual fund scheme based on your risk appetite and goals</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                          2
                        </div>
                        <span>Decide the monthly investment amount and frequency</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                          3
                        </div>
                        <span>Set up auto-debit from your bank account</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                          4
                        </div>
                        <span>Units are allocated based on current NAV on each SIP date</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Important Notes:</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Mutual fund investments are subject to market risks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Past performance doesn't guarantee future returns</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Consider your financial goals and risk tolerance before investing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>This calculator provides estimates for planning purposes only</span>
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
                    <p className="text-sm text-blue-600 mt-1">Amount you will invest over {inputs.years} years</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Maturity Value</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.maturityValue)}</p>
                    <p className="text-sm text-green-600 mt-1">Total value at maturity</p>
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
                          <p className="text-gray-600">Inflation Impact:</p>
                          <p className="font-semibold text-red-600">
                            -{formatCurrency(results.futureValueWithInflation - results.maturityValue)}
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
                    Enter your investment details and click calculate to see your SIP projections
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
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Investment Growth Over Time
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Track your investment progress year by year</p>
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
                          stroke="#2563eb"
                          strokeWidth={2.5}
                          name="Investment Amount"
                          dot={false}
                          activeDot={{ r: 4, fill: "#2563eb" }}
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
                    <p className="text-sm text-gray-500 mt-1">
                      See how much comes from your contributions vs investment gains
                    </p>
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
                          fill="#3b82f6"
                          name="Your Contributions"
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
              <h4 className="font-semibold text-gray-800 mb-2">SIP Formula:</h4>
              <p>Maturity Value = P × [((1 + r)^n - 1) / r] × (1 + r)</p>
              <p className="mt-2">Where: P = Monthly Investment, r = Monthly Return Rate, n = Total Months</p>
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
