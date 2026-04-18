import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Ești Barista Bot, asistentul virtual al cafenelei "Vibe Caffée Souvenir".
Ești prietenos, cald și pasionat de cafea. Răspunzi DOAR în română.
Ajuți clienții cu: informații despre meniu, prețuri, recomandări, program, rezervări și locație.
Dacă ești întrebat ceva în afara acestor subiecte, redirecționezi politicos spre cafenea.
Răspunsurile tale sunt scurte și prietenoase (max 3-4 propoziții).

${KNOWLEDGE_BASE}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Mesaje invalide" }, { status: 400 });
    }

    // Păstrăm doar ultimele 6 mesaje ca context
    const recentMessages = messages.slice(-6);

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: recentMessages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json(
      { error: "Eroare la procesarea mesajului" },
      { status: 500 }
    );
  }
}
