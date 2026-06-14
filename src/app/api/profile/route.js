import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const username = searchParams.get("username");
    const avatarUrl = searchParams.get("avatarUrl");

    if (!userId && !email) {
      return NextResponse.json({ error: "User ID or Email is required" }, { status: 400 });
    }

    let user = null;

    if (userId) {
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
    } else if (email) {
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
        // Auto-create user in database since they logged in via Clerk
        user = await prisma.user.create({
          data: {
            username: username || email.split("@")[0],
            email: email,
            password: "", // Handled by Clerk
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
      }
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /API/profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { userId, avatar, fullName, phone, bio, address, city, state, zip, country } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
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

    const updatedUser = await prisma.user.update({
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

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /API/profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
