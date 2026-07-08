import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/company";
import { askGemini } from "@/lib/chat/gemini";

// Chatbot endpoint. Tries Gemini (generative) first; on any failure (quota,
// network, missing key) falls back to the local rule-based engine so the
// assistant always answers.
export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? "").slice(0, 1000);
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (!message.trim()) {
    return NextResponse.json({ reply: answerQuestion(message) });
  }

  const generated = await askGemini(message);
  const reply = generated ?? answerQuestion(message);
  return NextResponse.json({ reply, source: generated ? "gemini" : "rules" });
}
