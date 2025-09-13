# zkLogin Web Wallet

A minimal, clean-designed web wallet using zkLogin auth with Google oAuth, built for the Sui blockchain

## TODO

- [ ] zkLogin/Google auth flow
- [ ] Login screen & logout functionality (Navbar)
- [ ] Implement wallet page
- [ ] Implement balance viewing functionality
- [ ] Add transaction approval interface
- [ ] Deploy to Sui testnet (?)
- [ ] Create MPC.md

## Project Overview

Features:

- 🔐 **Google OAuth Authentication** - Secure login using existing Google credentials
- 💰 **Balance Viewing** - Display user's Sui token balances
- ✅ **Transaction Approval** - Approve and sign transactions
- 🎨 **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- 🌐 **Sui Testnet Integration** - Deployed and tested on Sui testnet

## Tech

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Blockchain**: Sui SDK (@mysten/sui)
- **Authentication**: zkLogin with Google OAuth
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/dbjowett/reimagined-robot.git
cd t3
```

2. Install dependencies:

```bash
pnpm install
```

3. Start server:

```bash
pnpm dev
```

4. Open `http://localhost:5173`
