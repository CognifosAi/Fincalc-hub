"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Calculator,
  TrendingUp,
  Home,
  Target,
  DollarSign,
  Globe,
  CreditCard,
  PiggyBank,
  Shield,
  Building,
  FileText,
  Percent,
  Car,
  Briefcase,
  Receipt,
  Settings,
} from "lucide-react"
import { Badge } from "./badge"

const calculators = [
  // Investment Calculators
  {
    name: "SIP Calculator",
    path: "/calculators/sip",
    category: "Investment",
    icon: TrendingUp,
    description: "Calculate returns on Systematic Investment Plans",
  },
  {
    name: "Lumpsum Calculator",
    path: "/calculators/lumpsum",
    category: "Investment",
    icon: PiggyBank,
    description: "Calculate returns on one-time investments",
  },
  {
    name: "SWP Calculator",
    path: "/calculators/swp",
    category: "Investment",
    icon: TrendingUp,
    description: "Plan systematic withdrawal from investments",
  },
  {
    name: "Step-Up SIP",
    path: "/calculators/step-up-sip",
    category: "Investment",
    icon: TrendingUp,
    description: "SIP with annual increment feature",
  },
  {
    name: "STP Calculator",
    path: "/calculators/stp",
    category: "Investment",
    icon: TrendingUp,
    description: "Systematic Transfer Plan calculator",
  },
  {
    name: "XIRR Calculator",
    path: "/calculators/xirr",
    category: "Investment",
    icon: Percent,
    description: "Extended Internal Rate of Return calculator",
  },

  // Banking & Deposits
  {
    name: "FD Calculator",
    path: "/calculators/fd",
    category: "Banking",
    icon: Shield,
    description: "Fixed Deposit maturity calculator",
  },
  {
    name: "RD Calculator",
    path: "/calculators/rd",
    category: "Banking",
    icon: Shield,
    description: "Recurring Deposit calculator",
  },
  {
    name: "Simple Interest",
    path: "/calculators/simple-interest",
    category: "Banking",
    icon: Percent,
    description: "Simple interest calculator",
  },
  {
    name: "Compound Interest",
    path: "/calculators/compound-interest",
    category: "Banking",
    icon: Percent,
    description: "Compound interest calculator",
  },

  // Government Schemes
  {
    name: "SSY Calculator",
    path: "/calculators/ssy",
    category: "Government",
    icon: Building,
    description: "Sukanya Samriddhi Yojana calculator",
  },
  {
    name: "PPF Calculator",
    path: "/calculators/ppf",
    category: "Government",
    icon: Building,
    description: "Public Provident Fund calculator",
  },
  {
    name: "EPF Calculator",
    path: "/calculators/epf",
    category: "Government",
    icon: Building,
    description: "Employee Provident Fund calculator",
  },
  {
    name: "NSC Calculator",
    path: "/calculators/nsc",
    category: "Government",
    icon: Building,
    description: "National Savings Certificate calculator",
  },
  {
    name: "SCSS Calculator",
    path: "/calculators/scss",
    category: "Government",
    icon: Building,
    description: "Senior Citizens Savings Scheme calculator",
  },
  {
    name: "APY Calculator",
    path: "/calculators/apy",
    category: "Government",
    icon: Building,
    description: "Atal Pension Yojana calculator",
  },

  // Loan Calculators
  {
    name: "EMI Calculator",
    path: "/calculators/emi",
    category: "Loan",
    icon: CreditCard,
    description: "Calculate loan EMIs (Flat + Reducing rates)",
  },
  {
    name: "Home Loan Calculator",
    path: "/calculators/home-loan",
    category: "Loan",
    icon: Home,
    description: "Calculate home loan EMIs and eligibility",
  },
  {
    name: "Personal Loan Calculator",
    path: "/calculators/personal-loan",
    category: "Loan",
    icon: Briefcase,
    description: "Calculate personal loan EMIs and interest",
  },
  {
    name: "Car Loan Calculator",
    path: "/calculators/car-loan",
    category: "Loan",
    icon: Car,
    description: "Calculate car loan EMIs and total cost",
  },

  // Retirement Planning
  {
    name: "Retirement Corpus",
    path: "/calculators/retirement-corpus",
    category: "Retirement",
    icon: PiggyBank,
    description: "Calculate retirement fund needed",
  },
  {
    name: "Gratuity Calculator",
    path: "/calculators/gratuity",
    category: "Retirement",
    icon: Briefcase,
    description: "Calculate gratuity amount",
  },
  {
    name: "OPS Calculator",
    path: "/calculators/ops",
    category: "Retirement",
    icon: Building,
    description: "Old Pension Scheme calculator",
  },

  // Tax Calculators
  {
    name: "Income Tax Calculator",
    path: "/calculators/income-tax",
    category: "Tax",
    icon: FileText,
    description: "Calculate income tax liability and plan savings",
  },
  {
    name: "TDS Calculator",
    path: "/calculators/tds",
    category: "Tax",
    icon: Receipt,
    description: "Tax Deducted at Source calculator",
  },
  {
    name: "HRA Calculator",
    path: "/calculators/hra",
    category: "Tax",
    icon: Home,
    description: "House Rent Allowance calculator",
  },
  {
    name: "GST Calculator",
    path: "/calculators/gst",
    category: "Tax",
    icon: Receipt,
    description: "Goods and Services Tax calculator",
  },

  // Goal-Based Planning
  {
    name: "Retire Early Calculator",
    path: "/calculators/goals/retire-early",
    category: "Goal Planning",
    icon: Target,
    description: "Plan for early retirement and financial independence",
  },
  {
    name: "Emergency Fund Calculator",
    path: "/calculators/goals/emergency-fund",
    category: "Goal Planning",
    icon: Shield,
    description: "Build adequate emergency fund for financial security",
  },
  {
    name: "Dream House Calculator",
    path: "/calculators/goals/dream-house",
    category: "Goal Planning",
    icon: Home,
    description: "Plan and save for your dream home purchase",
  },
  {
    name: "Travel Goal Calculator",
    path: "/calculators/goals/travel-goal",
    category: "Goal Planning",
    icon: Target,
    description: "Save for your dream vacation or travel plans",
  },
  {
    name: "Custom Goal Calculator",
    path: "/calculators/goals/custom-goal",
    category: "Goal Planning",
    icon: Settings,
    description: "Create and plan for any custom financial goal",
  },

  // Other Tools
  {
    name: "Stock Average Calculator",
    path: "/calculators/stock-average",
    category: "Tools",
    icon: TrendingUp,
    description: "Calculate average stock purchase price",
  },
  {
    name: "Inflation Impact",
    path: "/calculators/inflation-impact",
    category: "Tools",
    icon: TrendingUp,
    description: "Calculate inflation impact on money value",
  },
  {
    name: "Salary Breakdown",
    path: "/calculators/salary-breakdown",
    category: "Tools",
    icon: DollarSign,
    description: "Detailed salary breakdown calculator",
  },

  // Currency & International
  {
    name: "PPP Calculator",
    path: "/calculators/ppp",
    category: "Currency",
    icon: Globe,
    description: "Compare purchasing power between countries",
  },
]

