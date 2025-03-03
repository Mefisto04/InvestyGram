import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export interface IBid extends Document {
    startupId: string;
    investorId: string;
    amount: number;
    equity: number;
    royalty: number;
    conditions: string[];
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
}

const BidSchema = new Schema<IBid>(
    {
        startupId: { type: String, required: true, ref: 'Startup' },
        investorId: { type: String, required: true, ref: 'Investor' },
        amount: { type: Number, required: true },
        equity: { type: Number, required: true },
        royalty: { type: Number, required: true },
        conditions: [{ type: String, required: true }],
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const Bid = mongoose.model<IBid>("Bid", BidSchema);

// Zod Validation
export const BidValidation = z.object({
    startupId: z.string(),
    investorId: z.string(),
    amount: z.number(),
    equity: z.number(),
    royalty: z.number(),
    conditions: z.array(z.string()),
    status: z.enum(['pending', 'accepted', 'rejected'])
});
