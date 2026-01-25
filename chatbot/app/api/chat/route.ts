import { NextRequest, NextResponse } from 'next/server';
import { layer } from '@/lib/layer';

export async function POST(req: NextRequest) {
  let messages: any[] | undefined;

  try {
    const body = await req.json();
    messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    const result = await layer.complete({
      gateName: 'layer-ai-chatbot',
      gateId: 'f6cc6bd9-4ec1-4ac2-8912-81a085255c35',
      type: 'chat',
      data: {
        messages,
      },
    });

    const latency = Date.now() - startTime;

    return NextResponse.json({
      content: result.content,
      model: result.model,
      cost: result.cost,
      latency,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      messagesCount: messages?.length,
    });
    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
