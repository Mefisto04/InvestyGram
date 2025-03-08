"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { MatchMeter } from "@/components/MatchMeter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MatchScores {
  visionAlignment: { score: number; reason: string };
  domainMatch: { score: number; reason: string };
  growthPotential: { score: number; reason: string };
}

interface StartupData {
  startupId: string;
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
  name: string;
  tagline: string;
  fundingInfo: {
    amountRaised: number;
    targetAmount: number;
    currentRound: string;
  };
  socialProof: {
    instagramFollowers: number;
  };
  investorPrefs: {
    minInvestment: number;
    preferredIndustries: string[];
  };
  matchScores?: MatchScores;
}


const gradientClasses = [
  "bg-gradient-to-br from-primary/90 to-purple-200",
  "bg-gradient-to-br from-primary/90 to-purple-200",
  "bg-gradient-to-br from-primary/90 to-purple-200",
  "bg-gradient-to-br from-primary/90 to-purple-200",
];

export function StartupsReel() {
  const router = useRouter();
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPitchVideo, setShowPitchVideo] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const investorId = localStorage.getItem("InvestorId");
        if (!investorId) throw new Error("Investor not logged in");

        const startupsRes = await fetch("/api/startups");
        const startupsData = await startupsRes.json();
        if (!startupsData.success || !startupsData.data?.length) {
          throw new Error("Failed to fetch startups");
        }

        const startupIds = startupsData.data.map(
          (s: StartupData) => s.startupId
        );

        const scoresRes = await fetch("/api/match-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ investorId, startupIds }),
        });

        const scoresData = await scoresRes.json();
        if (!scoresData.success) {
          throw new Error("Failed to fetch match scores");
        }

        const mergedData = startupsData.data.map((startup: StartupData) => ({
          ...startup,
          matchScores: scoresData.data.find(
            (s: any) => s.startupId === startup.startupId
          )?.matchScores,
        }));

        setStartups(mergedData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll bg-gradient-to-br from-primary/90 to-purple-600">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-screen w-screen snap-start snap-always p-4">
            <Skeleton className="h-full w-full rounded-xl bg-black/20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-gradient-to-br from-primary/90 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {startups.map((startup, index) => (
        <section key={index} className="h-full w-xl snap-start snap-always p-4">
          <Card
            className={`h-full w-full overflow-hidden relative ${gradientClasses[index % gradientClasses.length]
              } border-2 border-white/20 group hover:border-white/40 bg-black/30 hover:bg-black/40 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/50 transition-all duration-500 backdrop-blur-lg`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl text-white drop-shadow-md">
                {startup.name}
              </CardTitle>
              <CardDescription className="text-lg text-white/80">
                {startup.tagline}
              </CardDescription>
            </CardHeader>

            <CardContent className="h-[60vh] flex flex-col gap-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {showPitchVideo[startup.startupId] ? (
                    startup.pitchVideo?.url ? (
                      <div className="relative w-full h-full">
                        <video
                          src={startup.pitchVideo.url}
                          controls
                          autoPlay
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                          Pitch Video
                        </div>
                        <button
                          onClick={() => setShowPitchVideo(prev => ({
                            ...prev,
                            [startup.startupId]: false
                          }))}
                          className="absolute bottom-2 right-2 bg-primary text-white px-3 py-2 rounded-lg shadow-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
                          aria-label="Show company info"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                          <span>Company Info</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200">
                        <p className="text-gray-500">No pitch video available</p>
                        <button
                          onClick={() => setShowPitchVideo(prev => ({
                            ...prev,
                            [startup.startupId]: false
                          }))}
                          className="absolute bottom-2 right-2 bg-primary text-white px-3 py-2 rounded-lg shadow-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
                          aria-label="Show company info"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                          <span>Company Info</span>
                        </button>
                      </div>
                    )
                  ) : (
                    <>
                      {startup.companyImage?.url ? (
                        <img
                          src={startup.companyImage.url}
                          alt={startup.name}
                          className="object-cover w-full h-full"
                        />
                      ) : null}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                        <div className="flex justify-between text-white text-sm">
                          <span>🏷️ {startup.fundingInfo.currentRound}</span>
                          <span>
                            📸{" "}
                            {startup.socialProof.instagramFollowers.toLocaleString()}{" "}
                            followers
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPitchVideo(prev => ({
                          ...prev,
                          [startup.startupId]: true
                        }))}
                        className="absolute bottom-2 right-2 bg-primary text-white px-3 py-2 rounded-lg shadow-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
                        aria-label="Show pitch video"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <span>Watch Pitch</span>
                      </button>
                    </>
                  )}
                </motion.div>
              </div>

              <div className="space-y-2 flex-grow">
                <div className="space-y-1">
                  <div className="flex justify-between font-medium text-white">
                    <span>Raised</span>
                    <span>Target</span>
                  </div>
                  <Progress
                    value={
                      (startup.fundingInfo.amountRaised /
                        startup.fundingInfo.targetAmount) *
                      100
                    }
                    className="h-3 bg-white/20"
                  />
                  <div className="flex justify-between text-sm text-white/80">
                    <span>
                      ${startup.fundingInfo.amountRaised.toLocaleString()}
                    </span>
                    <span>
                      ${startup.fundingInfo.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-black/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">Minimum Investment</h3>
                      <p className="text-2xl font-bold text-primary">
                        ${startup.investorPrefs.minInvestment.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold text-white">Preferred Industries</h3>
                      <p className="text-sm text-white/80">
                        {startup.investorPrefs.preferredIndustries.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {startup.matchScores && (
                  <>
                    <MatchMeter
                      value={startup.matchScores.visionAlignment.score * 10}
                      label="Vision Match"
                    />
                    <MatchMeter
                      value={startup.matchScores.domainMatch.score * 10}
                      label="Domain Match"
                    />
                    <MatchMeter
                      value={startup.matchScores.growthPotential.score * 10}
                      label="Growth Potential"
                    />
                  </>
                )}
              </div>
              {startup.matchScores && (
                <div className="text-sm text-white/80 space-y-2">
                  <p>💡 {startup.matchScores.visionAlignment.reason}</p>
                  <p>🎯 {startup.matchScores.domainMatch.reason}</p>
                  <p>📈 {startup.matchScores.growthPotential.reason}</p>
                </div>
              )}
              <div className="text-center">
                <Button 
                  className="group bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 backdrop-blur-sm"
                  onClick={() => {
                    router.push(`/investor/discover/${startup.startupId}`);
                  }}
                >
                  <span className="relative z-10">View Detailed Report</span>
                </Button>
              </div>
            </CardContent>

            <CardFooter className="absolute bottom-0 w-full bg-black/80 border-t border-white/20">
              <div className="w-full flex justify-center items-center py-2 text-sm text-white/80">
                {showPitchVideo[startup.startupId] ? (
                  <span>Viewing pitch video</span>
                ) : (
                  <span>Click "Watch Pitch" to see the startup's pitch video</span>
                )}
              </div>
            </CardFooter>
          </Card>
        </section>
      ))}
    </motion.div>
  );
}