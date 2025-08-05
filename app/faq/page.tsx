"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "Are all calculators free to use?",
        answer:
          "Yes, all our financial calculators are completely free to use. We believe financial planning tools should be accessible to everyone.",
      },
      {
        question: "Do I need to create an account to use the calculators?",
        answer:
          "No, you can use all our calculators without creating an account. Account creation is optional and only needed if you want to save your calculations or receive updates.",
      },
      {
        question: "How accurate are the calculations?",
        answer:
          "Our calculators use industry-standard formulas and are regularly verified by certified financial experts. However, results should be used for planning purposes and may vary based on actual market conditions.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Is my financial data safe?",
        answer:
          "Yes, all calculations are performed locally in your browser. We don't collect, store, or transmit any of your financial data to our servers.",
      },
      {
        question: "Do you track my calculations?",
        answer:
          "No, we don't track or store any of your calculation inputs or results. Your privacy is our top priority.",
      },
      {
        question: "What cookies do you use?",
        answer:
          "We use minimal essential cookies for website functionality and anonymized analytics. No personal or financial data is stored in cookies.",
      },
    ],
  },
  {
    category: "Calculations",
    questions: [
      {
        question: "What is inflation adjustment and why is it important?",
        answer:
          "Inflation adjustment shows the real purchasing power of your money in the future. It's important because ₹100 today won't have the same buying power in 10 years due to inflation.",
      },
      {
        question: "How do you calculate SIP returns?",
        answer:
          "We use the standard SIP formula: M × [((1 + r)^n - 1) / r] × (1 + r), where M is monthly investment, r is monthly return rate, and n is number of months.",
      },
      {
        question: "What's the difference between flat and reducing interest rates?",
        answer:
          "Flat rate calculates interest on the original loan amount throughout the tenure. Reducing rate calculates interest on the outstanding balance, which decreases with each payment.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "The calculator is not working properly. What should I do?",
        answer:
          "Try refreshing the page or clearing your browser cache. If the issue persists, please contact our support team with details about your browser and the specific problem.",
      },
      {
        question: "Can I use the calculators on mobile devices?",
        answer:
          "Yes, all our calculators are fully responsive and work perfectly on mobile devices, tablets, and desktops.",
      },
      {
        question: "Which browsers are supported?",
        answer:
          "Our calculators work on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.",
      },
    ],
  },
  {
    category: "Financial Advice",
    questions: [
      {
        question: "Do you provide personalized financial advice?",
        answer:
          "We provide educational tools and general information. For personalized financial advice, we recommend consulting with a certified financial advisor.",
      },
      {
        question: "Should I invest in SIP or lump sum?",
        answer:
          "Both have their advantages. SIP helps with rupee cost averaging and disciplined investing, while lump sum can be better when markets are low. Use our calculators to compare scenarios.",
      },
      {
        question: "What should be my ideal emergency fund size?",
        answer:
          "Generally, 6-12 months of expenses is recommended. Use our emergency fund calculator to determine the right amount based on your specific situation.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(faqData.map((item) => item.category)))]

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqData
    .filter((category) => {
      if (selectedCategory !== "All" && category.category !== selectedCategory) {
        return false
      }

      if (searchTerm) {
        return category.questions.some(
          (q) =>
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      return true
    })
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          !searchTerm ||
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 mt-4">
              Find answers to common questions about our calculators and services
            </p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation />
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-blue-600 hover:text-white"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {selectedCategory === "All" && (
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
              )}

              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <Card key={faqIndex}>
                      <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleItem(itemId)}>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium text-gray-900">{faq.question}</CardTitle>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>

                      {isOpen && (
                        <CardContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
            <p className="text-gray-400 mt-2">Try different keywords or browse all categories.</p>
          </div>
        )}

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Still have questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@fincalchub.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
