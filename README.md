# TruLoop: Product Review Platform

[![CI](https://github.com/pandeynikhilone/truloop/actions/workflows/ci.yml/badge.svg)](https://github.com/pandeynikhilone/truloop/actions/workflows/ci.yml)

TruLoop is a full-stack project for browsing products and sharing detailed reviews based on real usage. The goal is to make it easier to compare products using practical feedback instead of relying only on marketing copy.

## Current features and scope

- Browse products and their specifications.
- Read and submit product reviews.
- Use a component-based Next.js frontend.
- Use an Express API and MongoDB for application data.
- Includes receipt-text checks for uploaded proof. These checks are basic validation and should not be treated as proof that a purchase is genuine.

## Tech stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Other libraries:** JSON Web Tokens, bcryptjs, Cloudinary, Tesseract.js, pdf-parse

## Project structure

```text
truloop/
├── frontend/       # Next.js application
├── backend/        # Express API
├── package.json    # Root scripts and backend workspace
└── package-lock.json
```

## Requirements

- Node.js 20.19 or later is recommended.
- npm

## Run locally

Install the root/backend dependencies, then install the frontend dependencies:

```bash
npm ci
npm run install:frontend
```

Create local environment files from the example files where available. Do not commit real tokens, database credentials, or provider API keys. The backend and frontend each need their own environment configuration. Copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env`, then update the values for your setup.

Start both services from the repository root:

```bash
npm run dev
```

The frontend normally starts at [http://localhost:3000](http://localhost:3000), and the backend uses port 5000 unless configured otherwise.

You can also run each service separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Build and test

```bash
npm run build
npm test
```

The build command creates the production frontend build. The test command runs focused Node.js tests for receipt-proof validation guardrails that do not require a database, OCR run, or third-party credentials. GitHub Actions also performs clean dependency installs and checks backend JavaScript syntax.

The Express backend runs directly on Node. Receipt text matching is heuristic validation, not proof that a purchase is genuine.js and does not need a separate compilation step. For a production run, configure the environment variables and start the frontend and backend using your deployment platform's service commands.

## Before deploying

- Configure allowed frontend origins in the backend CORS settings.
- Use strong, unique secrets for JWT signing and external services.
- Validate and limit uploaded files on the server.
- Test authentication, review submission, and error responses.
- Do not treat receipt OCR or keyword matching as proof of purchase authenticity.

## Links

- [Source code](https://github.com/pandeynikhilone/truloop)
- [Live demo](https://truloop.vercel.app/)
