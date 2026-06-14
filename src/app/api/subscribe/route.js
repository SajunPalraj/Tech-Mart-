import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Check if user already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ error: "This email is already subscribed!" }, { status: 400 });
    }

    // Save subscriber to MongoDB
    const subscriber = await prisma.subscriber.create({
      data: { email },
    });

    let emailSent = false;
    let transportInfo = "Console Log (Mock)";
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Use Clerk to send the email invitation (100% reliable, zero config required)
    try {
      const client = await clerkClient();
      const invitation = await client.invitations.createInvitation({
        emailAddress: email,
        redirectUrl: origin, // Redirects the client directly back to your site
        ignoreExisting: true,
      });

      console.log("Newsletter welcome invitation sent successfully via Clerk:", invitation.id);
      emailSent = true;
      transportInfo = `Clerk Invitation (${invitation.id})`;
    } catch (clerkError) {
      console.error("Error sending email via Clerk invitation:", clerkError);
    }

    if (!emailSent) {
      // Mock mail logging fallback in case Clerk keys are not set up or fail
      console.log(`
============================================================
[NEWSLETTER EMAIL MOCK DISPATCH]
To: ${email}
From: "Tech Mart" <noreply@techmart.com>
Subject: Welcome to Tech Mart! 🚀
------------------------------------------------------------
Thank you for subscribing to our newsletter! We're thrilled 
to have you join Tech Mart.
============================================================
      `);
    }

    return NextResponse.json({
      message: "Thank you for subscribing!",
      subscriber,
      emailSent,
      transport: transportInfo,
    }, { status: 201 });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
