import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(request, response) {
  const body = await request.json();
  const prompt = body.prompt;

  if (!prompt) {
    return NextResponse.json({ error: 'you need a prompt' }, { status: 400 });
  }

  const result = await model.generateContent(prompt);

  return NextResponse.json(
    { message: result.response.text() },
    { status: 200 },
  );
}
