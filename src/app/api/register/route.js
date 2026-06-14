import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//register
export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists by email
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (existingEmail) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Check if user already exists by username
        const existingUsername = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUsername) {
            return NextResponse.json({ error: "Username already taken" }, { status: 400 });
        }

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
            }
        });

        return NextResponse.json({ message: "Registration successful", user: newUser }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}