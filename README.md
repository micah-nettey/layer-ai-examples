# Layer AI Examples

A collection of example applications showcasing how to use [Layer AI](https://github.com/micah-nettey/layer-ai) for AI-powered features.

## Examples

### [AI Chatbot](./chatbot)
Modern conversational AI chatbot with message history, real-time cost tracking, and performance metrics. Showcases Layer AI's smart routing, model normalization, automatic fallback handling, and simplified API with automatic task type inference.

**Stack:** Next.js, TypeScript, Tailwind CSS
**Features:** Gate-based routing, automatic type inference, cost tracking, latency monitoring, dark mode
**Live Demo:** [Coming soon]

### [Content Generator](./content-generator)
AI-powered content generation for blogs, social media, and product descriptions. Demonstrates Layer AI's routing, fallback strategies, cost tracking, and simplified request API.

**Stack:** Next.js, TypeScript, Tailwind CSS
**Live Demo:** [Coming soon]

### [Image Generator](./image-generator)
AI-powered image generation with DALL-E and other models. Shows how Layer AI automatically infers task type from gate configuration, eliminating the need to specify type in requests.

**Stack:** Next.js, TypeScript, Tailwind CSS
**Features:** Automatic type inference, multi-modal support, cost tracking
**Live Demo:** [Coming soon]

### [Recipe Generator](./recipe-generator)
Backend API that generates recipes from grocery lists. Express.js example demonstrating vendor-agnostic AI integration, model switching without code changes, and Firebase Functions compatibility. Perfect for understanding Layer AI's value in production backends.

**Stack:** Express.js, TypeScript
**Features:** Model switching without deployment, cost tracking, Firebase-ready, complete demo script
**Live Demo:** [Coming soon]

---

## Getting Started

Each example is a standalone project. Navigate to the example directory and follow its README for setup instructions.

```bash
# Clone this repository
git clone https://github.com/micah-nettey/layer-ai-examples.git

# Navigate to an example
cd layer-ai-examples/content-generator

# Follow the example's README
```

## Prerequisites

- Node.js 18+ and pnpm
- A Layer AI account ([Sign up](https://uselayer.ai))
- Layer AI API key from your [dashboard](https://uselayer.ai/dashboard)

## Learn More

- [Layer AI Documentation](https://github.com/micah-nettey/layer-ai)
- [Layer AI SDK](https://www.npmjs.com/package/@layer-ai/sdk)
- [Layer AI CLI](https://www.npmjs.com/package/@layer-ai/cli)

## Contributing

Found a bug or want to add an example? Contributions are welcome! Please open an issue or PR.

## License

MIT
