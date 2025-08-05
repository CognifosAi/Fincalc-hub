"use client"

import { useState } from "react"
import { TrendingDown, DollarSign, BarChart3, ArrowDownCircle, Calendar } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function SWPCalculator() {
  const [inputs, setInputs] = useState({
    initialInvestment: "",
    monthlyWithdrawal: "",
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

  const calculateSWP = () => {
    const P = Number.parseFloat(inputs.initialInvestment)
    const W = Number.parseFloat(inputs.monthlyWithdrawal)
    const r = Number.parseFloat(inputs.annualReturn) / 100 / 12 // Monthly return rate
    const years = Number.parseFloat(inputs.years)
    const totalMonths = years * 12
    const inflationRate = Number.parseFloat(inputs.inflationRate) / 100

    if (!P || !W || !r || !years || isNaN(inflationRate)) {
      alert("Please fill in all fields with valid numbers")
      return
    }

    // Generate month-wise data for charts
    const monthWiseData = []
    const yearWiseData = []
    let remainingBalance = P
    let totalWithdrawn = 0
    let monthsUntilDepletion = null

    for (let month = 1; month <= totalMonths; month++) {
      // Apply monthly return
      remainingBalance = remainingBalance * (1 + r)

      // Check if withdrawal is possible
      if (remainingBalance >= W) {
        remainingBalance -= W
        totalWithdrawn += W
      } else {
        // Portfolio depleted
        if (monthsUntilDepletion === null) {
          monthsUntilDepletion = month - 1
        }
        break
      }

      // Store data for each year
      if (month % 12 === 0) {
        const year = month / 12
        const yearWithdrawn = W * 12
        const inflationAdjustedBalance = remainingBalance / Math.pow(1 + inflationRate, year)
        const inflationAdjustedWithdrawal = totalWithdrawn / year / Math.pow(1 + inflationRate, year)

        yearWiseData.push({
          year: year,
          remainingBalance: Math.round(remainingBalance),
          totalWithdrawn: Math.round(totalWithdrawn),
          inflationAdjustedBalance: Math.round(inflationAdjustedBalance),
          annualWithdrawal: yearWithdrawn,
        })
      }
    }

    const finalBalance = remainingBalance
    const portfolioLastsYears = monthsUntilDepletion ? monthsUntilDepletion / 12 : years
    const inflationAdjustedFinalBalance = finalBalance / Math.pow(1 + inflationRate, years)
    const totalInflationImpact = totalWithdrawn * Math.pow(1 + inflationRate, years) - totalWithdrawn

    setResults({
      initialInvestment: P,
      totalWithdrawn: totalWithdrawn,
      finalBalance: finalBalance,
      inflationAdjustedFinalBalance: inflationAdjustedFinalBalance,
      portfolioLastsYears: portfolioLastsYears,
      monthsUntilDepletion: monthsUntilDepletion,
      totalInflationImpact: totalInflationImpact,
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ArrowDownCircle className="w-10 h-10 text-orange-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">SWP Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Calculate your Systematic Withdrawal Plan and portfolio sustainability
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
              Withdrawal Plan Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment Amount (₹)</label>
                <input
                  type="number"
                  value={inputs.initialInvestment}
                  onChange={(e) => handleInputChange("initialInvestment", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="e.g., 1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  value={inputs.monthlyWithdrawal}
                  onChange={(e) => handleInputChange("monthlyWithdrawal", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="e.g., 8000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange("annualReturn", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Period (Years)</label>
                <input
                  type="number"
                  value={inputs.years}
                  onChange={(e) => handleInputChange("years", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="e.g., 15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Inflation Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.inflationRate}
                  onChange={(e) => handleInputChange("inflationRate", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="e.g., 6"
                />
              </div>

              <button
                onClick={calculateSWP}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Calculate SWP Analysis
              </button>
            </div>

            {/* SWP Information Card */}
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <ArrowDownCircle className="w-5 h-5 mr-2 text-orange-600" />
                About SWP (Systematic Withdrawal Plan)
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What is SWP?</h4>
                  <p>
                    A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount regularly from your mutual
                    fund investments. It's ideal for retirees or anyone needing regular income from their investments.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>
                        <strong>Regular Income:</strong> Provides steady cash flow for expenses
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>
                        <strong>Tax Efficiency:</strong> Only gains are taxed, not the principal
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>
                        <strong>Flexibility:</strong> Can modify or stop withdrawals anytime
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>
                        <strong>Rupee Cost Averaging:</strong> Sell fewer units when NAV is high
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>
                        <strong>Capital Preservation:</strong> Remaining amount continues to grow
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How SWP Works:</h4>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold mr-3">
                          1
                        </div>
                        <span>Invest a lump sum in mutual funds</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold mr-3">
                          2
                        </div>
                        <span>Set up regular withdrawal amount and frequency</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold mr-3">
                          3
                        </div>
                        <span>Fund house redeems units and transfers money to your account</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold mr-3">
                          4
                        </div>
                        <span>Remaining investment continues to earn returns</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Safe Withdrawal Guidelines:</h4>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <h5 className="font-semibold text-orange-800 mb-2">Conservative (3-4%)</h5>
                        <ul className="space-y-1">
                          <li>• Low risk of depletion</li>
                          <li>• Suitable for long-term needs</li>
                          <li>• Preserves capital better</li>
                          <li>• Lower monthly income</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-800 mb-2">Aggressive (5-7%)</h5>
                        <ul className="space-y-1">
                          <li>• Higher depletion risk</li>
                          <li>• Suitable for shorter periods</li>
                          <li>• Higher monthly income</li>
                          <li>• Requires monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Best Practices:</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Start with conservative withdrawal rates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Choose diversified equity funds for growth</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Review and adjust based on market performance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Keep emergency fund separate from SWP corpus</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Important Considerations:</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Market volatility can affect portfolio longevity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Inflation reduces purchasing power over time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>High withdrawal rates may deplete corpus quickly</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span>Consider tax implications on capital gains</span>
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
                <TrendingDown className="w-6 h-6 mr-2 text-orange-600" />
                Withdrawal Analysis
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Initial Investment</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.initialInvestment)}</p>
                    <p className="text-sm text-blue-600 mt-1">Your starting portfolio amount</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Total Withdrawn</h3>
                    <p className="text-3xl font-bold text-green-900">{formatCurrency(results.totalWithdrawn)}</p>
                    <p className="text-sm text-green-600 mt-1">
                      Amount withdrawn over {results.portfolioLastsYears.toFixed(1)} years
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Final Balance</h3>
                    <p className="text-3xl font-bold text-purple-900">{formatCurrency(results.finalBalance)}</p>
                    <p className="text-sm text-purple-600 mt-1">Remaining portfolio value</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Real Final Balance</h3>
                    <p className="text-3xl font-bold text-orange-900">
                      {formatCurrency(results.inflationAdjustedFinalBalance)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">Inflation-adjusted purchasing power</p>
                  </div>

                  <div className="md:col-span-2">
                    {results.monthsUntilDepletion ? (
                      <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Portfolio Depletion Warning</h3>
                        <p className="text-2xl font-bold text-red-900">
                          Portfolio depletes in {results.portfolioLastsYears.toFixed(1)} years
                        </p>
                        <p className="text-sm text-red-600 mt-1">
                          Consider reducing withdrawal amount or increasing returns
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Sustainable Withdrawal Plan</h3>
                        <p className="text-2xl font-bold text-green-900">
                          Portfolio lasts the full {inputs.years} years
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Your withdrawal plan is sustainable with remaining balance
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Insights */}
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Annual Withdrawal:</p>
                          <p className="font-semibold text-gray-800">
                            {formatCurrency(Number.parseFloat(inputs.monthlyWithdrawal || 0) * 12)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Withdrawal Rate:</p>
                          <p className="font-semibold text-gray-800">
                            {(
                              ((Number.parseFloat(inputs.monthlyWithdrawal || 0) * 12) /
                                Number.parseFloat(inputs.initialInvestment || 1)) *
                              100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Portfolio Longevity:</p>
                          <p className="font-semibold text-gray-800">{results.portfolioLastsYears.toFixed(1)} years</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sustainability:</p>
                          <p
                            className={`font-semibold ${
                              results.monthsUntilDepletion ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {results.monthsUntilDepletion ? "Unsustainable" : "Sustainable"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your withdrawal details and click calculate to see your SWP analysis
                  </p>
                </div>
              )}
            </div>

            {/* Charts Section */}
            {results && results.yearWiseData && (
              <div className="space-y-6">
                {/* Portfolio Balance Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2 text-orange-600" />
                      Portfolio Balance Over Time
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Track how your portfolio balance changes with regular withdrawals
                    </p>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={results.yearWiseData} margin={{ top: 50, right: 30, left: 20, bottom: 60 }}>
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorInflationBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d97706" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                          </linearGradient>
                        </defs>
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
                            value: "Years",
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
                          align="left"
                          verticalAlign="top"
                          layout="horizontal"
                          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="remainingBalance"
                          stroke="#f97316"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                          name="Portfolio Balance"
                        />
                        <Area
                          type="monotone"
                          dataKey="inflationAdjustedBalance"
                          stroke="#d97706"
                          strokeWidth={2.5}
                          strokeDasharray="5 5"
                          fillOpacity={1}
                          fill="url(#colorInflationBalance)"
                          name="Real Balance (Inflation Adjusted)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Withdrawal vs Balance */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                      Annual Withdrawal vs Remaining Balance
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Compare your annual withdrawals with remaining portfolio balance
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
                            value: "Years",
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
                        <Bar dataKey="remainingBalance" fill="#f97316" name="Remaining Balance" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="annualWithdrawal" fill="#dc2626" name="Annual Withdrawal" radius={[4, 4, 0, 0]} />
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How SWP Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">SWP Process:</h4>
              <p>1. Start with initial investment amount</p>
              <p>2. Each month: Apply returns, then withdraw fixed amount</p>
              <p>3. Continue until portfolio depletes or period ends</p>
              <p className="mt-2">Safe withdrawal rate is typically 3-4% annually</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Key Considerations:</h4>
              <p>
                <strong>Sustainability:</strong> Balance between withdrawals and growth
              </p>
              <p>
                <strong>Inflation Impact:</strong> Real purchasing power decreases over time
              </p>
              <p>
                <strong>Market Risk:</strong> Poor returns can deplete portfolio faster
              </p>
              <p className="mt-2">Monitor and adjust withdrawals based on market performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
