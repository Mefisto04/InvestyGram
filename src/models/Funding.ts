import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export interface IFunding extends Document {
    startupId: mongoose.Types.ObjectId;
    investorId: mongoose.Types.ObjectId;
    amount: number;
    equity: number;
    royalty: number;
    conditions: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
}

const FundingSchema = new Schema<IFunding>(
    {
        startupId: { type: Schema.Types.ObjectId, ref: "Startup", required: true },
        investorId: { type: Schema.Types.ObjectId, ref: "Investor", required: true },
        amount: { type: Number, required: true },
        equity: { type: Number, required: true },
        royalty: { type: Number, required: true },
        conditions: { type: String, required: true },
        status: { type: String, enum: ["pending", "accepted", "rejected"], required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Funding = mongoose.model<IFunding>("Funding", FundingSchema);

// Zod Validation
export const FundingValidation = z.object({
    startupId: z.string(),
    investorId: z.string(),
    amount: z.number().min(0),
    equity: z.number().min(0).max(100),
    royalty: z.number().min(0).max(100),
    conditions: z.string().min(5),
    status: z.enum(["pending", "accepted", "rejected"]),
});