const categoryColors = {
  Investment: "bg-blue-100 text-blue-800",
  Banking: "bg-green-100 text-green-800",
  Government: "bg-purple-100 text-purple-800",
  Loan: "bg-orange-100 text-orange-800",
  Retirement: "bg-indigo-100 text-indigo-800",
  Tax: "bg-red-100 text-red-800",
  "Goal Planning": "bg-cyan-100 text-cyan-800",
  Tools: "bg-gray-100 text-gray-800",
  Currency: "bg-teal-100 text-teal-800",
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCalculators = calculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(query.toLowerCase()) ||
      calc.category.toLowerCase().includes(query.toLowerCase()) ||
      calc.description.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && event.ctrlKey) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredCalculators.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && filteredCalculators[selectedIndex]) {
          handleSelect(filteredCalculators[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelect = (calculator: (typeof calculators)[0]) => {
    router.push(calculator.path)
    setQuery("")
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredCalculators.length > 0) {
      handleSelect(filteredCalculators[0])
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search calculators... (Ctrl+/)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
              setSelectedIndex(-1)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </form>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {filteredCalculators.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
                {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? "s" : ""} found
              </div>
              {filteredCalculators.map((calculator, index) => {
                const IconComponent = calculator.icon
                return (
                  <button
                    key={calculator.path}
                    onClick={() => handleSelect(calculator)}
                    className={`w-full px-3 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors ${
                      index === selectedIndex ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{calculator.name}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-0.5 ${
                              categoryColors[calculator.category as keyof typeof categoryColors]
                            }`}
                          >
                            {calculator.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1">{calculator.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </>
          ) : (
            <div className="px-3 py-8 text-center text-gray-500">
              <Calculator className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No calculators found</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for "SIP", "EMI", or "Tax"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
