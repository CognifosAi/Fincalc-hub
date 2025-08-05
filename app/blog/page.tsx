import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

const blogPosts = [
  {
    id: 1,
    title: "How to Use SWP for Early Retirement",
    excerpt:
      "Systematic Withdrawal Plans can be a powerful tool for creating regular income during retirement. Learn how to optimize your SWP strategy.",
    author: "Financial Expert",
    date: "2025-01-15",
    category: "Retirement Planning",
    readTime: "5 min read",
    slug: "how-to-use-swp-for-early-retirement",
  },
  {
    id: 2,
    title: "SIP vs Lumpsum, Which is Better in 2025?",
    excerpt:
      "Compare the benefits of systematic investment plans versus lump sum investments in the current market scenario.",
    author: "Investment Advisor",
    date: "2025-01-10",
    category: "Investment Strategy",
    readTime: "7 min read",
    slug: "sip-vs-lumpsum-which-is-better-in-2025",
  },
  {
    id: 3,
    title: "Understanding Real vs Nominal Returns",
    excerpt:
      "Learn the crucial difference between nominal and real returns, and why inflation-adjusted calculations matter for your investments.",
    author: "Market Analyst",
    date: "2025-01-05",
    category: "Financial Education",
    readTime: "6 min read",
    slug: "understanding-real-vs-nominal-returns",
  },
  {
    id: 4,
    title: "Tax-Saving Investment Options for 2025",
    excerpt:
      "Explore the best tax-saving investment options under Section 80C and other provisions for the current financial year.",
    author: "Tax Consultant",
    date: "2024-12-28",
    category: "Tax Planning",
    readTime: "8 min read",
    slug: "tax-saving-investment-options-for-2025",
  },
  {
    id: 5,
    title: "EMI vs Prepayment: What's the Smart Choice?",
    excerpt: "Should you prepay your loan or invest the extra money? We break down the math to help you decide.",
    author: "Loan Advisor",
    date: "2024-12-20",
    category: "Loan Management",
    readTime: "5 min read",
    slug: "emi-vs-prepayment-whats-the-smart-choice",
  },
  {
    id: 6,
    title: "Building Your Emergency Fund: A Complete Guide",
    excerpt: "Learn how much you should save for emergencies and the best places to park your emergency fund.",
    author: "Financial Planner",
    date: "2024-12-15",
    category: "Financial Planning",
    readTime: "6 min read",
    slug: "building-your-emergency-fund-complete-guide",
  },
]

const categories = [
  "All",
  "Investment Strategy",
  "Retirement Planning",
  "Tax Planning",
  "Loan Management",
  "Financial Education",
  "Financial Planning",
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Financial Blog</h1>
            <p className="text-xl text-gray-600 mt-4">
              Expert insights, tips, and strategies for better financial planning
            </p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation />
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "secondary"}
                className="cursor-pointer hover:bg-blue-600 hover:text-white"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
