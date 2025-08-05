import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database } from "lucide-react"
import { BackNavigation } from "@/components/ui/back-navigation"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-xl text-gray-600 mt-4">Your privacy is our priority. Learn how we protect your data.</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 1, 2025</p>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackNavigation />
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Privacy Highlights */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No Data Collection</h3>
                <p className="text-sm text-gray-600">All calculations are performed locally in your browser</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No Tracking</h3>
                <p className="text-sm text-gray-600">We don't track your financial calculations or personal data</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Lock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Secure Connection</h3>
                <p className="text-sm text-gray-600">All communications are encrypted with SSL/TLS</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Database className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No Storage</h3>
                <p className="text-sm text-gray-600">Your financial data is never stored on our servers</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Privacy Policy */}
        <div className="prose max-w-none">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Personal Information</h4>
              <p className="text-gray-600">
                We only collect personal information when you voluntarily provide it to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Contact us through our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Create an account (optional)</li>
              </ul>

              <h4 className="font-semibold">Calculator Data</h4>
              <p className="text-gray-600">
                <strong>Important:</strong> All financial calculations are performed entirely in your browser. We do not
                collect, store, or transmit any of the financial data you enter into our calculators.
              </p>

              <h4 className="font-semibold">Technical Information</h4>
              <p className="text-gray-600">We may collect basic technical information such as:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>IP address (for security purposes)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited (anonymized)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you newsletters and updates (only if you subscribe)</li>
                <li>Improve our website and services</li>
                <li>Ensure the security and proper functioning of our website</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>SSL/TLS encryption for all data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure hosting infrastructure</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">We use minimal cookies for essential website functionality:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>
                  <strong>Essential cookies:</strong> Required for basic website functionality
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how visitors use our site (anonymized)
                </li>
                <li>
                  <strong>Preference cookies:</strong> Remember your settings and preferences
                </li>
              </ul>
              <p className="text-gray-600">You can control cookie settings through your browser preferences.</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">We may use third-party services for:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Website analytics (Google Analytics with anonymized data)</li>
                <li>Email newsletters (if you subscribe)</li>
                <li>Website hosting and security</li>
              </ul>
              <p className="text-gray-600">
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Correct any inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Unsubscribe from our communications at any time</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Email:</strong> privacy@fincalchub.com
                  <br />
                  <strong>Address:</strong> 123 Financial District, Mumbai, Maharashtra 400001, India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
