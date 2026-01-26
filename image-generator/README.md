# AI Image Generator with Layer AI

An AI-powered image generation demo built with [Layer AI](https://github.com/micah-nettey/layer-ai) and Next.js. This example showcases Layer AI's **automatic task type inference** feature - no need to specify the request type!

![Layer AI Image Generator](https://img.shields.io/badge/Layer%20AI-Image%20Generator-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

- 🎨 **AI Image Generation** - Create images from text prompts using DALL-E and other models
- 🔄 **Automatic Type Inference** - No need to specify `type: 'image'` - Layer AI infers it from your gate's `taskType`
- 🚀 **Smart Routing** - Automatic model selection and fallback handling
- 💰 **Cost Tracking** - See the exact cost of each image generation
- ⚡ **Fast Performance** - Built with Next.js 16 and modern React
- 📊 **Usage Tracking** - All requests automatically tracked in your Layer AI dashboard

## What This Demo Showcases

This example demonstrates Layer AI's **simplified API with automatic type inference**:

### Old Way (SDK < 2.1.1)
```typescript
const result = await layer.complete({
  gateId: 'your-gate-id',
  type: 'image', // ❌ Required - repetitive and error-prone
  data: {
    prompt: 'A sunset over mountains',
  },
});
```

### New Way (SDK >= 2.1.1)
```typescript
const result = await layer.complete({
  gateId: 'your-gate-id',
  // ✅ type is automatically inferred from gate's taskType
  data: {
    prompt: 'A sunset over mountains',
  },
});
```

**Benefits:**
- Less boilerplate code
- Fewer potential bugs (no type mismatches)
- Cleaner, more intuitive API
- Gate configuration is the single source of truth for task type

## Prerequisites

- Node.js 18+ and pnpm
- A Layer AI account ([Sign up](https://uselayer.ai))
- Layer AI API key

## Setup

### 1. Clone and Install

```bash
# Navigate to the image-generator directory
cd image-generator

# Install dependencies
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the image-generator directory:

```bash
# Layer AI Configuration
LAYER_API_KEY=your_api_key_here
LAYER_API_URL=https://api.uselayer.ai
```

Get your API key from the [Layer AI Dashboard](https://uselayer.ai/dashboard).

### 3. Create an Image Generation Gate

Create a gate in your Layer AI dashboard:

1. Go to [Layer AI Dashboard](https://uselayer.ai/dashboard)
2. Create a new gate with:
   - **Name**: `image-generator` (or your custom name)
   - **Task Type**: `image` ⭐ **This is key - Layer AI will automatically use this!**
   - **Primary Model**: Choose an image model (e.g., `dall-e-3`)
   - **Fallback Models**: Add fallback image models for reliability

> **Important**: Setting the gate's `taskType` to `image` tells Layer AI that all requests to this gate are for image generation. You don't need to specify `type: 'image'` in your code!

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3006](http://localhost:3006) in your browser.

## Project Structure

```
image-generator/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # Image generation API endpoint
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main image generator interface
│   └── globals.css           # Global styles
├── lib/
│   └── layer.ts              # Layer AI SDK initialization
├── .env.local                # Environment variables (create this)
├── package.json
└── README.md
```

## How It Works

### 1. User Enters Prompt

The user types an image description in the text area.

### 2. API Route Processes Request

```typescript
// app/api/generate/route.ts
const result = await layer.complete({
  gateId: process.env.LAYER_GATE_ID,
  data: {
    prompt: userPrompt,
  },
});
```

Notice there's **no `type: 'image'`** field! Layer AI automatically knows this is an image generation request because:
- The gate's `taskType` is set to `image`
- Layer AI defaults to the gate's task type for all requests

### 3. Layer AI Handles Everything

Layer AI:
- Uses the gate's `taskType` to determine this is an image request
- Routes to your configured image generation model
- Handles retries and fallbacks automatically
- Tracks cost and usage
- Returns the generated image URL

### 4. Display Result

The UI displays:
- Generated image
- Model that handled the request
- Cost of the generation
- Image URL for downloading

## Key Components

### Image Generation API Route (`app/api/generate/route.ts`)

Handles image generation using the Layer AI SDK:

```typescript
import { layer } from '@/lib/layer';

const result = await layer.complete({
  gateId: process.env.LAYER_GATE_ID,
  data: {
    prompt: userPrompt,
    size: '1024x1024',
    quality: 'standard',
  },
});

return NextResponse.json({
  imageUrl: result.content,
  model: result.model,
  cost: result.cost,
});
```

### Layer SDK Initialization (`lib/layer.ts`)

Configures the Layer AI client:

```typescript
import { Layer } from '@layer-ai/sdk';

export const layer = new Layer({
  apiKey: process.env.LAYER_API_KEY,
  baseUrl: process.env.LAYER_API_URL,
});
```

### Image Generator Interface (`app/page.tsx`)

React component with prompt input, loading states, and image display.

## Customization

### Change the Gate

Update the gate ID in your environment variables:

```bash
LAYER_GATE_ID=your-custom-gate-id
```

Or pass it directly in the code:

```typescript
const result = await layer.complete({
  gateId: 'your-custom-gate-id',
  data: { prompt },
});
```

### Modify Image Parameters

Add custom parameters to the request:

```typescript
const result = await layer.complete({
  gateId: process.env.LAYER_GATE_ID,
  data: {
    prompt: userPrompt,
    size: '1792x1024',      // Different size
    quality: 'hd',          // Higher quality
    style: 'vivid',         // DALL-E 3 style
  },
});
```

### Add Advanced Features

Consider adding:
- Image editing and variations
- Multiple images per request
- Style presets
- Image history gallery
- Download functionality
- Prompt suggestions

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Add your environment variables in the Vercel dashboard.

## Troubleshooting

### "LAYER_API_KEY environment variable is required"

Make sure you created `.env.local` with your API key:

```bash
LAYER_API_KEY=layer_xxx
LAYER_API_URL=https://api.uselayer.ai
```

### "Gate not found" or 404 errors

Ensure:
1. You created a gate in your Layer AI dashboard
2. The gate's `taskType` is set to `image`
3. Your gate ID is correct in the environment variables

### TypeScript errors

Run `pnpm install` to ensure all dependencies are installed correctly.

## Learn More

- [Layer AI Documentation](https://github.com/micah-nettey/layer-ai)
- [Layer AI SDK](https://www.npmjs.com/package/@layer-ai/sdk)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
