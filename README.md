# zkLogin Web Wallet

A minimal, clean-designed web wallet using zkLogin auth with Google oAuth, built for the Sui blockchain

## TODO

- [x] zkLogin/Google auth flow
- [x] Login screen & logout functionality (Navbar)
- [x] Implement wallet page
- [x] Implement balance viewing functionality
- [ ] Add transaction approval interface
- [ ] Deploy to Sui testnet (?)
- [ ] Create MPC.md

## Project Overview

Features:

- **Google OAuth Authentication** - Secure login using existing Google credentials
- **Balance Viewing** - Display user's Sui token balances
- **Transaction Approval** - Approve and sign transactions
- **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- **Sui Testnet Integration** - Deployed and tested on Sui testnet

## Tech

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Blockchain**: Sui SDK (@mysten/sui)
- **Authentication**: zkLogin with Google OAuth
- **Icons**: Lucide React

## Project Structure

```
src/
├── api/                # Api Requests
├── components/         # React components
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started (Docker instructions below)

1. Clone the repository:

```bash
git clone https://github.com/dbjowett/reimagined-robot.git
cd t3
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy example .env

```bash
cp .env.sample .env
```

4. Update Google Client URL inside `/.env` file

```bash
VITE_GOOGLE_CLIENT_ID=<CLIENT_ID>
```

4.  Start server:

```bash
pnpm dev
```

4. Open `http://localhost:5173`

## Getting Started with Docker

1. Clone the repository:

```bash
git clone https://github.com/dbjowett/reimagined-robot.git
cd t3
```

2. Build the Docker container (make sure Docker Daemon is running)

```
docker build -t my-sui-wallet .
```

3. Run the Docker container

```
docker run -it -p 5173:5173 my-sui-wallet
```

4. Open `http://localhost:5173`
