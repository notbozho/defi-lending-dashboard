# 🏦 DeFi Lending Dashboard

A modern, production-ready DeFi lending dashboard for monitoring and analyzing Aave V3 markets across multiple chains. Built with Next.js 16, this application provides real-time insights into lending pools, reserve data, user positions, and market analytics with a polished UI/UX.

## 📸 Preview

![Dashboard](/preview/dashboard.png)
_Main dashboard view showing market overview_

![Reserves](/preview/reserves.png)
_Reserve list with detailed metrics_

![Reserve Overview](/preview/reserve_overview.png)
_Individual reserve analytics_

## ✨ Features

- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, and Sepolia testnet
- **Real-Time Market Data**: Live APY rates, liquidity, utilization rates, and more
- **Reserve Analytics**: Detailed information on each lending pool reserve
- **User Positions**: Track your supplied assets and borrowed positions
- **Interactive Tables**: Sortable, filterable data tables with search functionality
- **Wallet Integration**: Connect with multiple wallets via RainbowKit
- **Smooth Micro-Interactions**: Animations powered by Motion (prev. Framer Motion)
- **Dark/Light Mode**: Theme switching with system preference detection
- **Type-Safe**: Full TypeScript coverage with strict type checking
- **Comprehensive Testing**: Unit, integration, and E2E tests with coverage reporting

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/defi-lending-dashboard.git
cd defi-lending-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📋 Available Scripts

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Testing

```bash
npm test             # Run unit tests in watch mode
npm run test:run     # Run unit tests once
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run e2e          # Run end-to-end tests
npm run e2e:ui       # Run E2E tests with UI
```

### Code Quality

```bash
npm run lint         # Lint codebase
npm run check        # TypeScript type checking
npm run commit       # Conventional commits with Commitizen
```

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - UI library with React Compiler
- **TypeScript 5** - Type-safe development

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Motion (Framer Motion)** - Animation library
- **Radix UI** - Unstyled accessible components
- **React Icons** - Icon library

### Data & State Management

- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state management
- **Aave SDK (@aave/react)** - Aave protocol integration
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library

### Web3 Integration

- **RainbowKit** - Wallet connection UI
- **wagmi** - Ethereum React hooks
- **viem** - Ethereum interaction library
- **aave-sdk** - Aave protocol SDK
- **Aave Address Book** - Official Aave contract addresses

### Data Visualization

- **Recharts** - Charting library
- **TanStack Table** - Headless table library

### Testing

- **Vitest** - Unit and integration testing
- **Playwright** - End-to-end testing
- **React Testing Library** - Component testing
- **@vitest/ui** - Test UI dashboard

### Developer Experience

- **ESLint 9** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Staged file linting
- **Commitizen** - Conventional commits

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (market)/          # Market-specific pages
│   ├── components/        # Page-level components
│   └── lib/              # App-level utilities
├── components/            # Shared React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── config/               # Configuration files
│   ├── markets.ts        # Aave market configurations
│   └── networks.ts       # Network configurations
├── context/              # React Context providers
├── hooks/                # Custom React hooks
│   ├── aave/            # Aave-specific hooks
│   ├── web3/            # Web3 hooks
│   └── ui/              # UI utility hooks
├── lib/                  # Core libraries
│   ├── aave/            # Aave SDK integration
│   ├── web3/            # Web3 utilities
│   └── types/           # Type definitions
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

### Supported Markets

- **Ethereum Mainnet** - Aave V3 Core
- **Polygon** - Aave V3 Polygon
- **Arbitrum** - Aave V3 Arbitrum
- **Sepolia Testnet** - Aave V3 Sepolia (for testing)

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and utility function tests using Vitest
- **Integration Tests**: Feature integration tests
- **E2E Tests**: Full user flow tests using Playwright
- **Coverage Reports**: HTML coverage reports with v8

Run tests with coverage:

```bash
npm run test:coverage
```

View coverage report:

```bash
open coverage/index.html
```

## 🎨 Code Style

This project follows strict code style guidelines:

- **TypeScript**: Type-only imports, namespace props pattern
- **React**: Function components with explicit return types
- **Tailwind**: v4 syntax with utility-first approach
- **Formatting**: Prettier with Tailwind plugin
- **Commits**: Conventional commits enforced via Commitizen

See [AGENTS.md](./AGENTS.md) for detailed guidelines.

## 📦 Architecture

### Data Fetching Pattern

The application uses a three-layer architecture:

1. **Fetchers** (`lib/aave/fetchers/`) - Raw data fetching from Aave SDK
2. **Mappers** (`lib/aave/mappers/`) - Transform raw data to UI-friendly format
3. **Hooks** (`hooks/aave/`) - React Query hooks for caching and state management

Example:

```typescript
// Fetcher
export async function fetchReserves(config) { ... }

// Mapper
export function mapReservesToUI(reserves) { ... }

// Hook
export function useReserves() {
  return useQuery({
    queryKey: ['reserves'],
    queryFn: () => fetchReserves().then(mapReservesToUI)
  })
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `npm run commit`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

All commits must follow conventional commits format.

## 🙏 Acknowledgments

- [Aave Protocol](https://aave.com/) - Decentralized lending protocol
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Vercel](https://vercel.com/) - Hosting and deployment platform
