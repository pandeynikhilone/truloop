# Truloop: Real Reviews from Real People

Tired of sifting through sponsored posts and fake reviews? Truloop is here to change that. We're building a community-driven platform dedicated to providing honest, unbiased, and real-world product reviews. Our mission is to empower consumers to make informed decisions based on authentic user experiences.

## The Problem

In today's saturated online market, it's increasingly difficult to find trustworthy information about products. Marketing fluff and incentivized reviews often drown out the voices of genuine users, making it a challenge to know what you're *really* buying.

## Our Solution

Truloop cuts through the noise. We provide a platform where you can:

1. Discover Products: Browse a growing catalog of products.
2. Get the Specs: View detailed product information and specifications.
3. Read Honest Reviews: Access in-depth reviews from real users who share their genuine experiences—the good, the bad, and the buggy.
4. Share Your Voice: Contribute to the community by writing your own detailed reviews and sharing your unique perspective.

We believe in the power of authentic feedback. That's why we encourage our users to share their "real usage experience," focusing on everything from battery life to software stability.

## Project Structure

```
truloop/
├── frontend/          # Next.js frontend application
├── backend/           # Express backend API
├── package.json       # Workspace configuration
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- A package manager: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### Option 1: Run Both Services Together (Recommended)

Install workspace dependencies and run both frontend and backend concurrently:

```bash
npm install
npm run dev
```

### Option 2: Run Services Separately

**Backend:**
```bash
cd backend
npm install
npm run dev
```
The backend will be running on port 8080 by default.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Once both services are running, open [http://localhost:3000](http://localhost:3000) in your browser to see the Truloop application.

## Available Scripts

From the root directory:
- `npm run dev` - Run both frontend and backend concurrently
- `npm run dev:frontend` - Run only the frontend
- `npm run dev:backend` - Run only the backend
- `npm run build:frontend` - Build the frontend for production
- `npm run start:frontend` - Start the frontend production server

