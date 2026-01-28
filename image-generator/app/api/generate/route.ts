import { NextRequest, NextResponse } from 'next/server';
import { layer } from '@/lib/layer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    const result = await layer.image({
      gateId: 'e7f12750-c6dc-4138-a221-5ca071aaa6f0',
      data: {
        prompt: prompt,
      },
    });

    const latency = Date.now() - startTime;

    // Extract image URL from the images array
    const imageUrl = result.images?.[0]?.url;

    return NextResponse.json({
      content: imageUrl,
      model: result.model,
      cost: result.cost,
      latency,
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: error.message || 'Failed to process image generation request' },
      { status: 500 }
    );
  }
}
