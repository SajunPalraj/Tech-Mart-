import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req, res) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        if (user.password !== password) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 })
        }
        return NextResponse.json({ message: "Login successful", user }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
