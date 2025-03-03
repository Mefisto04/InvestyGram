"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Handshake, LineChart, Search } from "lucide-react";
import GetInvestor from "@/components/GetInvestor"

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      {/* //<GetInvestor/> */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Connect with Promising Startups
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and invest in the next generation of innovative startups. Join our network of successful investors.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Investing <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Featured Startups Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Startups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Tech Startup {i}</CardTitle>
                <CardDescription>AI & Machine Learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Revolutionary AI solution for enterprise automation.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Funding Round:</span>
                      <span className="font-medium">Seed</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Investment Range:</span>
                      <span className="font-medium text-blue-600">$500K - $1M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Team Size:</span>
                      <span className="font-medium">5-10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">San Francisco, CA</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Watch Pitch <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Startups</h3>
              <p className="text-gray-600">Explore our curated list of promising startups</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Connect with startups that match your investment criteria</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Invest</h3>
              <p className="text-gray-600">Make informed investment decisions with our platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-6 w-6 mr-2 text-blue-600" />
                Verified Startups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All startups are thoroughly vetted and verified before being listed on our platform.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-6 w-6 mr-2 text-blue-600" />
                Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access detailed market analysis and growth projections for each startup.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our network of successful investors and discover the next big opportunity.
          </p>
          <Button size="lg" variant="secondary">
            Create Account
          </Button>
        </div>
      </section>
    </div>
  );
}