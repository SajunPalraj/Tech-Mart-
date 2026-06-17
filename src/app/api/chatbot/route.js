import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();

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
        messages: messages, // Passes the full chat array directly
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