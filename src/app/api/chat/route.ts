import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/company";

// Chatbot endpoint. v1 = local rule-based answers over our agents/company.
// Swap answerQuestion() for a Claude API call to get generative replies.
export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? "");
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const reply = answerQuestion(message);
  return NextResponse.json({ reply });
}
