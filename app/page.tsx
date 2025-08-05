import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/ui/search-bar"
import {
  Calculator,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Target,
  Home,
  Plane,
  Settings,
  ArrowRight,
  Shield,
  Users,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react"

const calculators = [
  {
    name: "SIP Calculator",
    href: "/calculators/sip",
    icon: TrendingUp,
    description: "Calculate your SIP returns",
    category: "Investment",
  },
  {
    name: "EMI Calculator",
    href: "/calculators/emi",
    icon: CreditCard,
    description: "Calculate loan EMI",
    category: "Loan",
  },
  {
    name: "Lumpsum Calculator",
    href: "/calculators/lumpsum",
    icon: PiggyBank,
    description: "Calculate lumpsum returns",
    category: "Investment",
  },
  {
    name: "SWP Calculator",
    href: "/calculators/swp",
    icon: TrendingUp,
    description: "Systematic withdrawal plan",
    category: "Investment",
  },
  {
    name: "PPP Calculator",
    href: "/calculators/ppp",
    icon: Calculator,
    description: "Purchasing power parity",
    category: "Currency",
  },
]

const goalCalculators = [
  {
    name: "Retire Early",
    href: "/calculators/goals/retire-early",
    icon: PiggyBank,
    description: "Plan for early retirement",
    color: "bg-green-50 border-green-200 text-green-800",
    iconColor: "text-green-600",
  },
  {
    name: "Emergency Fund",
    href: "/calculators/goals/emergency-fund",
    icon: Target,
    description: "Build your safety net",
    color: "bg-red-50 border-red-200 text-red-800",
    iconColor: "text-red-600",
  },
  {
    name: "Dream House",
    href: "/calculators/goals/dream-house",
    icon: Home,
    description: "Save for your home",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    iconColor: "text-blue-600",
  },
  {
    name: "Travel Goal",
    href: "/calculators/goals/travel-goal",
    icon: Plane,
    description: "Plan your dream trip",
    color: "bg-cyan-50 border-cyan-200 text-cyan-800",
    iconColor: "text-cyan-600",
  },
  {
    name: "Custom Goal",
    href: "/calculators/goals/custom-goal",
    icon: Settings,
    description: "Set any financial goal",
    color: "bg-gray-50 border-gray-200 text-gray-800",
    iconColor: "text-gray-600",
  },
]

const features = [
  {
    icon: Calculator,
    title: "35+ Calculators",
    description: "Comprehensive suite of financial calculators for all your needs",
  },
  {
    icon: Shield,
    title: "100% Free",
    description: "All calculators are completely free with no hidden charges",
  },
  {
    icon: TrendingUp,
    title: "Accurate Results",
    description: "Industry-standard formulas ensure precise calculations",
  },
  {
    icon: Users,
    title: "User Friendly",
    description: "Simple interface designed for everyone to use easily",
  },
]

const stats = [
  { number: "35+", label: "Calculators" },
  { number: "100K+", label: "Users" },
  { number: "1M+", label: "Calculations" },
  { number: "99.9%", label: "Accuracy" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">FinCalc Hub</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                  Calculators
                  <ArrowRight className="h-4 w-4 ml-1 transform group-hover:rotate-90 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      href="/calculators"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      All Calculators
                    </Link>
                    <Link
                      href="/calculators/sip"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      SIP Calculator
                    </Link>
                    <Link
                      href="/calculators/emi"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      EMI Calculator
                    </Link>
                    <Link
                      href="/calculators/goals"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      Goal Planning
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <SearchBar calculators={calculators} />
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Smart Financial
                <span className="text-blue-600"> Calculators</span>
                <br />
                for Better Decisions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Make informed financial decisions with our comprehensive suite of calculators. From SIP to EMI, plan
                your financial future with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/calculators">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Calculators
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/calculators/sip">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                    Try SIP Calculator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-illustration.png"
                alt="Woman analyzing financial charts and data on tablet with pie charts and growth graphs"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FinCalc Hub?</h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands for accurate financial calculations and planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Calculators</h2>
            <p className="text-xl text-gray-600">Most used financial calculators by our users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.slice(0, 6).map((calc, index) => (
              <Link key={index} href={calc.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <calc.icon className="h-8 w-8 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{calc.name}</CardTitle>
                        <p className="text-sm text-gray-500">{calc.category}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{calc.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/calculators">
              <Button size="lg" variant="outline">
                View All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Goal-Based Financial Planning */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Target className="h-12 w-12 text-green-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">Goal-Based Financial Planning</h2>
            </div>
            <p className="text-xl text-gray-600">Set specific financial goals and create a roadmap to achieve them</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {goalCalculators.map((goal, index) => (
              <Link key={index} href={goal.href}>
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

          <div className="text-center mt-12">
            <Link href="/calculators/goals">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Explore All Goals
                <Target className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Plan Your Financial Future?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start using our calculators today and make informed financial decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators">
              <Button size="lg" variant="secondary">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Calculator className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">FinCalc Hub</span>
              </div>
              <p className="text-gray-300 mb-6">
                Your trusted partner for financial calculations and planning. Make informed decisions with our
                comprehensive suite of calculators.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Youtube className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Calculators */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Calculators</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/calculators/sip" className="text-gray-300 hover:text-white transition-colors">
                    SIP Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/emi" className="text-gray-300 hover:text-white transition-colors">
                    EMI Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/lumpsum" className="text-gray-300 hover:text-white transition-colors">
                    Lumpsum Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/swp" className="text-gray-300 hover:text-white transition-colors">
                    SWP Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/goals" className="text-gray-300 hover:text-white transition-colors">
                    Goal Planning
                  </Link>
                </li>
                <li>
                  <Link href="/calculators" className="text-gray-300 hover:text-white transition-colors">
                    All Calculators
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to get the latest financial tips, new calculators, and market insights delivered to your
                inbox.
              </p>
              <Link href="/subscribe">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Subscribe Now
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 FinCalc Hub. All rights reserved. Built with ❤️ for better financial planning.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>support@fincalchub.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+91 8639599468</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
