# zkLogin Web Wallet

A minimal, clean-designed web wallet using zkLogin auth with Google oAuth, built for the Sui blockchain

## TODO

- [x] zkLogin/Google auth flow
- [x] Login screen & logout functionality (Navbar)
- [x] Implement wallet page
- [x] Implement balance viewing functionality
- [x] Add transaction approval
- [x] Deploy to Sui testnet (?)
- [x] Create MPC.md
- [ ] Funds should be subtracted from balance when sent

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

4. Update Google Client URL inside `/.env` file (See create new client id)

```bash
VITE_GOOGLE_CLIENT_ID=<CLIENT_ID>
```

4. Start server:

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

2. Copy .env.sample to .env

```bash
cp .env.sample .env
```

3. Update Google Client URL inside `/.env` file (See create new client id)

```bash
VITE_GOOGLE_CLIENT_ID=<CLIENT_ID>
```

4. Build the Docker container (make sure Docker Daemon is running)

```
docker build -t my-sui-wallet .
```

5. Run the Docker container

```
docker run -it -p 5173:5173 my-sui-wallet
```

6. Open `http://localhost:5173`

### Create New Client ID

1. Navigate to Google Cloud Console
2. Create New Project and set it to active
3. Navigate to `APIs and services` -> `Credentials`
4. Click `Create credentials` -> `OAuth Client Id` -> `Configure consent screen` (follow flow)
5. On Create OAuth Client ID screen:

- Application Type: Web application
- Authorized Javascript origins: `http://localhost:5173`
- Authorized redirect URLs: `http://localhost:5173/callback`
- Save & copy client id.
