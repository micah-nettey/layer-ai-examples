import { NextRequest, NextResponse } from 'next/server';
import { layer } from '@/lib/layer';

export async function POST(req: NextRequest) {
  let gate: string | undefined;
  let prompt: string | undefined;

  try {
    const body = await req.json();
    gate = body.gate;
    prompt = body.prompt;

    if (!gate || !prompt) {
      return NextResponse.json(
        { error: 'Gate and prompt are required' },
        { status: 400 }
      );
    }

    const result = await layer.completeV2({
      gate,
      type: 'chat',
      data: {
        messages: [
          { role: 'user', content: prompt }
        ],
      },
    });

    return NextResponse.json({ content: result.content });
  } catch (error: any) {
    console.error('Generation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      gate,
      prompt: prompt?.substring(0, 100),
    });
    return NextResponse.json(
      { error: error.message || 'Failed to generate content'},
      { status: 500 }
    );
  }
}