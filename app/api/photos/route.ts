import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const website = searchParams.get("website");

    const whereClause: {
      active: boolean;
      website?: "LexusTracker" | "Z3Radar";
    } = {
      active: true,
    };

    if (website && (website === "LexusTracker" || website === "Z3Radar")) {
      whereClause.website = website as "LexusTracker" | "Z3Radar";
    }

    const photos = await prisma.photo.findMany({
      where: whereClause,
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        order: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);

    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
