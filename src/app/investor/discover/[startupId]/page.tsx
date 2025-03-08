"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MatchMeter } from "@/components/MatchMeter";
import { Button } from "@/components/ui/button";

interface StartupDetails {
  startupId: string;
  name: string;
  email: string;
  domain: string;
  capital: number;
  tagline: string;
  companyImage: {
    url: string;
    fileType: string;
    originalName: string;
  };
  pitchVideo: {
    url: string;
    fileType: string;
    originalName: string;
  };
  socialProof: {
    instagramFollowers: number;
  };
  fundingInfo: {
    currentRound: string;
    amountRaised: number;
    targetAmount: number;
  };
  investorPrefs: {
    minInvestment: number;
    maxInvestment: number;
    preferredIndustries: string[];
    preferredStages: string[];
  };
  matchScores?: {
    visionAlignment: { score: number; reason: string };
    domainMatch: { score: number; reason: string };
    growthPotential: { score: number; reason: string };
  };
}

export default function StartupReport() {
  const router = useRouter();
  const params = useParams();
  const [startup, setStartup] = useState<StartupDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/startups/${params.startupId}`);
        const data = await response.json();

        if (data.success) {
          setStartup(data.data);
        } else {
          console.error("Failed to fetch startup details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching startup details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.startupId) {
      fetchStartupDetails();
    }
  }, [params.startupId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-500">Startup not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
            <CardDescription>{startup.tagline}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src={startup.companyImage.url}
                  alt={startup.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Domain</h3>
                  <p>{startup.domain}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Capital</h3>
                  <p>${startup.capital.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funding Information */}
        <Card>
          <CardHeader>
            <CardTitle>Funding Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Current Round</h3>
                  <p>{startup.fundingInfo.currentRound}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Amount Raised</h3>
                  <p>${startup.fundingInfo.amountRaised.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Target Amount</h3>
                  <p>${startup.fundingInfo.targetAmount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Progress</h3>
                  <p>
                    {Math.round(
                      (startup.fundingInfo.amountRaised /
                        startup.fundingInfo.targetAmount) *
                        100
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pitch Video */}
        <Card>
          <CardHeader>
            <CardTitle>Pitch Video</CardTitle>
          </CardHeader>
          <CardContent>
            {startup.pitchVideo?.url ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video
                  src={startup.pitchVideo.url}
                  controls
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">No pitch video available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Investment Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Investment Range</h3>
                <p>
                  ${startup.investorPrefs.minInvestment.toLocaleString()} -{" "}
                  ${startup.investorPrefs.maxInvestment.toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Preferred Industries</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {startup.investorPrefs.preferredIndustries.map((industry) => (
                    <span
                      key={industry}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Preferred Stages</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {startup.investorPrefs.preferredStages.map((stage) => (
                    <span
                      key={stage}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Scores */}
        {startup.matchScores && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Match Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <MatchMeter
                    value={startup.matchScores.visionAlignment.score * 10}
                    label="Vision Match"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {startup.matchScores.visionAlignment.reason}
                  </p>
                </div>
                <div>
                  <MatchMeter
                    value={startup.matchScores.domainMatch.score * 10}
                    label="Domain Match"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {startup.matchScores.domainMatch.reason}
                  </p>
                </div>
                <div>
                  <MatchMeter
                    value={startup.matchScores.growthPotential.score * 10}
                    label="Growth Potential"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {startup.matchScores.growthPotential.reason}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="w-[200px] text-lg font-semibold"
                onClick={() => {
                  // Feedback functionality to be implemented
                  console.log("Feedback clicked");
                }}
              >
                Give Feedback
              </Button>
              <Button 
                size="lg"
                className="w-[200px] text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                onClick={() => {
                  router.push(`/startup/${startup.startupId}/offer`);
                }}
              >
                Make an Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 