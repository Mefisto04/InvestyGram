// app/api/match-score/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Startup } from '@/models'
import { Investor } from '@/models'
import mongoose from 'mongoose'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
    try {
        const { investorId, startupIds } = await req.json();

        // Convert string IDs to MongoDB ObjectIDs
        const objectIds = startupIds.map((id: string) => new mongoose.Types.ObjectId(id));

        // Fetch investor
        const investor = await Investor.findOne({ investorId: investorId.toString() });
        if (!investor) {
            return NextResponse.json({
                success: false,
                error: 'Investor not found'
            }, { status: 404 });
        }

        // Fetch startups using ObjectIDs
        const startups = await Startup.find({
            _id: { $in: objectIds }
        });
        if (startups.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No startups found'
            }, { status: 404 });
        }


        // Generate scores for all startups
        const scoresPromises = startups.map(async (startup) => {
            const prompt = `Analyze this investor-startup match:
        Investor Profile: [${JSON.stringify(investor)}]
        Startup Profile: [${JSON.stringify(startup)}]
        Calculate visionAlignment, domainMatch, and growthPotential scores (0-100).
        Return ONLY JSON: { visionAlignment: number, domainMatch: number, growthPotential: number }`;

            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
                const result = await model.generateContent(prompt)
                const response = await result.response
                const text = response.text()
                return JSON.parse(text.replace(/```json|```/g, ''))
            } catch (error) {
                console.error(`Error processing startup ${startup._id}:`, error)
                return null
            }
        })

        const scores = await Promise.all(scoresPromises)

        // Combine startups with their scores
        const results = startups.map((startup, index) => ({
            ...startup.toObject(),
            matchScores: scores[index]
        }))

        return NextResponse.json({ success: true, data: results })
    } catch (error) {
        console.error('Match scoring error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to calculate match scores' },
            { status: 500 }
        )
    }
}