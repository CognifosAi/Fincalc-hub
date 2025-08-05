import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BackNavigation } from "@/components/ui/back-navigation"
import {
  Calculator,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Building,
  Shield,
  FileText,
  Percent,
  Target,
  Home,
  ArrowRight,
  Receipt,
  DollarSign,
  BarChart3,
  Calendar,
  Briefcase,
  Award,
  Users,
  Globe,
} from "lucide-react"

const calculatorCategories = [
  {
    title: "Investment Calculators",
    description: "Calculate returns and plan your investment strategy",
    color: "bg-blue-50 border-blue-200",
    calculators: [
      {
        name: "SIP Calculator",
        description: "Calculate systematic investment plan returns",
        icon: TrendingUp,
        href: "/calculators/sip",
        popular: true,
      },
      {
        name: "Lumpsum Calculator",
        description: "Calculate one-time investment returns",
        icon: PiggyBank,
        href: "/calculators/lumpsum",
        popular: true,
      },
      {
        name: "SWP Calculator",
        description: "Plan systematic withdrawal from investments",
        icon: TrendingUp,
        href: "/calculators/swp",
      },
      {
        name: "Step-Up SIP",
        description: "Calculate returns with increasing SIP amounts",
        icon: TrendingUp,
        href: "/calculators/step-up-sip",
      },
      {
        name: "STP Calculator",
        description: "Systematic transfer plan calculator",
        icon: TrendingUp,
        href: "/calculators/stp",
      },
      {
        name: "XIRR Calculator",
        description: "Calculate extended internal rate of return",
        icon: BarChart3,
        href: "/calculators/xirr",
      },
    ],
  },
  {
    title: "Banking & Deposits",
    description: "Calculate returns on fixed deposits and savings",
    color: "bg-green-50 border-green-200",
    calculators: [
      {
        name: "FD Calculator",
        description: "Calculate fixed deposit maturity amount",
        icon: Building,
        href: "/calculators/fd",
        popular: true,
      },
      {
        name: "RD Calculator",
        description: "Calculate recurring deposit returns",
        icon: Calendar,
        href: "/calculators/rd",
      },
      {
        name: "Simple Interest",
        description: "Calculate simple interest on principal",
        icon: Percent,
        href: "/calculators/simple-interest",
      },
      {
        name: "Compound Interest",
        description: "Calculate compound interest returns",
        icon: TrendingUp,
        href: "/calculators/compound-interest",
      },
    ],
  },
  {
    title: "Government Schemes",
    description: "Calculate returns from government investment schemes",
    color: "bg-orange-50 border-orange-200",
    calculators: [
      {
        name: "SSY Calculator",
        description: "Sukanya Samriddhi Yojana calculator",
        icon: Shield,
        href: "/calculators/ssy",
      },
      {
        name: "PPF Calculator",
        description: "Public Provident Fund calculator",
        icon: Shield,
        href: "/calculators/ppf",
        popular: true,
      },
      {
        name: "EPF Calculator",
        description: "Employee Provident Fund calculator",
        icon: Briefcase,
        href: "/calculators/epf",
      },
      {
        name: "NSC Calculator",
        description: "National Savings Certificate calculator",
        icon: Award,
        href: "/calculators/nsc",
      },
      {
        name: "SCSS Calculator",
        description: "Senior Citizen Savings Scheme calculator",
        icon: Users,
        href: "/calculators/scss",
      },
      {
        name: "APY Calculator",
        description: "Atal Pension Yojana calculator",
        icon: Shield,
        href: "/calculators/apy",
      },
    ],
  },
  {
    title: "Loan Calculators",
    description: "Calculate EMIs and loan details",
    color: "bg-red-50 border-red-200",
    calculators: [
      {
        name: "EMI Calculator",
        description: "Calculate equated monthly installments (Flat + Reducing)",
        icon: CreditCard,
        href: "/calculators/emi",
        popular: true,
      },
      {
        name: "Home Loan Calculator",
        description: "Calculate home loan EMI and interest",
        icon: Home,
        href: "/calculators/home-loan",
        popular: true,
      },
      {
        name: "Personal Loan Calculator",
        description: "Calculate personal loan EMI",
        icon: CreditCard,
        href: "/calculators/personal-loan",
      },
      {
        name: "Car Loan Calculator",
        description: "Calculate car loan EMI and total cost",
        icon: CreditCard,
        href: "/calculators/car-loan",
      },
    ],
  },
  {
    title: "Retirement Planning",
    description: "Plan for your retirement and post-retirement income",
    color: "bg-purple-50 border-purple-200",
    calculators: [
      {
        name: "Retirement Corpus",
        description: "Calculate retirement corpus needed",
        icon: PiggyBank,
        href: "/calculators/retirement-corpus",
      },
      {
        name: "Gratuity Calculator",
        description: "Calculate gratuity amount",
        icon: Award,
        href: "/calculators/gratuity",
      },
      {
        name: "OPS Calculator",
        description: "Old Pension Scheme calculator",
        icon: Users,
        href: "/calculators/ops",
      },
    ],
  },
  {
    title: "Tax Calculators",
    description: "Calculate various taxes and deductions",
    color: "bg-yellow-50 border-yellow-200",
    calculators: [
      {
        name: "Income Tax Calculator",
        description: "Calculate income tax liability",
        icon: FileText,
        href: "/calculators/income-tax",
        popular: true,
      },
      {
        name: "TDS Calculator",
        description: "Calculate tax deducted at source",
        icon: Receipt,
        href: "/calculators/tds",
      },
      {
        name: "HRA Calculator",
        description: "Calculate house rent allowance exemption",
        icon: Home,
        href: "/calculators/hra",
      },
      {
        name: "GST Calculator",
        description: "Calculate goods and services tax",
        icon: Percent,
        href: "/calculators/gst",
      },
    ],
  },
  {
    title: "Goal-Based Planning",
    description: "Set and achieve your financial goals",
    color: "bg-cyan-50 border-cyan-200",
    calculators: [
      {
        name: "Retire Early",
        description: "Plan for early retirement",
        icon: Target,
        href: "/calculators/goals/retire-early",
      },
      {
        name: "Emergency Fund",
        description: "Build your emergency corpus",
        icon: Shield,
        href: "/calculators/goals/emergency-fund",
        popular: true,
      },
      {
        name: "Dream House",
        description: "Save for your dream home",
        icon: Home,
        href: "/calculators/goals/dream-house",
      },
    ],
  },
  {
    title: "Other Tools",
    description: "Additional financial calculation tools",
    color: "bg-gray-50 border-gray-200",
    calculators: [
      {
        name: "Stock Average Calculator",
        description: "Calculate average stock purchase price",
        icon: BarChart3,
        href: "/calculators/stock-average",
      },
      {
        name: "Inflation Impact",
        description: "Calculate impact of inflation on money",
        icon: TrendingUp,
        href: "/calculators/inflation-impact",
      },
      {
        name: "Salary Breakdown",
        description: "Break down salary components",
        icon: DollarSign,
        href: "/calculators/salary-breakdown",
      },
    ],
  },
  {
    title: "Currency & International",
    description: "Currency conversion and international finance tools",
    color: "bg-indigo-50 border-indigo-200",
    calculators: [
      {
        name: "PPP Calculator",
        description: "Purchasing Power Parity calculator",
        icon: Globe,
        href: "/calculators/ppp",
      },
    ],
  },
]

export default function CalculatorsPage() {
  const totalCalculators = calculatorCategories.reduce((total, category) => total + category.calculators.length, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Financial Calculators</h1>
            </div>
            <p className="text-xl text-gray-600 mt-4">
              Comprehensive collection of {totalCalculators}+ calculators across {calculatorCategories.length}{" "}
              categories
            </p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation href="/" label="Back to Home" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator Categories */}
        <div className="space-y-12">
          {calculatorCategories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </div>
                {category.title === "Goal-Based Planning" && (
                  <Link href="/calculators/goals">
                    <Button variant="outline" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 bg-transparent">
                      View All Goal Calculators
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.calculators.map((calculator, calculatorIndex) => (
                  <Link key={calculatorIndex} href={calculator.href}>
                    <Card
                      className={`hover:shadow-lg transition-all duration-200 cursor-pointer h-full ${category.color} border-2 hover:scale-105`}
                    >
                      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                        <calculator.icon className="h-8 w-8 text-gray-700 mr-3" />
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center">
                            {calculator.name}
                            {calculator.popular && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Popular
                              </Badge>
                            )}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{calculator.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-6">
            Not sure which calculator to use? Check out our guides or contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Guides
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Support
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
