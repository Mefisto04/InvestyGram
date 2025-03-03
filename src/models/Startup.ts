import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

export interface IStartup extends Document {
    name: string;
    description: string;
    industry: string;
    founderId: mongoose.Types.ObjectId;
    valuation: number;
    stage: "idea" | "MVP" | "growth" | "scaling";
    createdAt: Date;
}

const StartupSchema = new Schema<IStartup>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        industry: { type: String, required: true },
        founderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        valuation: { type: Number, required: true },
        stage: { type: String, enum: ["idea", "MVP", "growth", "scaling"], required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Startup = mongoose.model<IStartup>("Startup", StartupSchema);

// Zod Validation
export const StartupValidation = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    industry: z.string().min(2),
    founderId: z.string(),
    valuation: z.number().min(0),
    stage: z.enum(["idea", "MVP", "growth", "scaling"]),
});
