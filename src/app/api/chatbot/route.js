import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // System instructions to guide model behaviors strictly
    const systemPrompt = {
      role: "system",
      content: `You are the official Tech Mart AI Assistant, a helpful and polite virtual support agent for Tech Mart, a premium e-commerce site specializing in high-performance computer hardware (GPUs, CPUs, RAMs, laptops, monitors, and accessories).

STRICT POLICY:
- You must ONLY answer questions directly related to Tech Mart, its products catalog, store policies, shopping cart, user profiles, shipping fees, returns/exchanges, technical specifications, custom PC building advice, or hardware setup support.
- If the user asks ANY question that is not related to Tech Mart, computer hardware, or shopping support (for example: "what is mass?", "tell me a joke", "how to bake a cake", general science, history, coding, math, etc.), you MUST politely decline to answer.
- Reply precisely: "I apologize, but as the Tech Mart support assistant, I can only help with product recommendations, order inquiries, store policies, and e-commerce-related questions. Let me know if you need help finding high-performance tech gears!"
- Write brief, professional, and clear responses.`
    };

    const finalMessages = [systemPrompt, ...messages];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // These headers are optional but recommended by OpenRouter for their analytics
        "HTTP-Referer": "https://tech-mart-iota.vercel.app", 
        "X-Title": "Tech Mart Chatbot",
      },
      body: JSON.stringify({
        // Automatically selects a free model at random/based on capacity
        model: "openrouter/free", 
        messages: finalMessages, // Passes the full chat array with system instructions
      })
    });

    const data = await response.json();
    
    // OpenRouter returns standard OpenAI formatting
    const botReply = data.choices[0].message.content;

    return NextResponse.json({ text: botReply });
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}