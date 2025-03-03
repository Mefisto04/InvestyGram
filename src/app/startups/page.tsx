"use client";

import GetInvestor from "@/components/GetInvestor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Send,
  CheckCircle2
} from "lucide-react";

export default function StartupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <GetInvestor/>
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Connect with Top Investors
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Showcase your startup to a network of successful investors. Get funding, mentorship, and grow your business.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            List Your Startup <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Active Funding Offers Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Active Funding Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Investment Offer {i}</CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>From Tech Ventures Capital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium text-green-600">$750,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Equity:</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-blue-600">Active</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Review Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Investors Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Active Investors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Investor {i}</CardTitle>
                      <CardDescription>VC Firm</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Portfolio:</span>
                      <span className="font-medium">25+ Startups</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Focus:</span>
                      <span className="font-medium">AI, SaaS</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Messages Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Messages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Investor {i}</CardTitle>
                      <CardDescription>2 hours ago</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "We're impressed with your pitch and would like to schedule a follow-up meeting to discuss potential investment opportunities."
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-blue-100">Total Investments</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Successful Fundings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our platform and connect with investors who can help grow your startup.
          </p>
          <Button size="lg" variant="secondary">
            Create Startup Profile
          </Button>
        </div>
      </section>
    </div>
  );
}


// bhai ka commit