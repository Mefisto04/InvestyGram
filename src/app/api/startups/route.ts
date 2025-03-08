// import { NextResponse } from 'next/server';
// import { Startup } from '@/models';

// export async function GET() {
//     try {
//         const startups = await Startup.find({ isVerified: false })
//             .select('-password -confirmPassword')
//             .lean();

//         console.log(startups)

//         return NextResponse.json({ success: true, data: startups });
//     } catch (error: any) {
//         return NextResponse.json(
//             { success: false, error: error.message },
//             { status: 500 }
//         );
//     }
// }

// app/api/startups/route.ts
import { NextResponse } from 'next/server';
import { Startup } from '@/models';

export async function GET() {
    try {
        // Get all verified startups and return just their IDs
        const startups = await Startup.find({ isVerified: false })
            .select('-password -confirmPassword')
            .lean();

        // Extract just the ID strings
        const startupIds = startups.map(s => s.startupId.toString());
        console.log(startupIds);

        return NextResponse.json({
            success: true,
            data: startups,
            dataId: startupIds
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}