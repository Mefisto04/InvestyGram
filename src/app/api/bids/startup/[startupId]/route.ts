import { NextResponse } from "next/server";
import { connectDB } from "@/models/db";
import { Bid } from "@/models";

export async function GET(
  request: Request,
  { params }: { params: { startupId: string } }
) {
  try {
    await connectDB();
    const startupId = params.startupId;

    // Find all bids for this startup
    const bids = await Bid.find({ startupId }).sort({ createdAt: -1 });

    return NextResponse.json({ bids }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bids:", error);
    return NextResponse.json(
      { error: "Failed to fetch bids" },
      { status: 500 }
    );
  }
} 