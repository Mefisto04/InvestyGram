// import mongoose from "mongoose";
// import { IStartup } from "./Startup";
// import { IInvestor } from "./Investor";
// import { IFunding } from "./Funding";
// import { IBid } from "./Bid";
// import { IUser } from "./User";

// const StartupSchema = new mongoose.Schema<IStartup>(
//     {
//         startupId: { type: String, required: true, unique: true },
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         confirmPassword: { type: String, required: true },
//         domain: { type: String, required: true },
//         capital: { type: Number, required: true },
//         tagline: { type: String, required: true },
//         companyImage: { type: String },
//         pitchVideo: { type: String },
//         socialProof: {
//             instagramFollowers: { type: Number, default: 0 }
//         },
//         fundingInfo: {
//             currentRound: { type: String, required: true },
//             amountRaised: { type: Number, default: 0 },
//             targetAmount: { type: Number, required: true }
//         },
//         investorPrefs: {
//             minInvestment: { type: Number, required: true },
//             maxInvestment: { type: Number, required: true },
//             preferredIndustries: [{ type: String }],
//             preferredStages: [{ type: String }]
//         },
//         createdAt: { type: Date, default: Date.now },
//         isVerified: { type: Boolean, default: false }
//     },
//     { timestamps: true }
// );

// const InvestorSchema = new mongoose.Schema<IInvestor>(
//     {
//         investorId: { type: String, required: true, unique: true },
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         confirmPassword: { type: String, required: true },
//         domain: { type: String, required: true },
//         capital: { type: Number, required: true },
//         pastFunding: [{
//             companyName: { type: String, required: true },
//             amount: { type: Number, required: true },
//             year: { type: Number, required: true }
//         }],
//         vision: { type: String, required: true },
//         expertise: [{ type: String, required: true }],
//         createdAt: { type: Date, default: Date.now },
//         isVerified: { type: Boolean, default: false }
//     },
//     { timestamps: true }
// );

// const FundingSchema = new mongoose.Schema<IFunding>(
//     {
//         startupId: { type: String, required: true, ref: 'Startup' },
//         investorId: { type: String, required: true, ref: 'Investor' },
//         amount: { type: Number, required: true },
//         equity: { type: Number, required: true },
//         royalty: { type: Number, required: true },
//         conditions: [{ type: String, required: true }],
//         createdAt: { type: Date, default: Date.now }
//     },
//     { timestamps: true }
// );

// const BidSchema = new mongoose.Schema<IBid>(
//     {
//         startupId: { type: String, required: true, ref: 'Startup' },
//         investorId: { type: String, required: true, ref: 'Investor' },
//         amount: { type: Number, required: true },
//         equity: { type: Number, required: true },
//         royalty: { type: Number, required: true },
//         conditions: [{ type: String, required: true }],
//         status: {
//             type: String,
//             enum: ['pending', 'accepted', 'rejected'],
//             default: 'pending'
//         },
//         createdAt: { type: Date, default: Date.now }
//     },
//     { timestamps: true }
// );

// const UserSchema = new mongoose.Schema<IUser>(
//     {
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         confirmPassword: { type: String, required: true },
//         createdAt: { type: Date, default: Date.now },
//     },
//     { timestamps: true }
// );

// // Check if models are already registered before creating them
// export const Startup = mongoose.models.Startup || mongoose.model<IStartup>("Startup", StartupSchema);
// export const Investor = mongoose.models.Investor || mongoose.model<IInvestor>("Investor", InvestorSchema);
// export const Funding = mongoose.models.Funding || mongoose.model<IFunding>("Funding", FundingSchema);
// export const Bid = mongoose.models.Bid || mongoose.model<IBid>("Bid", BidSchema);
// export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema); 


import mongoose from "mongoose";
import { IStartup } from "./Startup";
import { IInvestor } from "./Investor";
import { IFunding } from "./Funding";
import { IBid } from "./Bid";
import { IUser } from "./User";

// Import schemas from their respective files
import { StartupSchema } from "./Startup";
import { InvestorSchema } from "./Investor";
import { FundingSchema } from "./Funding";
import { BidSchema } from "./Bid";
import { UserSchema } from "./User";

// Helper function to prevent model overwrites
const createModel = <T extends mongoose.Document>(name: string, schema: mongoose.Schema<T>) => {
    return mongoose.models[name] || mongoose.model<T>(name, schema);
};

// Create and export all models
export const Startup = createModel<IStartup>("Startup", StartupSchema);
export const Investor = createModel<IInvestor>("Investor", InvestorSchema);
export const Funding = createModel<IFunding>("Funding", FundingSchema);
export const Bid = createModel<IBid>("Bid", BidSchema);
export const User = createModel<IUser>("User", UserSchema);