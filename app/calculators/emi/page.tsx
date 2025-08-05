"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Info } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

interface EMIResult {
  emi: number
  totalAmount: number
  totalInterest: number
  interestType: string
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("1000000")
  const [interestRate, setInterestRate] = useState<string>("10")
  const [loanTenure, setLoanTenure] = useState<string>("20")
  const [interestType, setInterestType] = useState<string>("reducing")
  const [result, setResult] = useState<EMIResult | null>(null)

  const calculateEMI = async () => {
    try {
      const response = await fetch("/api/calculators/emi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanAmount: Number.parseFloat(loanAmount),
          interestRate: Number.parseFloat(interestRate),
          loanTenure: Number.parseFloat(loanTenure),
          interestType,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
      }
    } catch (error) {
      console.error("Error calculating EMI:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CreditCard className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">EMI Calculator</h1>
          </div>
          <p className="text-xl text-gray-600">Calculate your loan EMI with both flat and reducing interest rates</p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <BackNavigation />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="1000000"
                />
              </div>

              <div>
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div>
                <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                <Input
                  id="loanTenure"
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  placeholder="20"
                />
              </div>

              <div>
                <Label htmlFor="interestType" className="flex items-center space-x-2">
                  <span>Interest Type</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </Label>
                <Select value={interestType} onValueChange={setInterestType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reducing">Reducing Balance</SelectItem>
                    <SelectItem value="flat">Flat Rate</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Reducing balance is more common for home loans, flat rate for personal loans
                </p>
              </div>

              <Button onClick={calculateEMI} className="w-full" size="lg">
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>EMI Calculation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.emi)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Amount Payable</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(result.totalAmount)}</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Interest</p>
                      <p className="text-xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Loan Summary</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Interest Type: {result.interestType === "reducing" ? "Reducing Balance" : "Flat Rate"}</li>
                    <li>• Principal Amount: {formatCurrency(Number.parseFloat(loanAmount))}</li>
                    <li>
                      • Interest Component: {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}% of total
                      payment
                    </li>
                    <li>
                      • Loan Duration: {loanTenure} years ({Number.parseFloat(loanTenure) * 12} months)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Understanding EMI Calculation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reducing Balance Method</h3>
                <p className="text-gray-600 mb-3">
                  Interest is calculated on the outstanding loan balance, which reduces with each payment. This is the
                  most common method for home loans and car loans.
                </p>
                <p className="text-sm text-gray-500">Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Flat Rate Method</h3>
                <p className="text-gray-600 mb-3">
                  Interest is calculated on the original loan amount throughout the tenure. Often used for personal
                  loans and some business loans.
                </p>
                <p className="text-sm text-gray-500">Formula: EMI = (P + (P × R × N)) / (N × 12)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
