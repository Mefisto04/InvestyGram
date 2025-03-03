import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export interface IBid extends Document {
    startupId: mongoose.Types.ObjectId;
    investorId: mongoose.Types.ObjectId;
    amount: number;
    equity: number;
    royalty: number;
    conditions: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
}

const BidSchema = new Schema<IBid>(
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

export const Bid = mongoose.model<IBid>("Bid", BidSchema);

// Zod Validation
export const BidValidation = z.object({
    startupId: z.string(),
    investorId: z.string(),
    amount: z.number().min(0),
    equity: z.number().min(0).max(100),
    royalty: z.number().min(0).max(100),
    conditions: z.string().min(5),
    status: z.enum(["pending", "accepted", "rejected"]),
});
