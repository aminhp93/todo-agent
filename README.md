# Todo Agent - Agent Engineering Demo

A simple todo list application demonstrating Agent Engineering principles with React, TanStack Query, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

Visit `http://localhost:3000` to see the app.

## Features

- ✅ Create todos
- ✅ Read/List todos with stats
- ✅ Update todos (edit title, toggle completion)
- ✅ Delete todos
- ✅ Persistent storage (localStorage)
- ✅ Loading states and error handling
- ✅ Clean, modern UI with Tailwind

## Tech Stack

- React 18
- Vite
- TanStack Query (React Query)
- Tailwind CSS
- Vitest + React Testing Library (Unit/Integration Tests)
- Playwright (E2E Tests)

## Architecture

The project follows Agent Engineering principles with clear separation of concerns:

- **Services** (`src/services/`) - Data operations (API/storage layer)
- **Hooks** (`src/hooks/`) - React Query integration
- **Components** (`src/components/`) - UI presentation

## Documentation

- [INSTRUCTIONS.md](./INSTRUCTIONS.md) - Complete development guide
- [TESTING.md](./TESTING.md) - Comprehensive testing documentation

## Testing

This project has comprehensive test coverage:

- **Unit Tests** - Service layer and components
- **Integration Tests** - Full application workflows  
- **E2E Tests** - Real browser testing with Playwright

```bash
npm test              # Unit & integration tests
npm run test:ui       # Visual test runner
npm run test:coverage # Coverage report
npm run test:e2e      # E2E tests
```

## Agent Engineering

This project is inspired by the [LangChain blog post on Agent Engineering](https://blog.langchain.com/agent-engineering-a-new-discipline/), applying those principles to a simple React application for better maintainability and scalability.
