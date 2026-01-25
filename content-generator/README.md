# AI Content Generator

An AI-powered content generation demo built with [Layer AI](https://github.com/micah-nettey/layer-ai) and Next.js.

## Features

- **Blog Post Outlines** - Generate structured blog post outlines from topics
- **Social Media Captions** - Create engaging social media content
- **Product Descriptions** - Write compelling e-commerce product descriptions
- **Cost Tracking** - See the cost and model used for each generation
- **Smart Routing** - Automatic model selection with fallback strategies
- **Usage Tracking** - All requests tracked automatically in your Layer AI dashboard

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Layer AI SDK** - AI routing and completion management

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Layer AI account ([Sign up](https://uselayer.ai))
- Layer AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/micah-nettey/layer-ai-examples.git
cd layer-ai-examples/content-generator
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure your Layer AI API key:
```bash
# Edit .env.local and add your API key
LAYER_API_KEY=your_layer_api_key_here
LAYER_API_URL=https://api.uselayer.ai
```

4. Set up gates in Layer AI (via Dashboard or CLI):
```bash
# Using Layer AI CLI
layer gates create blog-outline --model gpt-4 --providers openai
layer gates create social-caption --model claude-sonnet-4 --providers anthropic
layer gates create product-description --model gpt-3.5-turbo --providers openai
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## How It Works

This example demonstrates Layer AI's key features:

1. **Gate-based routing** - Each content type uses a different gate with optimized models
2. **Fallback strategies** - If primary model fails, automatically tries backup models
3. **Cost tracking** - Every request logs cost, latency, and tokens used
4. **Metadata display** - See which model was actually used for each request
5. **Usage tracking** - All requests are automatically tracked in your Layer AI dashboard

## Project Structure

```
content-generator/
├── app/
│   ├── api/
│   │   └── generate/route.ts    # API route for Layer AI completions
│   ├── page.tsx                  # Main UI with tabs
│   └── layout.tsx               # App layout
├── components/
│   ├── ContentTabs.tsx          # Tab navigation
│   ├── BlogGenerator.tsx        # Blog outline generator
│   ├── SocialGenerator.tsx      # Social caption generator
│   └── ProductGenerator.tsx     # Product description generator
└── lib/
    └── layer.ts                 # Layer AI client setup
```

## Learn More

- [Layer AI Documentation](https://github.com/micah-nettey/layer-ai)
- [Layer AI SDK](https://www.npmjs.com/package/@layer-ai/sdk)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
