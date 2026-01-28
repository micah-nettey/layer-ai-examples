# AI Chatbot with Layer AI

A modern, responsive chatbot that demonstrates Layer AI's smart routing, model normalization, and cost tracking capabilities. Switch between different AI models seamlessly while maintaining conversation context.

![Layer AI Chatbot](https://img.shields.io/badge/Layer%20AI-Chatbot-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

- 🤖 **Smart AI Routing** - Automatic model selection and fallback handling via Layer AI gates
- 💬 **Conversational UI** - Beautiful, modern chat interface with message history
- 📊 **Real-time Metrics** - View model used, cost, and latency for each response
- 🎨 **Dark Mode Support** - Seamless light/dark theme switching
- ⚡ **Fast Performance** - Built with Next.js 16 and Turbopack
- 🔄 **Context Preservation** - Maintains conversation context across all interactions

## What This Demo Showcases

This chatbot demonstrates Layer AI's core capabilities:

1. **Gate-Based Routing**: All chat requests route through a Layer AI gate that handles model selection
2. **Automatic Fallbacks**: If the primary model fails, Layer AI automatically tries fallback models
3. **Cost Tracking**: See the exact cost of each AI response
4. **Model Normalization**: Unified API across different AI providers (OpenAI, Anthropic, Google, etc.)
5. **Performance Monitoring**: Track latency for every request
6. **Usage Tracking**: All requests are automatically tracked in your Layer AI dashboard

## Prerequisites

- Node.js 18+ and pnpm
- A Layer AI account ([Sign up](https://uselayer.ai))
- Layer AI API key

## Setup

### 1. Clone and Install

```bash
# Navigate to the chatbot directory
cd chatbot

# Install dependencies
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the chatbot directory:

```bash
# Layer AI Configuration
LAYER_API_KEY=your_api_key_here
LAYER_API_URL=https://api.uselayer.ai
```

Get your API key from the [Layer AI Dashboard](https://uselayer.ai/dashboard).

### 3. Create a Gate

Create a gate in your Layer AI dashboard:

1. Go to [Layer AI Dashboard](https://uselayer.ai/dashboard)
2. Create a new gate with:
   - **Name**: `layer-ai-chatbot`
   - **Type**: Chat
   - **Primary Model**: Choose your preferred model (e.g., `gpt-4o`, `claude-sonnet-4-5-20250929`)
   - **Fallback Models**: Add fallback models for reliability

> **Note**: The gate name must be `layer-ai-chatbot` to match the code, or update the gate name in `app/api/chat/route.ts`.

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

## Project Structure

```
chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Chat API endpoint using Layer AI SDK
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main chat interface
│   └── globals.css           # Global styles
├── lib/
│   └── layer.ts              # Layer AI SDK initialization
├── .env.local                # Environment variables (create this)
├── package.json
└── README.md
```

## How It Works

### 1. User Sends Message

The user types a message in the chat interface.

### 2. API Route Processes Request

```typescript
// app/api/chat/route.ts
const result = await layer.chat({
  gateId: 'f6cc6bd9-4ec1-4ac2-8912-81a085255c35',
  data: {
    messages,
  },
});
```

> **Note**: Using the type-safe `layer.chat()` method ensures compile-time validation of your request data and provides better IDE autocomplete support.

### 3. Layer AI Handles Routing

Layer AI:
- Routes the request to your configured primary model
- Automatically handles retries and fallbacks if needed
- Tracks cost and usage
- Returns normalized response

### 4. Display Response

The UI displays:
- AI response content
- Model that handled the request
- Cost of the request
- Latency (response time)

## Key Components

### Chat API Route (`app/api/chat/route.ts`)

Handles chat requests using the Layer AI SDK:

```typescript
import { layer } from '@/lib/layer';

const result = await layer.chat({
  gateId: 'f6cc6bd9-4ec1-4ac2-8912-81a085255c35',
  data: { messages },
});

return NextResponse.json({
  content: result.content,
  model: result.model,
  cost: result.cost,
  latency,
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

### Chat Interface (`app/page.tsx`)

React component with message history, loading states, and metadata display.

## Customization

### Change the Gate

Update the gate name in `app/api/chat/route.ts`:

```typescript
const result = await layer.chat({
  gateId: 'your-gate-id', // Change this to your gate ID
  data: { messages },
});
```

### Modify UI Styling

The UI uses Tailwind CSS. Customize colors, spacing, and layout in `app/page.tsx`.

### Add Features

Consider adding:
- Message streaming for real-time responses
- Message editing and regeneration
- Conversation export/import
- User authentication
- Conversation history persistence
- Usage monitoring via Layer AI dashboard

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Add your environment variables in the Vercel dashboard.

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Vercel
- Netlify
- Railway
- AWS Amplify
- Any Node.js hosting platform

## Troubleshooting

### "LAYER_API_KEY environment variable is required"

Make sure you created `.env.local` with your API key:

```bash
LAYER_API_KEY=layer_xxx
LAYER_API_URL=https://api.uselayer.ai
```

### "Gate not found" or 404 errors

Ensure you created a gate named `layer-ai-chatbot` in your Layer AI dashboard, or update the gate name in the code.

### TypeScript errors

Run `pnpm install` to ensure all dependencies are installed correctly.

## Learn More

- [Layer AI Documentation](https://github.com/micah-nettey/layer-ai)
- [Layer AI SDK](https://www.npmjs.com/package/@layer-ai/sdk)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
