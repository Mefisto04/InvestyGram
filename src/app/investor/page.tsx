"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Search, FileText, CreditCard } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StartupsReel } from "@/components/StartupsReel";
import { useRouter } from "next/navigation";

const InvestorTutorialSection = () => {
  const router = useRouter();
  return (
    <>
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Investor Guide
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How to Invest in Startups
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and fund promising startups in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines (only visible on md and up) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -z-10 transform -translate-y-1/2"></div>

            {[
              {
                title: "Browse Startups",
                desc: "Explore startups based on your area of interest, domain expertise, and investment preferences.",
                icon: <Search size={32} />,
                step: 1,
              },
              {
                title: "Review Details",
                desc: "Watch pitch videos, check startup profiles, and evaluate growth metrics before making decisions.",
                icon: <FileText size={32} />,
                step: 2,
              },
              {
                title: "Make Investments",
                desc: "Fund promising startups with customizable investment terms and clearly defined conditions.",
                icon: <CreditCard size={32} />,
                step: 3,
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
            <Link href="/investor/discover">
              <Button className="group" onClick={() => {
                router.push('/investor/discover');
              }}>
                Start Investing Now
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default InvestorTutorialSection;
