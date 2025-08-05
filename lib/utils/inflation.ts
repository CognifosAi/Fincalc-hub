/**
 * Utility functions for inflation calculations
 */

export function adjustForInflation(nominalAmount: number, inflationRate: number, years: number): number {
  return nominalAmount / Math.pow(1 + inflationRate / 100, years)
}

export function futureValueWithInflation(presentValue: number, inflationRate: number, years: number): number {
  return presentValue * Math.pow(1 + inflationRate / 100, years)
}

export function realReturnRate(nominalRate: number, inflationRate: number): number {
  return ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}
