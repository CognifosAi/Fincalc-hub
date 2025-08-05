"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, BarChart3, ArrowUpCircle, Target, Info } from "lucide-react"
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

const StepUpSIPCalculator = () => {
  const [inputs, setInputs] = useState({
    initialSIP: "",
    stepUpPercentage: "",
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

  const calculateStepUpSIP = () => {
    const initialSIP = Number.parseFloat(inputs.initialSIP)
    const stepUpRate = Number.parseFloat(inputs.stepUpPercentage) / 100
    const r = Number.parseFloat(inputs.annualReturn) / 100 / 12 // Monthly return rate
    const years = Number.parseFloat(inputs.years)
    const inflationRate = Number.parseFloat(inputs.inflationRate) / 100

    if (!initialSIP || !stepUpRate || !r || !years || isNaN(inflationRate)) {
      alert("Please fill in all fields with valid numbers")
      return
    }

    // Calculate step-up SIP
    let totalInvestment = 0
    let maturityValue = 0
    let currentSIP = initialSIP
    const yearWiseData = []

    for (let year = 1; year <= years; year++) {
      let yearlyInvestment = 0
      const yearStartMaturityValue = maturityValue

      // Calculate for 12 months of current year
      for (let month = 1; month <= 12; month++) {
        // Apply return to existing amount
        maturityValue = maturityValue * (1 + r)
        // Add current month's SIP
        maturityValue += currentSIP
        yearlyInvestment += currentSIP
        totalInvestment += currentSIP
      }

      const yearInflationAdjustedValue = maturityValue / Math.pow(1 + inflationRate, year)
      const cumulativeGains = maturityValue - totalInvestment

      yearWiseData.push({
        year: year,
        currentSIP: Math.round(currentSIP),
        yearlyInvestment: Math.round(yearlyInvestment),
        totalInvestment: Math.round(totalInvestment),
        maturityValue: Math.round(maturityValue),
        inflationAdjustedValue: Math.round(yearInflationAdjustedValue),
        gains: Math.round(cumulativeGains),
      })

      // Step up SIP for next year
      currentSIP = currentSIP * (1 + stepUpRate)
    }

    const gainedValue = maturityValue - totalInvestment
    const inflationAdjustedValue = maturityValue / Math.pow(1 + inflationRate, years)
    const futureValueWithInflation = maturityValue * Math.pow(1 + inflationRate, years)

    // Calculate regular SIP comparison (without step-up)
    const regularSIPMaturity = initialSIP * (((Math.pow(1 + r, years * 12) - 1) / r) * (1 + r))
    const regularSIPInvestment = initialSIP * years * 12
    const stepUpAdvantage = maturityValue - regularSIPMaturity

    setResults({
      totalInvestment: totalInvestment,
      maturityValue: maturityValue,
      gainedValue: gainedValue,
      inflationAdjustedValue: inflationAdjustedValue,
      futureValueWithInflation: futureValueWithInflation,
      regularSIPMaturity: regularSIPMaturity,
      regularSIPInvestment: regularSIPInvestment,
      stepUpAdvantage: stepUpAdvantage,
      finalSIPAmount: currentSIP / (1 + stepUpRate), // Last year's SIP
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto mb-4">
        <BackNavigation href="/calculators" label="Back to Calculators" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ArrowUpCircle className="w-10 h-10 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Step-up SIP Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Calculate returns with annually increasing SIP investments</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-600" />
              Step-up SIP Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Monthly SIP Amount (₹)</label>
                <input
                  type="number"
                  value={inputs.initialSIP}
                  onChange={(e) => handleInputChange("initialSIP", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Step-up Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.stepUpPercentage}
                  onChange={(e) => handleInputChange("stepUpPercentage", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="e.g., 10"
                />
                <p className="text-xs text-gray-500 mt-1">Typical range: 5-15% annually</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.annualReturn}
                  onChange={(e) => handleInputChange("annualReturn", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="e.g., 12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                <input
                  type="number"
                  value={inputs.years}
                  onChange={(e) => handleInputChange("years", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="e.g., 6"
                />
              </div>

              <button
                onClick={calculateStepUpSIP}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Calculate Step-up SIP Returns
              </button>
            </div>

            {/* About Step-up SIP Section */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About Step-up SIP
              </h3>
              <div className="text-sm text-green-700 space-y-2">
                <p>
                  <strong>Step-up SIP</strong> allows you to increase your monthly investment amount annually by a fixed
                  percentage.
                </p>
                <div className="mt-3">
                  <p className="font-medium mb-2">Key Benefits:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>
                      <strong>Beat Inflation:</strong> Keep pace with rising costs
                    </li>
                    <li>
                      <strong>Salary Growth:</strong> Align with income increments
                    </li>
                    <li>
                      <strong>Faster Goals:</strong> Reach targets 30-40% quicker
                    </li>
                    <li>
                      <strong>Disciplined Saving:</strong> Automatic increase in investments
                    </li>
                  </ul>
                </div>
                <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                  <strong>Example:</strong> Start with ₹5,000/month, increase by 10% annually.
                  <br />
                  Year 1: ₹5,000 → Year 2: ₹5,500 → Year 3: ₹6,050
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Step-up SIP Results
              </h2>

              {results ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Investment</h3>
                    <p className="text-3xl font-bold text-blue-900">{formatCurrency(results.totalInvestment)}</p>
                    <p className="text-sm text-blue-600 mt-1">Amount invested over {inputs.years} years</p>
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
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Present Value</h3>
                    <p className="text-3xl font-bold text-orange-900">
                      {formatCurrency(results.inflationAdjustedValue)}
                    </p>
                    <p className="text-sm text-orange-600 mt-1">Real purchasing power in today's money</p>
                  </div>

                  <div className="bg-teal-50 p-6 rounded-xl border-l-4 border-teal-500">
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">Step-up Advantage</h3>
                    <p className="text-3xl font-bold text-teal-900">{formatCurrency(results.stepUpAdvantage)}</p>
                    <p className="text-sm text-teal-600 mt-1">Extra returns vs regular SIP</p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-2">Final SIP Amount</h3>
                    <p className="text-3xl font-bold text-indigo-900">{formatCurrency(results.finalSIPAmount)}</p>
                    <p className="text-sm text-indigo-600 mt-1">Monthly SIP in final year</p>
                  </div>

                  {/* Comparison with Regular SIP */}
                  <div className="md:col-span-2">
                    <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        📊 Step-up vs Regular SIP Comparison
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-yellow-700">Regular SIP Maturity:</p>
                          <p className="font-bold text-yellow-900">{formatCurrency(results.regularSIPMaturity)}</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Step-up SIP Maturity:</p>
                          <p className="font-bold text-yellow-900">{formatCurrency(results.maturityValue)}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Step-up Advantage:</strong> {formatCurrency(results.stepUpAdvantage)} (
                          {(
                            ((results.maturityValue - results.regularSIPMaturity) / results.regularSIPMaturity) *
                            100
                          ).toFixed(1)}
                          % more)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Insights */}
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Return:</p>
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
                          <p className="text-gray-600">SIP Growth:</p>
                          <p className="font-semibold text-green-600">
                            {((results.finalSIPAmount / Number.parseFloat(inputs.initialSIP || 1) - 1) * 100).toFixed(
                              0,
                            )}
                            %
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Power of Step-up:</p>
                          <p className="font-semibold text-green-600">
                            {((results.stepUpAdvantage / results.regularSIPMaturity) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Enter your step-up SIP details and click calculate to see projections
                  </p>
                </div>
              )}
            </div>

            {/* Charts Section */}
            {results && results.yearWiseData && (
              <div className="space-y-6">
                {/* Growth Comparison Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Step-up SIP Growth Analysis
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Track your investment and maturity value progression</p>
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
                          stroke="#059669"
                          strokeWidth={2.5}
                          name="Total Investment"
                          dot={false}
                          activeDot={{ r: 4, fill: "#059669" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="maturityValue"
                          stroke="#0d9488"
                          strokeWidth={2.5}
                          name="Maturity Value"
                          dot={false}
                          activeDot={{ r: 4, fill: "#0d9488" }}
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

                {/* SIP Amount Progression */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <ArrowUpCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Monthly SIP Amount Progression
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">See how your SIP amount increases each year</p>
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
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                        <Legend
                          wrapperStyle={{ paddingBottom: "10px" }}
                          align="left"
                          verticalAlign="top"
                          layout="horizontal"
                          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                        <Bar dataKey="currentSIP" fill="#0ea5e9" name="Monthly SIP Amount" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Investment vs Gains */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                      Investment vs Gains Breakdown
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
                          fill="#059669"
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How Step-up SIP Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Step-up SIP Process:</h4>
              <p>1. Start with initial monthly SIP amount</p>
              <p>2. Each year, increase SIP by step-up percentage</p>
              <p>3. Continue investing the increased amount for that year</p>
              <p>4. Compounding works on both investment and returns</p>
              <p className="mt-2">Formula: SIP(n) = Initial SIP × (1 + step-up rate)^(n-1)</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Benefits of Step-up SIP:</h4>
              <p>
                <strong>Inflation Protection:</strong> Keeps pace with rising costs
              </p>
              <p>
                <strong>Income Growth:</strong> Aligns with salary increments
              </p>
              <p>
                <strong>Accelerated Wealth:</strong> Significantly higher returns
              </p>
              <p>
                <strong>Goal Achievement:</strong> Reach targets faster
              </p>
              <p className="mt-2">Recommended step-up: 10-15% annually or match salary increment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepUpSIPCalculator
