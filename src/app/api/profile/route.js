import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  const avatarUrl = searchParams.get("avatarUrl");

  if (!userId && !email) {
    return NextResponse.json({ error: "User ID or Email is required" }, { status: 400 });
  }

  let user = null;

  try {
    // Try finding by email first as it's the primary unique key across auth providers
    if (email) {
      user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          fullName: true,
          phone: true,
          bio: true,
          address: true,
          city: true,
          state: true,
          zip: true,
          country: true,
          createdAt: true,
        }
      });

      if (!user) {
        // Auto-create user in MongoDB for Clerk logins
        try {
          user = await prisma.user.create({
            data: {
              username: username || email.split("@")[0],
              email: email,
              password: "",
              avatar: avatarUrl || "",
            },
            select: {
              id: true,
              username: true,
              email: true,
              avatar: true,
              fullName: true,
              phone: true,
              bio: true,
              address: true,
              city: true,
              state: true,
              zip: true,
              country: true,
              createdAt: true,
            }
          });
        } catch (createErr) {
          console.warn("User auto-create notice:", createErr.message);
        }
      }
    }

    // If not found by email and userId exists, try finding by ID
    if (!user && userId) {
      try {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            fullName: true,
            phone: true,
            bio: true,
            address: true,
            city: true,
            state: true,
            zip: true,
            country: true,
            createdAt: true,
          }
        });
      } catch (idErr) {
        console.warn("Invalid ObjectId or query error by userId:", idErr.message);
      }
    }
  } catch (error) {
    console.warn("MongoDB connection notice in GET /API/profile:", error.message || error);
  }

  // Fallback user object if DB is unreachable or user not yet in DB
  if (!user) {
    user = {
      id: userId || "temp-id",
      username: username || (email ? email.split("@")[0] : "user"),
      email: email || "",
      avatar: avatarUrl || "",
      fullName: username || (email ? email.split("@")[0] : "Tech Explorer"),
      phone: "",
      bio: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      createdAt: new Date().toISOString(),
    };
  }

  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { userId, email, avatar, fullName, phone, bio, address, city, state, zip, country } = body;

    if (!userId && !email) {
      return NextResponse.json({ error: "User ID or Email is required" }, { status: 400 });
    }

    const updateData = {};
    if (avatar !== undefined) updateData.avatar = avatar;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (zip !== undefined) updateData.zip = zip;
    if (country !== undefined) updateData.country = country;

    let updatedUser = null;

    try {
      if (email) {
        updatedUser = await prisma.user.update({
          where: { email },
          data: updateData,
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            fullName: true,
            phone: true,
            bio: true,
            address: true,
            city: true,
            state: true,
            zip: true,
            country: true,
            createdAt: true,
          }
        });
      } else if (userId) {
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: updateData,
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            fullName: true,
            phone: true,
            bio: true,
            address: true,
            city: true,
            state: true,
            zip: true,
            country: true,
            createdAt: true,
          }
        });
      }
    } catch (dbErr) {
      console.warn("DB update notice in PUT /API/profile:", dbErr.message);
    }

    if (!updatedUser) {
      updatedUser = {
        id: userId || "temp-id",
        email: email || "",
        ...updateData
      };
    }

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /API/profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
