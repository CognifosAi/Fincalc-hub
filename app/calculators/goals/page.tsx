import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackNavigation } from "@/components/ui/back-navigation"
import {
  Target,
  PiggyBank,
  Home,
  Plane,
  Briefcase,
  Heart,
  CreditCard,
  Watch,
  ShoppingBag,
  Car,
  Settings,
  TrendingUp,
} from "lucide-react"

const goalCategories = [
  {
    title: "Life Goals",
    description: "Major life milestones and achievements",
    goals: [
      {
        name: "Retire Early",
        icon: PiggyBank,
        href: "/calculators/goals/retire-early",
        description: "Calculate corpus needed for early retirement",
        color: "bg-green-50 border-green-200 text-green-800",
        iconColor: "text-green-600",
      },
      {
        name: "Emergency Fund",
        icon: Target,
        href: "/calculators/goals/emergency-fund",
        description: "Build your financial safety net",
        color: "bg-red-50 border-red-200 text-red-800",
        iconColor: "text-red-600",
      },
      {
        name: "Buy Dream House",
        icon: Home,
        href: "/calculators/goals/dream-house",
        description: "Save for your dream home down payment",
        color: "bg-blue-50 border-blue-200 text-blue-800",
        iconColor: "text-blue-600",
      },
      {
        name: "Start Business",
        icon: Briefcase,
        href: "/calculators/goals/start-business",
        description: "Fund your entrepreneurial dreams",
        color: "bg-purple-50 border-purple-200 text-purple-800",
        iconColor: "text-purple-600",
      },
    ],
  },
  {
    title: "Personal Milestones",
    description: "Special occasions and personal achievements",
    goals: [
      {
        name: "Wedding Plan",
        icon: Heart,
        href: "/calculators/goals/wedding-plan",
        description: "Save for your perfect wedding day",
        color: "bg-pink-50 border-pink-200 text-pink-800",
        iconColor: "text-pink-600",
      },
      {
        name: "Travel Goal",
        icon: Plane,
        href: "/calculators/goals/travel-goal",
        description: "Plan and save for your dream vacation",
        color: "bg-cyan-50 border-cyan-200 text-cyan-800",
        iconColor: "text-cyan-600",
      },
      {
        name: "Become Debt Free",
        icon: CreditCard,
        href: "/calculators/goals/debt-free",
        description: "Plan your journey to financial freedom",
        color: "bg-orange-50 border-orange-200 text-orange-800",
        iconColor: "text-orange-600",
      },
    ],
  },
  {
    title: "Luxury Purchases",
    description: "Save for premium items and experiences",
    goals: [
      {
        name: "Buy Dream Car",
        icon: Car,
        href: "/calculators/goals/dream-car",
        description: "Save for your dream vehicle",
        color: "bg-indigo-50 border-indigo-200 text-indigo-800",
        iconColor: "text-indigo-600",
      },
      {
        name: "Buy Luxury Watch",
        icon: Watch,
        href: "/calculators/goals/luxury-watch",
        description: "Save for that premium timepiece",
        color: "bg-yellow-50 border-yellow-200 text-yellow-800",
        iconColor: "text-yellow-600",
      },
      {
        name: "Buy Luxury Bag",
        icon: ShoppingBag,
        href: "/calculators/goals/luxury-bag",
        description: "Save for designer accessories",
        color: "bg-rose-50 border-rose-200 text-rose-800",
        iconColor: "text-rose-600",
      },
    ],
  },
  {
    title: "Custom Goals",
    description: "Create your own personalized financial goals",
    goals: [
      {
        name: "Custom Goal",
        icon: Settings,
        href: "/calculators/goals/custom-goal",
        description: "Set and plan for any financial goal",
        color: "bg-gray-50 border-gray-200 text-gray-800",
        iconColor: "text-gray-600",
      },
    ],
  },
]

const featuredGoals = [
  {
    title: "Most Popular",
    goal: "Emergency Fund",
    description: "6-12 months of expenses",
    icon: Target,
    href: "/calculators/goals/emergency-fund",
  },
  {
    title: "Long Term",
    goal: "Retire Early",
    description: "Financial independence",
    icon: PiggyBank,
    href: "/calculators/goals/retire-early",
  },
  {
    title: "Big Purchase",
    goal: "Dream House",
    description: "Home down payment",
    icon: Home,
    href: "/calculators/goals/dream-house",
  },
]

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Target className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Choose Your Goals</h1>
            </div>
            <p className="text-xl text-gray-600 mt-4">
              Set financial goals and create a roadmap to achieve them with our goal-based calculators
            </p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation href="/calculators" label="Back to Calculators" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Goals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGoals.map((featured, index) => (
              <Link key={index} href={featured.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                  <CardHeader className="text-center">
                    <featured.icon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-blue-600 font-medium">{featured.title}</div>
                    <CardTitle className="text-xl text-gray-900">{featured.goal}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">{featured.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Goal Categories */}
        <div className="space-y-12">
          {goalCategories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600 mt-2">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.goals.map((goal, goalIndex) => (
                  <Link key={goalIndex} href={goal.href}>
                    <Card
                      className={`hover:shadow-lg transition-all duration-200 cursor-pointer h-full ${goal.color} border-2 hover:scale-105`}
                    >
                      <CardHeader className="text-center">
                        <goal.icon className={`h-10 w-10 mx-auto mb-3 ${goal.iconColor}`} />
                        <CardTitle className="text-lg">{goal.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm opacity-80">{goal.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* How It Works */}
        <section className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Goal-Based Planning Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Goal</h3>
              <p className="text-sm text-gray-600">Select from our predefined goals or create a custom one</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Set Parameters</h3>
              <p className="text-sm text-gray-600">Enter goal amount, timeline, and expected returns</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Your Plan</h3>
              <p className="text-sm text-gray-600">Receive monthly investment amount and strategy</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-lg">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your progress and adjust as needed</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Goal-Based Planning?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Clear Direction</h3>
              <p className="text-sm text-gray-600">
                Having specific goals gives your investments purpose and direction
              </p>
            </div>

            <div className="text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Better Discipline</h3>
              <p className="text-sm text-gray-600">
                Goal-based investing helps maintain discipline during market volatility
              </p>
            </div>

            <div className="text-center">
              <PiggyBank className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Optimal Allocation</h3>
              <p className="text-sm text-gray-600">
                Different goals require different investment strategies and time horizons
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
