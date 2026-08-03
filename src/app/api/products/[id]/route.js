import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    let product = null;

    try {
      if (id.length === 24 || !id.startsWith("seed-")) {
        product = await prisma.product.findUnique({
          where: { id },
        });
      }
    } catch (dbErr) {
      console.warn("MongoDB connection notice in [id] route:", dbErr.message);
    }

    // If product was not found in DB (or DB was unreachable), fetch from main API GET handler logic
    if (!product) {
      try {
        const origin = new URL(req.url).origin;
        const res = await fetch(`${origin}/API/products`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const list = data.products || [];
          product = list.find((p) => p.id === id || String(p.id) === String(id));
        }
      } catch (err) {
        console.error("Fallback product search error:", err);
      }
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
