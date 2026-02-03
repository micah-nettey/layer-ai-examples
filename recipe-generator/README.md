# Recipe Generator with Layer AI

A backend API that generates recipes from grocery lists using Layer AI. This Express.js example demonstrates vendor-agnostic AI integration, model switching without code changes, and Firebase Functions compatibility.

![Layer AI](https://img.shields.io/badge/Layer%20AI-Recipe%20Generator-blue)
![Express.js](https://img.shields.io/badge/Express.js-5.1-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

- 🥘 **Smart Recipe Generation** - Generate creative recipes from any ingredient list
- 🔄 **Model Switching** - Switch between GPT-4, Claude, Gemini without code changes
- 📊 **Real-time Metrics** - Track model used, cost, and latency for each request
- 🔥 **Firebase-Ready** - 3-line adaptation to Firebase Functions (guide below)
- ⚡ **Production-Ready** - Express.js backend with proper error handling and CORS
- 💰 **Cost Tracking** - Monitor AI costs per request

## What This Demo Showcases

This recipe generator demonstrates Layer AI's core value propositions:

1. **Vendor Lock-in Solution**: Switch AI providers instantly via dashboard - no code changes or redeployments
2. **Model Experimentation**: Test GPT-4, Claude, Gemini side-by-side to find the best fit
3. **Cost Optimization**: Track costs per request and switch to cheaper models when needed
4. **Automatic Fallbacks**: If primary model fails, Layer AI routes to fallback models
5. **Usage Analytics**: All requests tracked in Layer AI dashboard with cost and performance metrics

## Prerequisites

- Node.js 18+ and pnpm
- A Layer AI account ([Sign up](https://uselayer.ai))
- Layer AI API key

## Setup

### 1. Clone and Install

```bash
# Navigate to the recipe-generator directory
cd recipe-generator

# Install dependencies
pnpm install
```

### 2. Configure Environment Variables

Update the `.env.local` file in the recipe-generator directory:

```bash
# Layer AI Configuration
LAYER_API_KEY=your_api_key_here
LAYER_API_URL=https://api.uselayer.ai

# Server Configuration (optional)
PORT=3000
```

Get your API key from the [Layer AI Dashboard](https://uselayer.ai/dashboard).

### 3. Create a Gate

Create a gate in your Layer AI dashboard:

1. Go to [Layer AI Dashboard](https://uselayer.ai/dashboard)
2. Create a new gate with:
   - **Name**: `recipe-generation`
   - **Type**: Chat
   - **Primary Model**: Choose your preferred model (e.g., `gpt-4o`, `claude-sonnet-4-5-20250929`, `gemini-2.0-flash`)
   - **Fallback Models**: Add fallback models for reliability

> **Note**: The gate name must be `recipe-generation` to match the code, or update the gate name in [src/index.ts:36](src/index.ts#L36).

### 4. Run the Development Server

```bash
pnpm dev
```

The API will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
recipe-generator/
├── src/
│   └── index.ts              # Express server with Layer AI integration
├── lib/
│   └── layer.ts              # Layer AI SDK initialization
├── .env.local                # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

### Generate a Recipe

**Request:**

```bash
curl -X POST http://localhost:3000/recipe \
  -H "Content-Type: application/json" \
  -d '{
    "groceryList": ["chicken breast", "spinach", "garlic", "olive oil", "lemon"]
  }'
```

**Response:**

```json
{
  "recipe": "# Lemon Garlic Chicken with Spinach\n\n## Prep Time: 10 minutes\n## Cook Time: 20 minutes\n## Difficulty: Easy\n\n### Ingredients:\n- 2 chicken breasts\n- 2 cups fresh spinach\n- 3 cloves garlic, minced\n- 2 tbsp olive oil\n- 1 lemon (juice and zest)\n\n### Instructions:\n1. Season chicken with salt and pepper...",
  "metadata": {
    "model": "gpt-4o",
    "cost": 0.00234,
    "latency": "1847ms",
    "ingredients": ["chicken breast", "spinach", "garlic", "olive oil", "lemon"]
  }
}
```

### Health Check

```bash
curl http://localhost:3000/health
```

## How It Works

### 1. Client Sends Grocery List

Your application sends a POST request with an array of ingredients:

```typescript
fetch('http://localhost:3000/recipe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    groceryList: ['chicken', 'broccoli', 'rice'],
  }),
});
```

### 2. Express Server Processes Request

```typescript
// src/index.ts
const result = await layer.chat({
  gateId: 'recipe-generation',
  data: {
    messages: [
      {
        role: 'system',
        content: 'You are a creative chef assistant...',
      },
      {
        role: 'user',
        content: `Generate a delicious recipe using these ingredients: ${groceryList.join(', ')}`,
      },
    ],
  },
});
```

### 3. Layer AI Handles Routing

Layer AI:
- Routes the request to your configured primary model
- Automatically handles retries and fallbacks if needed
- Tracks cost and usage
- Returns normalized response

### 4. Response Includes Metadata

The API returns the recipe content plus metadata about the request (model, cost, latency).

## Adapting to Firebase Functions

This Express.js code adapts to Firebase Functions with minimal changes:

**Express version (current):**

```typescript
// src/index.ts
app.post('/recipe', async (req: Request, res: Response) => {
  const { groceryList } = req.body;
  const result = await layer.chat({ gateId: 'recipe-generation', data: { messages } });
  res.json({ recipe: result.content, metadata: { ... } });
});
```

**Firebase Functions version:**

```typescript
// functions/src/index.ts
import { onRequest } from 'firebase-functions/v2/https';
import { layer } from './lib/layer';

export const generateRecipe = onRequest(async (req, res) => {
  const { groceryList } = req.body;
  const result = await layer.chat({ gateId: 'recipe-generation', data: { messages } });
  res.json({ recipe: result.content, metadata: { ... } });
});
```

**Key differences:**
- Import `onRequest` from Firebase Functions v2
- Wrap handler with `onRequest()` instead of `app.post()`
- Keep the exact same Layer AI integration code (no changes!)

The `layer` client initialization in `lib/layer.ts` stays identical.

## Demo Script for Client Presentation

### Setup (Before Demo)

1. ✅ Start the API: `pnpm dev`
2. ✅ Open Layer AI Dashboard: Show gates page
3. ✅ Prepare curl command or Postman/Insomnia request
4. ✅ Have 2-3 ingredient lists ready (simple → complex)

### Demo Flow (15-30 minutes)

**1. Introduction (2 min)**
- "Today I'm showing you Layer AI - it solves vendor lock-in for AI models"
- "We'll build a recipe generator, but this applies to any AI use case"

**2. Show the Problem (3 min)**
- "Normally, switching from GPT-4 to Claude requires:"
  - Code changes (import different SDK)
  - Testing
  - Deployment
  - Rollback plan if it fails
- "What if you want to experiment with 3 models? That's 3 deployments"

**3. Live Demo - First Request (5 min)**
- Send request with simple ingredients: `["chicken", "rice", "vegetables"]`
- Show response: recipe + metadata (model, cost, latency)
- Highlight: "GPT-4 took 1.8s and cost $0.002"

**4. Switch Models Live (5 min)**
- Open Layer AI Dashboard
- Switch gate to Claude Sonnet
- Send SAME request again (no code changes!)
- Show response: different recipe, different model, different cost
- **Key Point**: "No deployment. No code change. Just clicked a button."

**5. Show Dashboard Analytics (3 min)**
- Navigate to Analytics/Logs page
- Show both requests logged
- Cost comparison
- Latency comparison
- "Now you can make data-driven decisions about which model to use"

**6. Explain Fallbacks (2 min)**
- Show gate configuration with fallback models
- "If GPT-4 is down, it automatically tries Claude, then Gemini"
- "You never write fallback code - it's automatic"

**7. Firebase Adaptation (3 min)**
- Show the 3-line diff in README
- "The Layer AI code stays identical - just change the wrapper"
- "Works with Express, Firebase, AWS Lambda, any Node.js environment"

**8. Pricing Discussion (2 min)**
- "You pay Layer AI $29-99/month + actual model costs"
- "But you save:"
  - Engineering time (no SDK switching code)
  - Testing time (no redeployment risk)
  - Opportunity cost (experiment faster)

**9. Q&A (5+ min)**
- Common questions:
  - "What if Layer AI goes down?" → Direct API fallback option
  - "Can we self-host?" → Not currently, but data never stored
  - "What models are supported?" → OpenAI, Anthropic, Google, Mistral, more coming
  - "Does this work with streaming?" → Yes (not shown in this demo)

### Key Talking Points

✅ **Vendor Lock-in Solution**: Switch providers without code changes
✅ **Experimentation**: Test models side-by-side with production traffic
✅ **Cost Optimization**: Track costs per request, switch to cheaper models
✅ **Reliability**: Automatic fallbacks across providers
✅ **Analytics**: Built-in cost and performance tracking
✅ **Universal**: Works with any Node.js backend (Express, Firebase, Lambda)

### Demo Tips

- Have backup curl commands ready in case of network issues
- Show 2-3 model switches to really drive the point home
- Use ingredient lists they can relate to (their favorite meals)
- Emphasize "no deployment" repeatedly - this is the killer feature
- If they ask about their specific use case, translate recipe → their domain

## Customization

### Change the Gate

Update the gate name in [src/index.ts:36](src/index.ts#L36):

```typescript
const result = await layer.chat({
  gateId: 'your-gate-name', // Change this
  data: { messages },
});
```

### Modify the System Prompt

Customize the recipe generation style in [src/index.ts:38-42](src/index.ts#L38-L42):

```typescript
{
  role: 'system',
  content: 'Your custom instructions for recipe generation...',
}
```

### Add More Endpoints

Add additional endpoints for different use cases:

```typescript
app.post('/meal-plan', async (req, res) => {
  // Generate weekly meal plans
});

app.post('/nutrition', async (req, res) => {
  // Calculate nutrition info
});
```

## Deployment

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Deploy to Render

1. Create new Web Service
2. Connect your Git repository
3. Set build command: `pnpm build`
4. Set start command: `pnpm start`
5. Add environment variables

### Deploy to AWS Lambda

Use [Serverless Framework](https://www.serverless.com/) or AWS CDK to deploy as Lambda function.

## Troubleshooting

### "LAYER_API_KEY environment variable is required"

Make sure you created `.env.local` with your API key:

```bash
LAYER_API_KEY=layer_xxx
LAYER_API_URL=https://api.uselayer.ai
```

### "Gate not found" or 404 errors

Ensure you created a gate named `recipe-generation` in your Layer AI dashboard, or update the gate name in the code.

### TypeScript errors

Run `pnpm install` to ensure all dependencies are installed correctly.

### Port already in use

Change the port in `.env.local`:

```bash
PORT=3001
```

## Learn More

- [Layer AI Documentation](https://github.com/micah-nettey/layer-ai)
- [Layer AI SDK](https://www.npmjs.com/package/@layer-ai/sdk)
- [Express.js Documentation](https://expressjs.com/)
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)

## License

MIT
