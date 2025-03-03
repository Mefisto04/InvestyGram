import { Document } from "mongoose";
import { z } from "zod";

export interface IStartup extends Document {
    startupId: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    domain: string;
    capital: number;
    tagline: string;
    companyImage: string;
    pitchVideo: string;
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
    createdAt: Date;
    isVerified: boolean;
}

// Zod Validation
export const StartupValidation = z.object({
    startupId: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    domain: z.string(),
    capital: z.number(),
    tagline: z.string(),
    companyImage: z.string().optional(),
    pitchVideo: z.string().optional(),
    socialProof: z.object({
        instagramFollowers: z.number()
    }),
    fundingInfo: z.object({
        currentRound: z.string(),
        amountRaised: z.number(),
        targetAmount: z.number()
    }),
    investorPrefs: z.object({
        minInvestment: z.number(),
        maxInvestment: z.number(),
        preferredIndustries: z.array(z.string()),
        preferredStages: z.array(z.string())
    }),
    isVerified: z.boolean()
});
