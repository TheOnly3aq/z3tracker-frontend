import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check if we're in build mode or if database is not available
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      console.warn("Database URL not available during build");
      return NextResponse.json([]);
    }

    // Fetch all active photos ordered by the 'order' field
    const photos = await prisma.photo.findMany({
      where: {
        active: true,
      },
      orderBy: {
        order: "asc",
      },
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

    // During build time, return empty array instead of error
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json([]);
    }

    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
