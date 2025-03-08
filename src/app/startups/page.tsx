"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, UserPlus, Briefcase, Handshake } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StartupTutorialSection = () => {
  const router = useRouter();
  return (
    <>
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-gray-100 border-gray-300 text-gray-800">
              Startup Guide
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How to Attract Investors
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Showcase your startup and secure funding in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines (only visible on md and up) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

            {[
              {
                title: "Create Your Profile",
                desc: "Register your startup and provide essential details like your business model, domain, and funding needs.",
                icon: <UserPlus size={32} />,
                step: 1,
              },
              {
                title: "Showcase Your Business",
                desc: "Upload your pitch deck, financials, and social proof to highlight your startup's potential.",
                icon: <Briefcase size={32} />,
                step: 2,
              },
              {
                title: "Connect with Investors",
                desc: "Get matched with investors who align with your vision and funding requirements.",
                icon: <Handshake size={32} />,
                step: 3,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 group hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white hover:scale-105"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <Badge variant="outline" className="bg-gray-100 border-gray-300 text-gray-800">
                      Step {item.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/startups/liveFunding">
              <Button
                className="group bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105"
                onClick={() => {
                  router.push('/startups/liveFunding');
                }}
              >
                LiveFunding
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartupTutorialSection;