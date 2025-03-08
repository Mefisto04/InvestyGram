"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footer"
import {
  UploadCloud,
  Share2,
  Download,
  Shield,
  Cloud,
  Zap,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Clock,
  BarChart,
  Star,
  Briefcase,
  UserPlus,
  DollarSign,
  FileText,
  Instagram,
  Handshake,
  Settings,
  Search,
  MessageCircle,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChatBot from "@/components/ChatBot"

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
  
      

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-br from-primary/90 to-purple-600 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-6">
              <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                Where Startups Meet Investors
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                From Pitch <span className="text-white">to Partnership,</span> Seamlessly
              </h1>

              <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto md:mx-0">
                From Ideas to Impact – Get Started Now.              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white/10 w-full sm:w-auto"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              <div className="text-sm opacity-80 pt-2">No credit card required • Free plan available</div>
            </div>

            <div className="hidden md:block relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/logo2.jpg"
                  width={800}
                  height={600}
                  alt="FileShare Dashboard"
                  className="rounded shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-xl">
                <div className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-green-300" />
                  <div>
                    <div className="font-medium">End-to-End Encrypted</div>
                    <div className="text-sm opacity-80">Your files are protected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Files Shared", value: "10M+" },
              { label: "Active Users", value: "500K+" },
              { label: "Countries", value: "150+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="startup-flow" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Startup Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works for Startups</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to register your startup and connect with investors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines (only visible on md and up) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -z-10 transform -translate-y-1/2"></div>

            {[
              {
                title: "Register Your Startup",
                desc: "Provide basic information about your startup, including area of interest, domain, and capital.",
                icon: <UserPlus size={32} />,
                step: 1,
              },
              {
                title: "Business & Product Info",
                desc: "Share details about your business model, product, and market.",
                icon: <Briefcase size={32} />,
                step: 2,
              },
              {
                title: "Financial & Funding Info",
                desc: "Provide financial details and funding requirements.",
                icon: <DollarSign size={32} />,
                step: 3,
              },
              {
                title: "Pitch & Supporting Docs",
                desc: "Upload your pitch deck and any supporting documents.",
                icon: <FileText size={32} />,
                step: 4,
              },
              {
                title: "Social Proof",
                desc: "Showcase your social media presence and followers.",
                icon: <Instagram size={32} />,
                step: 5,
              },
              {
                title: "Investor Preferences",
                desc: "Specify your preferred investors and investment terms.",
                icon: <Handshake size={32} />,
                step: 6,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-2 group hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>
                    <Badge variant="outline" className="bg-muted">
                      Step {item.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/startup-registration">
              <Button className="group">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <section id="investor-flow" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Investor Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works for Investors</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to find and invest in promising startups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines (only visible on md and up) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -z-10 transform -translate-y-1/2"></div>

            {[
              {
                title: "Set Preferences",
                desc: "Define your area of interest, domain, and capital investment range.",
                icon: <Settings size={32} />,
                step: 1,
              },
              {
                title: "Review Startups",
                desc: "Browse through startups that match your preferences.",
                icon: <Search size={32} />,
                step: 2,
              },
              {
                title: "Evaluate Pitch",
                desc: "Review the startup's pitch, past funding, and vision.",
                icon: <FileText size={32} />,
                step: 3,
              },
              {
                title: "Provide Feedback",
                desc: "Offer feedback and score the startup out of 100.",
                icon: <MessageCircle size={32} />,
                step: 4,
              },
              {
                title: "Make an Offer",
                desc: "Submit your investment offer based on your evaluation.",
                icon: <Handshake size={32} />,
                step: 5,
              },
              {
                title: "Track Investment",
                desc: "Monitor the progress and growth of your investment.",
                icon: <TrendingUp size={32} />,
                step: 6,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-2 group hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>
                    <Badge variant="outline" className="bg-muted">
                      Step {item.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/investor-registration">
              <Button className="group">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              FileShare combines security, ease of use, and powerful features to make file sharing simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Encryption",
                desc: "Your files are encrypted before they leave your device and can only be decrypted by recipients.",
                icon: <Shield className="h-10 w-10 text-primary" />,
              },
              {
                title: "Cloud Storage",
                desc: "Store your files securely in the cloud and access them from any device, anywhere.",
                icon: <Cloud className="h-10 w-10 text-primary" />,
              },
              {
                title: "Fast & Reliable",
                desc: "Enjoy high-speed uploads and downloads with our globally distributed network.",
                icon: <Zap className="h-10 w-10 text-primary" />,
              },
              {
                title: "Password Protection",
                desc: "Add an extra layer of security with password-protected links.",
                icon: <Shield className="h-10 w-10 text-primary" />,
              },
              {
                title: "Expiration Dates",
                desc: "Set links to expire after a certain time or number of downloads.",
                icon: <Clock className="h-10 w-10 text-primary" />,
              },
              {
                title: "File Analytics",
                desc: "Track who viewed and downloaded your files with detailed analytics.",
                icon: <BarChart className="h-10 w-10 text-primary" />,
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-md transition-all duration-300 overflow-hidden border bg-background"
              >
                <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-500 top-0 left-0"></div>
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Users Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who trust FileShare for their file sharing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Marketing Director",
                review:
                  "FileShare has transformed how our team shares assets with clients. The security features give us peace of mind, and the interface is intuitive.",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Sarah Smith",
                role: "Freelance Designer",
                review:
                  "As a freelancer, I need to share large design files daily. FileShare makes it simple and professional. The password protection is a game-changer!",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Michael Johnson",
                role: "IT Manager",
                review:
                  "The end-to-end encryption and detailed access logs meet our strict security requirements. FileShare is now our company standard for file sharing.",
                avatar: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border bg-muted/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground italic">"{testimonial.review}"</p>
                  <div className="mt-6 flex items-center">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Sharing?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust FileShare for secure, fast, and reliable file sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
              >
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">No credit card required • Free plan available • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <ChatBot />
    </div>
  )
}

export default LandingPage
