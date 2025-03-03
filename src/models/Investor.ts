import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export interface IInvestor extends Document {
    userId: mongoose.Types.ObjectId;
    firm: string;
    investmentFocus: string[];
    pastInvestments: string[];
    availableCapital: number;
    createdAt: Date;
}

const InvestorSchema = new Schema<IInvestor>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        firm: { type: String, required: true },
        investmentFocus: [{ type: String, required: true }],
        pastInvestments: [{ type: String, required: true }],
        availableCapital: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Investor = mongoose.model<IInvestor>("Investor", InvestorSchema);

// Zod Validation
export const InvestorValidation = z.object({
    userId: z.string(),
    firm: z.string().min(2),
    investmentFocus: z.array(z.string()),
    pastInvestments: z.array(z.string()),
    availableCapital: z.number().min(0),
});
