import { type NextRequest, NextResponse } from "next/server"

interface EMIRequest {
  loanAmount: number
  interestRate: number
  loanTenure: number
  interestType: string
}

export async function POST(request: NextRequest) {
  try {
    const { loanAmount, interestRate, loanTenure, interestType }: EMIRequest = await request.json()

    // Validate inputs
    if (!loanAmount || !interestRate || !loanTenure || !interestType) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    let emi: number
    let totalAmount: number
    let totalInterest: number

    if (interestType === "reducing") {
      // Reducing balance method
      const monthlyRate = interestRate / 100 / 12
      const totalMonths = loanTenure * 12

      // EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
      const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)
      const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1
      emi = numerator / denominator

      totalAmount = emi * totalMonths
      totalInterest = totalAmount - loanAmount
    } else {
      // Flat rate method
      const totalInterestFlat = (loanAmount * interestRate * loanTenure) / 100
      totalAmount = loanAmount + totalInterestFlat
      emi = totalAmount / (loanTenure * 12)
      totalInterest = totalInterestFlat
    }

    const result = {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      interestType,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("EMI calculation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
