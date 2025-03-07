import { NextResponse } from 'next/server';
import { Startup } from '@/models';

export async function GET() {
    try {
        const startups = await Startup.find({ isVerified: false })
            .select('-password -confirmPassword')
            .lean();

        return NextResponse.json({ success: true, data: startups });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}