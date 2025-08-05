"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BackNavigation } from "@/components/ui/back-navigation"
import {
  Globe,
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  Info,
  DollarSign,
  Calculator,
  BarChart3,
  AlertCircle,
  Target,
} from "lucide-react"

// Country data with PPP conversion factors and exchange rates
const countries = [
  {
    code: "IN",
    name: "India",
    currency: "INR",
    symbol: "₹",
    flag: "🇮🇳",
    pppFactor: 20.65, // PPP conversion factor to USD
    exchangeRate: 83.12, // Market exchange rate to USD
    costOfLivingIndex: 25.14,
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    symbol: "$",
    flag: "🇺🇸",
    pppFactor: 1.0,
    exchangeRate: 1.0,
    costOfLivingIndex: 100.0,
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    pppFactor: 0.69,
    exchangeRate: 0.79,
    costOfLivingIndex: 67.28,
  },
  {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    symbol: "C$",
    flag: "🇨🇦",
    pppFactor: 1.24,
    exchangeRate: 1.35,
    costOfLivingIndex: 71.92,
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
    flag: "🇦🇺",
    pppFactor: 1.44,
    exchangeRate: 1.52,
    costOfLivingIndex: 73.54,
  },
  {
    code: "DE",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
    flag: "🇩🇪",
    pppFactor: 0.77,
    exchangeRate: 0.92,
    costOfLivingIndex: 65.26,
  },
  {
    code: "JP",
    name: "Japan",
    currency: "JPY",
    symbol: "¥",
    flag: "🇯🇵",
    pppFactor: 102.74,
    exchangeRate: 149.5,
    costOfLivingIndex: 83.35,
  },
  {
    code: "SG",
    name: "Singapore",
    currency: "SGD",
    symbol: "S$",
    flag: "🇸🇬",
    pppFactor: 1.21,
    exchangeRate: 1.34,
    costOfLivingIndex: 91.84,
  },
  {
    code: "AE",
    name: "UAE",
    currency: "AED",
    symbol: "د.إ",
    flag: "🇦🇪",
    pppFactor: 1.63,
    exchangeRate: 3.67,
    costOfLivingIndex: 54.52,
  },
  {
    code: "CH",
    name: "Switzerland",
    currency: "CHF",
    symbol: "CHF",
    flag: "🇨🇭",
    pppFactor: 1.18,
    exchangeRate: 0.88,
    costOfLivingIndex: 131.39,
  },
]

