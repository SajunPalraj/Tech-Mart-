import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Seed products converted to INR (USD * 83) and mapped to standard categories only
const seedProducts = [
  // GPUs (Graphics Processing Units)
  { title: "NVIDIA GeForce RTX 4090 24GB", price: 132717, rating: 5.0, category: "GPU", image: "/Products/CPU/gpu1.webp", description: "Ultimate NVIDIA graphics card with 24GB VRAM for gaming and AI." },
  { title: "NVIDIA GeForce RTX 4080 Super 16GB", price: 82917, rating: 4.8, category: "GPU", image: "/Products/GPU/gpu2.webp", description: "Powerful Super edition GPU perfect for high framerate 4K gaming." },
  { title: "AMD Radeon RX 7900 XTX 24GB", price: 77107, rating: 4.7, category: "GPU", image: "/Products/GPU/gpu3.webp", description: "AMD flagship graphic card with massive memory and raw performance." },
  { title: "NVIDIA GeForce RTX 4070 Ti Super 16GB", price: 66317, rating: 4.6, category: "GPU", image: "/Products/GPU/gpu4.jpg", description: "Excellent high-tier graphic card for standard 1440p and 4K setups." },
  { title: "AMD Radeon RX 7800 XT 16GB", price: 41417, rating: 4.5, category: "GPU", image: "/Products/GPU/gpu5.webp", description: "The sweet spot graphic card for 1440p gaming enthusiasts." },
  { title: "NVIDIA GeForce RTX 4060 Ti 8GB", price: 32287, rating: 4.3, category: "GPU", image: "/Products/GPU/gpu6.webp", description: "Efficient and fast GPU for modern desktop PCs." },
  { title: "Intel Arc A770 16GB", price: 24817, rating: 4.1, category: "GPU", image: "/Products/GPU/gpu7.webp", description: "Intel's high-memory GPU offering supreme value and AV1 encoding." },

  // CPUs (Processors)
  { title: "Intel Core i9-14900K Desktop Processor", price: 43907, rating: 4.8, category: "CPU", image: "/Products/CPU/cpu1.webp", description: "Intel 14th gen flagship CPU with 24 cores for maximum computing." },
  { title: "AMD Ryzen 9 7950X3D 16-Core Processor", price: 47227, rating: 4.9, category: "CPU", image: "/Products/CPU/cpu2.webp", description: "Ultra-fast gaming CPU with 3D V-Cache technology." },
  { title: "Intel Core i7-14700K Desktop Processor", price: 32287, rating: 4.7, category: "CPU", image: "/Products/CPU/cpu3.webp", description: "High-performance processor featuring 20 cores." },
  { title: "AMD Ryzen 7 7800X3D 8-Core Processor", price: 28967, rating: 4.9, category: "CPU", image: "/Products/CPU/cpu4.webp", description: "The absolute best gaming CPU on the market today." },
  { title: "Intel Core i5-14600K Desktop Processor", price: 24817, rating: 4.5, category: "CPU", image: "/Products/CPU/cpu5.webp", description: "Affordable, high-speed 14-core mid-range desktop processor." },
  { title: "AMD Ryzen 5 7600X 6-Core Processor", price: 16517, rating: 4.4, category: "CPU", image: "/Products/CPU/cpu6.webp", description: "Budget-friendly entry CPU for modern AM5 gaming builds." },
  { title: "AMD Ryzen 9 5900X 12-Core Processor", price: 23987, rating: 4.6, category: "CPU", image: "/Products/CPU/cpu7.webp", description: "Reliable Zen 3 processing powerhouse with 12 cores." },

  // RAMs (Memory)
  { title: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz", price: 9877, rating: 4.8, category: "RAM", image: "/Products/RAM/RAM1.webp", description: "Beautiful dynamic RGB styling coupled with high-speed DDR5 memory." },
  { title: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6400MHz", price: 10292, rating: 4.9, category: "RAM", image: "/Products/RAM/RAM2.webp", description: "Ultra-performance DDR5 RAM engineered for overclocking." },
  { title: "Kingston Fury Beast RGB 16GB (2x8GB) DDR5 5200MHz", price: 5727, rating: 4.5, category: "RAM", image: "/Products/RAM/RAM3.webp", description: "Reliable performance RAM with sleek customizable lighting." },
  { title: "Crucial Pro 64GB (2x32GB) DDR5 5600MHz", price: 15687, rating: 4.7, category: "RAM", image: "/Products/RAM/RAM4.jpeg", description: "Massive memory capacity for multi-tasking and professional creation." },
  { title: "Teamgroup T-Force Delta RGB 32GB (2x16GB) DDR5 6000MHz", price: 9047, rating: 4.6, category: "RAM", image: "/Products/RAM/RAM5.webp", description: "Wide-angle RGB cooling heatspreader and high speeds." },
  { title: "Patriot Viper Venom 32GB (2x16GB) DDR5 5600MHz", price: 7802, rating: 4.4, category: "RAM", image: "/Products/RAM/RAM6.webp", description: "High performance memory with premium thermal shield shields." },
  { title: "Corsair Dominator Titanium 32GB (2x16GB) DDR5 7200MHz", price: 14857, rating: 4.8, category: "RAM", image: "/Products/RAM/RAM7.webp", description: "Top-tier premium memory with extreme overclocking speeds." },

  // Laptops
  { title: "ASUS ROG Zephyrus G14 Gaming Laptop", price: 124417, rating: 4.8, category: "Laptops", image: "/Products/Laptops/Gaming Laptops1.webp", description: "Compact 14-inch gaming laptop with Ryzen 9 processor." },
  { title: "MSI Raider GE78 HX Gaming Laptop", price: 182517, rating: 4.9, category: "Laptops", image: "/Products/Laptops/Gaming Laptops2.webp", description: "Extreme desktop replacement gaming laptop with high refresh display." },
  { title: "Lenovo Legion Pro 5 Gaming Laptop", price: 103667, rating: 4.6, category: "Laptops", image: "/Products/Laptops/Gaming Laptops3.jpeg", description: "Balanced gaming laptop offering unmatched performance and display quality." },
  { title: "Acer Predator Helios 16 Gaming Laptop", price: 116117, rating: 4.5, category: "Laptops", image: "/Products/Laptops/Gaming Laptops4.webp", description: "Sleek keyboard lighting and top-tier Nvidia graphics." },
  { title: "HP Omen 16 Gaming Laptop", price: 95367, rating: 4.4, category: "Laptops", image: "/Products/Laptops/Gaming Laptops5.webp", description: "Premium metal build gaming laptop for daily gaming sessions." },
  { title: "GIGABYTE AORUS 15 Gaming Laptop", price: 91217, rating: 4.3, category: "Laptops", image: "/Products/Laptops/Gaming Laptops6.webp", description: "Super fast laptop screen with sleek design." },
  { title: "Razer Blade 16 Gaming Laptop", price: 240617, rating: 4.9, category: "Laptops", image: "/Products/Laptops/Gaming Laptops7webp.webp", description: "Ultra premium design gaming laptop with OLED screen." },

  // Monitors
  { title: "ASUS ROG Swift 32\" OLED 4K Gaming Monitor", price: 107817, rating: 4.9, category: "Monitors", image: "/Products/Monitors/monitor-1.webp", description: "Incredible 4K OLED gaming display with true blacks and 240Hz." },
  { title: "Samsung Odyssey G9 49\" Curved Gaming Monitor", price: 99517, rating: 4.8, category: "Monitors", image: "/Products/Monitors/monitor-2.webp", description: "Massive ultra-wide curved screen for extreme gaming immersion." },
  { title: "LG UltraGear 27\" QHD Nano IPS Monitor", price: 28967, rating: 4.7, category: "Monitors", image: "/Products/Monitors/monitor-3.webp", description: "Super fast IPS gaming monitor with exceptional color accuracy." },
  { title: "Dell UltraSharp 34\" Curved USB-C Monitor", price: 62167, rating: 4.6, category: "Monitors", image: "/Products/Monitors/monitor-4.webp", description: "Professional curved screen with single cable USB-C docking." },
  { title: "MSI Optix 32\" Curved Gaming Monitor", price: 23157, rating: 4.4, category: "Monitors", image: "/Products/Monitors/monitor-5.webp", description: "Expansive curved screen for immersive standard gaming." },
  { title: "Gigabyte M27Q 27\" 170Hz KVM Monitor", price: 24817, rating: 4.7, category: "Monitors", image: "/Products/Monitors/monitor-6.webp", description: "Built-in KVM switch allows controlling two computers easily." },

  // Accessories (Consolidated remaining categories: 3D PRINTERS, AUDIO, CAMERAS, etc.)
  { title: "Fixed-Wing Hybrid Surveillance Drone VW", price: 120350, rating: 4.5, category: "ACCESSORIES", image: "/Products/Accessories/product-1.jpg", description: "Advanced hybrid fixed-wing UAV drone for survey and mapping." },
  { title: "Over-Ear Headphones FX-9901 Orange", price: 73870, rating: 4.0, category: "ACCESSORIES", image: "/Products/Accessories/product-2.jpg", description: "Professional over-ear studio headphones with vivid styling." },
  { title: "Smartphone LS-589662 Midnight Black", price: 63910, rating: 5.0, category: "ACCESSORIES", image: "/Products/Accessories/product-3.jpg", description: "Premium android smartphone with triple lens camera module." },
  { title: "Smart Robotic Vacuum Cleaner FZP-550", price: 36520, rating: 3.5, category: "ACCESSORIES", image: "/Products/Accessories/product-4.jpg", description: "Autonomous vacuum and mop with lidar mapping capability." },
  { title: "High-Airflow Tempered Glass Computer Case", price: 319550, rating: 4.8, category: "ACCESSORIES", image: "/Products/Accessories/product-5.jpg", description: "Premium customized heavy duty server chassis with RGB filters." },
  { title: "Wireless Gaming Mouse X-Pro 2", price: 9960, rating: 4.2, category: "ACCESSORIES", image: "/Products/Accessories/product-0.jpg", description: "Ultra lightweight gaming mouse with high accuracy optical sensor." },
  { title: "4K Ultra HD Action Camera Z-Cam", price: 24817, rating: 4.6, category: "ACCESSORIES", image: "/Products/Accessories/Cooler.webp", description: "Rugged waterproof sport action camera capturing 4K 60fps." },
  { title: "Noise-Canceling Bluetooth Earbuds Pro", price: 16517, rating: 4.9, category: "ACCESSORIES", image: "/Products/Accessories/RAM.webp", description: "Compact true wireless earbuds with high quality active noise canceling." }
];

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const reseed = searchParams.get("reseed");

    // Force purge & re-seed database with updated INR products
    if (reseed === "true") {
      console.log("Reseed flag detected. Deleting old products and seeding INR catalog...");
      await prisma.product.deleteMany({});
      await prisma.product.createMany({
        data: seedProducts,
      });
      return NextResponse.json({ message: "Database successfully reseeded with INR products!" }, { status: 200 });
    }

    // Auto-seed if database contains no products
    const count = await prisma.product.count();
    if (count === 0) {
      console.log("Product table is empty, auto-seeding products into MongoDB...");
      await prisma.product.createMany({
        data: seedProducts,
      });
    }

    // Build filter criteria
    const where = {};
    if (category && category !== "All" && category.trim() !== "") {
      where.category = { equals: category, mode: "insensitive" };
    }
    if (search && search.trim() !== "") {
      where.title = { contains: search, mode: "insensitive" };
    }

    // Build sort criteria
    const orderBy = {};
    if (sortBy === "price") {
      orderBy.price = sortOrder;
    } else if (sortBy === "rating") {
      orderBy.rating = sortOrder;
    } else {
      orderBy.createdAt = "desc";
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /API/products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, price, rating, category, image, adminEmail } = body;

    // Validate admin credentials
    if (adminEmail !== "sajunpalraj2004@gmail.com") {
      return NextResponse.json({ error: "Access Denied: Only sajunpalraj2004@gmail.com can create products." }, { status: 403 });
    }

    if (!title || !price || !category || !image) {
      return NextResponse.json({ error: "Missing required product details: title, price, category, and image are required." }, { status: 400 });
    }

    const priceNum = parseFloat(price);
    const ratingNum = parseFloat(rating) || 5.0;

    if (isNaN(priceNum)) {
      return NextResponse.json({ error: "Invalid price format. Must be a number." }, { status: 400 });
    }

    // Create the product in MongoDB mapped exisiting_items collection
    const newProduct = await prisma.product.create({
      data: {
        title,
        description: description || "",
        price: priceNum,
        rating: ratingNum,
        category,
        image,
      }
    });

    return NextResponse.json({ message: "Product created successfully!", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /API/products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
