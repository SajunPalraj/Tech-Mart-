import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const adminEmail = searchParams.get("adminEmail");

    if (adminEmail !== "sajunpalraj2004@gmail.com") {
      return NextResponse.json({ error: "Access Denied: Only admin can view site members." }, { status: 403 });
    }

    const members = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        fullName: true,
        phone: true,
        bio: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /API/members:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