export default function PPPCalculatorPage() {
  const [amount, setAmount] = useState("1200000")
  const [fromCountry, setFromCountry] = useState("IN")
  const [toCountry, setToCountry] = useState("US")
  const [calculationType, setCalculationType] = useState("salary") // salary or expense

  const fromCountryData = countries.find((c) => c.code === fromCountry)!
  const toCountryData = countries.find((c) => c.code === toCountry)!

  // Calculate PPP equivalent
  const amountInUSD = Number.parseFloat(amount) / fromCountryData.pppFactor
  const pppEquivalent = amountInUSD * toCountryData.pppFactor

  // Calculate market exchange rate equivalent
  const marketUSD = Number.parseFloat(amount) / fromCountryData.exchangeRate
  const marketEquivalent = marketUSD * toCountryData.exchangeRate

  // Calculate differences
  const pppAdvantage = ((pppEquivalent - marketEquivalent) / marketEquivalent) * 100
  const purchasingPowerRatio = fromCountryData.costOfLivingIndex / toCountryData.costOfLivingIndex

  const formatCurrency = (value: number, countryData: typeof fromCountryData) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: countryData.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace(countryData.currency, countryData.symbol)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const swapCountries = () => {
    setFromCountry(toCountry)
    setToCountry(fromCountry)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">PPP Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Compare purchasing power parity between countries for salaries and expenses
          </p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Calculator Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">What are you comparing?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={calculationType === "salary" ? "default" : "outline"}
                      onClick={() => setCalculationType("salary")}
                      className="text-sm"
                    >
                      Salary
                    </Button>
                    <Button
                      variant={calculationType === "expense" ? "default" : "outline"}
                      onClick={() => setCalculationType("expense")}
                      className="text-sm"
                    >
                      Expense
                    </Button>
                  </div>
                </div>

                {/* From Country */}
                <div>
                  <Label htmlFor="fromCountry" className="text-sm font-medium text-gray-700 mb-2 block">
                    From Country
                  </Label>
                  <select
                    id="fromCountry"
                    value={fromCountry}
                    onChange={(e) => setFromCountry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.currency})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={swapCountries}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Swap</span>
                  </Button>
                </div>

                {/* To Country */}
                <div>
                  <Label htmlFor="toCountry" className="text-sm font-medium text-gray-700 mb-2 block">
                    To Country
                  </Label>
                  <select
                    id="toCountry"
                    value={toCountry}
                    onChange={(e) => setToCountry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.currency})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2 block">
                    Current {calculationType === "salary" ? "Salary" : "Expense"} ({fromCountryData.symbol})
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="text-lg font-semibold"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* PPP Results */}
            <Card className="shadow-xl border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <BarChart3 className="w-5 h-5" />
                  <span>PPP Equivalent (Real Purchasing Power)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {formatCurrency(pppEquivalent, toCountryData)}
                  </div>
                  <p className="text-gray-600">
                    Equivalent {calculationType} in {toCountryData.flag} {toCountryData.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Based on purchasing power parity</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">PPP Conversion</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {formatCurrency(Number.parseFloat(amount), fromCountryData)} in {fromCountryData.name} has the same
                    purchasing power as {formatCurrency(pppEquivalent, toCountryData)} in {toCountryData.name}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Market Exchange Rate Results */}
            <Card className="shadow-xl border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <DollarSign className="w-5 h-5" />
                  <span>Market Exchange Rate Conversion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">${formatNumber(marketUSD)}</div>
                    <p className="text-gray-600 text-sm">
                      {formatCurrency(Number.parseFloat(amount), fromCountryData)} = ${formatNumber(marketUSD)} USD
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      At market rate: 1 {fromCountryData.currency} = ${(1 / fromCountryData.exchangeRate).toFixed(4)}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {formatCurrency(marketEquivalent, toCountryData)}
                    </div>
                    <p className="text-gray-600 text-sm">
                      ${formatNumber(marketUSD)} = {formatCurrency(marketEquivalent, toCountryData)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      At market rate: 1 USD = {toCountryData.exchangeRate.toFixed(2)} {toCountryData.currency}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Market Conversion</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Direct currency conversion: {formatCurrency(Number.parseFloat(amount), fromCountryData)} ={" "}
                    {formatCurrency(marketEquivalent, toCountryData)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Analysis */}
            <Card className="shadow-xl border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-700">
                  <BarChart3 className="w-5 h-5" />
                  <span>PPP vs Market Rate Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${pppAdvantage > 0 ? "text-green-600" : "text-red-600"}`}>
                      {pppAdvantage > 0 ? "+" : ""}
                      {formatNumber(pppAdvantage)}%
                    </div>
                    <p className="text-gray-600 text-sm">PPP {pppAdvantage > 0 ? "Advantage" : "Disadvantage"}</p>
                    <div className="flex items-center justify-center mt-2">
                      {pppAdvantage > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className="text-xs text-gray-500">vs Market Rate</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{formatNumber(purchasingPowerRatio)}x</div>
                    <p className="text-gray-600 text-sm">Purchasing Power Ratio</p>
                    <p className="text-xs text-gray-500 mt-2">Cost of living comparison</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Analysis</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    {pppAdvantage > 0 ? (
                      <>
                        Your money has <strong>{formatNumber(Math.abs(pppAdvantage))}% more</strong> purchasing power in{" "}
                        {toCountryData.name} compared to direct currency conversion.
                      </>
                    ) : (
                      <>
                        Your money has <strong>{formatNumber(Math.abs(pppAdvantage))}% less</strong> purchasing power in{" "}
                        {toCountryData.name} compared to direct currency conversion.
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cost of Living Comparison */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Cost of Living Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-2">{fromCountryData.costOfLivingIndex}</div>
                    <p className="text-gray-600 text-sm">
                      {fromCountryData.flag} {fromCountryData.name}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Cost Index
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-2">{toCountryData.costOfLivingIndex}</div>
                    <p className="text-gray-600 text-sm">
                      {toCountryData.flag} {toCountryData.name}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Cost Index
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Cost of living in {toCountryData.name} is{" "}
                    <span
                      className={`font-semibold ${
                        toCountryData.costOfLivingIndex > fromCountryData.costOfLivingIndex
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {formatNumber(
                        Math.abs(
                          ((toCountryData.costOfLivingIndex - fromCountryData.costOfLivingIndex) /
                            fromCountryData.costOfLivingIndex) *
                            100,
                        ),
                      )}
                      % {toCountryData.costOfLivingIndex > fromCountryData.costOfLivingIndex ? "higher" : "lower"}
                    </span>{" "}
                    than {fromCountryData.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span>What is PPP?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  <strong>Purchasing Power Parity (PPP)</strong> is an economic theory that compares different
                  countries' currencies through a "basket of goods" approach.
                </p>
                <p>
                  PPP suggests that identical goods should cost the same in different countries when prices are
                  converted to a common currency, accounting for the cost of living differences.
                </p>
                <p>
                  This makes PPP more useful than market exchange rates for comparing living standards and real income
                  between countries.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span>PPP vs Exchange Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-blue-600 mb-1">Market Exchange Rate:</p>
                  <p>The rate at which one currency can be exchanged for another in financial markets.</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600 mb-1">PPP Rate:</p>
                  <p>
                    The rate that equalizes the purchasing power of different currencies by accounting for cost of
                    living differences.
                  </p>
                </div>
                <p>
                  <strong>Use PPP</strong> for salary comparisons, cost of living analysis, and understanding real
                  purchasing power.
                  <strong>Use market rates</strong> for actual currency conversion and international transactions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>When to Use This Calculator</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Job Offers</h4>
                <p className="text-gray-600">
                  Compare salary offers from different countries to understand real purchasing power and living
                  standards.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Relocation Planning</h4>
                <p className="text-gray-600">
                  Evaluate the financial impact of moving to a different country for work or lifestyle.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Cost Analysis</h4>
                <p className="text-gray-600">
                  Understand how much your current expenses would cost in different countries.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reference Table */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Country Reference Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Country</th>
                    <th className="text-right py-2">PPP Factor</th>
                    <th className="text-right py-2">Exchange Rate</th>
                    <th className="text-right py-2">Cost Index</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((country) => (
                    <tr key={country.code} className="border-b border-gray-100">
                      <td className="py-2">
                        <span className="mr-2">{country.flag}</span>
                        {country.name}
                      </td>
                      <td className="text-right py-2">{country.pppFactor}</td>
                      <td className="text-right py-2">{country.exchangeRate}</td>
                      <td className="text-right py-2">{country.costOfLivingIndex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * PPP factors and exchange rates are approximate and updated periodically. Cost index is relative to USA
              (100).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
