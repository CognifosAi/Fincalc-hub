import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackNavigation } from "@/components/ui/back-navigation"
import {
  User,
  Target,
  Shield,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Heart,
  Lightbulb,
  Code,
  BarChart3,
  Briefcase,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">About FinCalc Hub</h1>
            <p className="text-xl text-gray-600 mt-4">Empowering financial decisions through intelligent calculators</p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize financial planning by providing free, accurate, and easy-to-use calculators that help
              individuals make informed financial decisions and achieve their goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Precise calculations with inflation adjustments and real-world scenarios to give you reliable results.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Simplicity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  User-friendly interfaces that make complex financial calculations accessible to everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Free Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our calculators are completely free, ensuring financial planning tools are available to all.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16 bg-white rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-lg leading-relaxed mb-6">
                FinCalc Hub was born from a simple observation: financial planning shouldn't be complicated or
                expensive. Too many people struggle with basic financial decisions because they lack access to proper
                tools and guidance.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founder recognized that while financial advisors and premium software exist, there was a gap in
                providing free, comprehensive, and easy-to-use financial calculators that anyone could access and
                understand.
              </p>
              <p className="text-lg leading-relaxed">
                Today, FinCalc Hub serves thousands of users monthly, helping them plan investments, calculate loans,
                set financial goals, and make informed decisions about their financial future.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate about making financial planning accessible to everyone</p>
          </div>

          <div className="flex justify-center">
            <Card className="max-w-md">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">G.V.SaiKrishna</CardTitle>
                <div className="flex justify-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Founder & CEO
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Visionary leader with expertise in financial planning, product development, and technology. Passionate
                  about democratizing financial tools and empowering individuals to make better financial decisions.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span>Financial Planning</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Code className="h-4 w-4 text-green-500" />
                    <span>Product Development</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span>Technology Leadership</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                    <span>Business Strategy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vision Quote */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <blockquote className="text-center">
              <p className="text-xl italic text-gray-700 mb-4">
                "Financial literacy shouldn't be a privilege. Our mission is to provide everyone with the tools they
                need to make informed financial decisions, regardless of their background or income level."
              </p>
              <footer className="text-gray-600">— G.V.SaiKrishna, Founder & CEO</footer>
            </blockquote>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">
                Clear calculations with detailed breakdowns so you understand every result.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                Financial tools should be available to everyone, regardless of their situation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Continuously improving our calculators with new features and insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                Committed to providing the most accurate and reliable financial calculations.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">Helping thousands make better financial decisions every month</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">35+</div>
              <div className="opacity-90">Calculators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="opacity-90">Monthly Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="opacity-90">Calculations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="opacity-90">Free Access</div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions, suggestions, or feedback? We'd love to hear from you.
          </p>
          <div className="space-x-4">
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View FAQ
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
