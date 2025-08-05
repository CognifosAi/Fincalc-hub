"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackNavigation } from "@/components/ui/back-navigation"
import { Mail, CheckCircle, TrendingUp, Calculator, Target, Bell } from "lucide-react"

export default function SubscribePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: [],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const interestOptions = [
    { id: "investment", label: "Investment Planning & SIP Calculators" },
    { id: "loans", label: "Loan & EMI Calculators" },
    { id: "tax", label: "Tax Planning & Government Schemes" },
    { id: "goals", label: "Goal-Based Financial Planning" },
    { id: "market", label: "Market Updates & Financial Tips" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInterestChange = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscription data:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">Successfully Subscribed!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Thank you for subscribing to FinCalc Hub updates. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Button onClick={() => (window.location.href = "/")} className="w-full">
                Back to Home
              </Button>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                Subscribe Another Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Stay Updated</h1>
            </div>
            <p className="text-xl text-gray-600 mt-4">
              Subscribe to get the latest financial tips, new calculators, and market insights
            </p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation href="/" label="Back to Home" />
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Subscription Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Subscribe to Our Newsletter</CardTitle>
              <p className="text-gray-600">
                Join thousands of users who trust FinCalc Hub for their financial planning needs
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">What interests you most? (Optional)</Label>
                  <p className="text-sm text-gray-500 mb-3">Select topics you'd like to receive updates about</p>
                  <div className="space-y-3">
                    {interestOptions.map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(option.id)}
                          onChange={() => handleInterestChange(option.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Subscribe Now
                  <Bell className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By subscribing, you agree to our{" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </a>
                  . You can unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Market Insights</h3>
                    <p className="text-sm text-gray-600">
                      Weekly market updates, investment tips, and financial planning strategies from our experts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Calculator className="h-8 w-8 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">New Calculators</h3>
                    <p className="text-sm text-gray-600">
                      Be the first to know about new calculators and features added to our platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Target className="h-8 w-8 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Exclusive Content</h3>
                    <p className="text-sm text-gray-600">
                      Subscriber-only financial guides, templates, and planning resources.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Join 50,000+ Subscribers</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Trusted by financial planners, investors, and individuals across India
                  </p>
                  <div className="flex justify-center space-x-8 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">50K+</div>
                      <div className="text-gray-600">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">4.8★</div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Weekly</div>
                      <div className="text-gray-600">Updates</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
