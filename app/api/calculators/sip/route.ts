import { type NextRequest, NextResponse } from "next/server"

interface SIPRequest {
  monthlyAmount: number
  annualReturn: number
  timePeriod: number
  inflationRate: number
}

function adjustForInflation(nominalAmount: number, inflationRate: number, years: number): number {
  return nominalAmount / Math.pow(1 + inflationRate / 100, years)
}

export async function POST(request: NextRequest) {
  try {
    const { monthlyAmount, annualReturn, timePeriod, inflationRate }: SIPRequest = await request.json()

    // Validate inputs
    if (!monthlyAmount || !annualReturn || !timePeriod) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Calculate SIP returns
    const monthlyRate = annualReturn / 100 / 12
    const totalMonths = timePeriod * 12

    // SIP formula: M * [((1 + r)^n - 1) / r] * (1 + r)
    const totalValue =
      ((monthlyAmount * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / monthlyRate) * (1 + monthlyRate)
    const totalInvestment = monthlyAmount * totalMonths
    const totalGains = totalValue - totalInvestment

    // Inflation adjustment
    const inflationAdjustedValue = adjustForInflation(totalValue, inflationRate, timePeriod)
    const realGains = inflationAdjustedValue - totalInvestment

    const result = {
      totalInvestment: Math.round(totalInvestment),
      totalValue: Math.round(totalValue),
      totalGains: Math.round(totalGains),
      inflationAdjustedValue: Math.round(inflationAdjustedValue),
      realGains: Math.round(realGains),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("SIP calculation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
