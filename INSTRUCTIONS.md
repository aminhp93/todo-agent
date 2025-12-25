# Agent Engineering Todo App - Project Instructions

## Overview
This is an Agent Engineering project inspired by the LangChain blog post on "Agent Engineering: A New Discipline". The project demonstrates a simple todo list application with full CRUD functionality using modern React patterns.

## Tech Stack
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework
- **Local Storage** - Data persistence (simulating API)
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

## Project Structure
```
todo-agent/
├── src/
│   ├── components/          # UI Components
│   │   ├── TodoForm.jsx     # Form for creating new todos
│   │   ├── TodoForm.test.jsx
│   │   ├── TodoItem.jsx     # Individual todo item
│   │   ├── TodoItem.test.jsx
│   │   ├── TodoList.jsx     # List container
│   │   └── TodoList.test.jsx
│   ├── hooks/               # React Query hooks
│   │   └── useTodos.js      # Custom hooks for data operations
│   ├── services/            # Data layer
│   │   ├── todoService.js   # API service layer (localStorage)
│   │   └── todoService.test.js
│   ├── test/                # Test utilities
│   │   ├── setup.js         # Test configuration
│   │   ├── utils/
│   │   │   └── test-utils.jsx
│   │   └── App.integration.test.jsx
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── e2e/                     # E2E tests
│   └── todo.spec.js
├── coverage/                # Test coverage reports
├── playwright-report/       # E2E test reports
├── index.html
├── package.json
├── vite.config.js
├── playwright.config.js
├── tailwind.config.js
├── postcss.config.js
├── TESTING.md               # Testing documentation
└── INSTRUCTIONS.md          # This file
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd /Users/minhpham/working/agent/todo-agent
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will run on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Tests
```bash
# Unit & Integration tests
npm test

# Tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

See [TESTING.md](./TESTING.md) for comprehensive testing guide.

## Features

### CRUD Operations
1. **Create**: Add new todos using the input form
2. **Read**: View all todos with their completion status
3. **Update**: 
   - Toggle completion by clicking checkbox
   - Edit todo title by clicking "Edit" or double-clicking the text
4. **Delete**: Remove todos with the delete button

### Agent Engineering Principles Applied

This project follows agent engineering concepts from the LangChain blog:

1. **Separation of Concerns**
   - Services layer (`todoService.js`) handles data operations
   - Hooks layer (`useTodos.js`) manages React Query integration
   - Components focus purely on UI

2. **Declarative State Management**
   - TanStack Query handles caching, loading states, and optimistic updates
   - No manual state synchronization needed

3. **Predictable Data Flow**
   - All mutations invalidate queries automatically
   - Consistent loading and error states

4. **Testability**
   - Each layer can be tested independently
   - Service layer is framework-agnostic
   - Comprehensive test coverage at all levels
   - Tests document expected behavior

## Key Concepts

### TanStack Query (React Query)
- **Queries**: Fetching and caching data (`useTodos`)
- **Mutations**: Creating, updating, deleting data
- **Automatic Refetching**: Query invalidation on mutations
- **Optimistic Updates**: Can be added for better UX

### Component Architecture
- **TodoForm**: Controlled input with form submission
- **TodoList**: Maps over todos array
- **TodoItem**: Individual todo with inline editing

### State Management
- TanStack Query manages server state (todos)
- Local component state for UI (editing mode, input values)
- No global state management needed for this simple app

## Working with This Context

### Adding New Features

**Example: Add Priority Field**
```javascript
// 1. Update service (todoService.js)
createTodo: async (title, priority = 'medium') => {
  const newTodo = {
    id: Date.now().toString(),
    title,
    priority, // Add priority
    completed: false,
    createdAt: new Date().toISOString(),
  };
  // ... rest of code
}

// 2. Update component (TodoForm.jsx)
// Add priority dropdown to form

// 3. Update display (TodoItem.jsx)
// Show priority badge
```

### Debugging Tips

1. **Check Browser Console**: React Query DevTools can be added for debugging
2. **Local Storage**: View `todos-agent` key in Application tab
3. **Network Tab**: Service layer simulates 300ms API delay

### Common Tasks

**Clear All Todos**
```javascript
localStorage.removeItem('todos-agent');
```

**Add React Query DevTools**
```bash
npm install @tanstack/react-query-devtools
```
```javascript
// In main.jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Add to App component: <ReactQueryDevtools />
```

**Modify API Delay**
```javascript
// In todoService.js, change timeout duration
await new Promise(resolve => setTimeout(resolve, 300)); // Change 300 to desired ms
```

## Agent Engineering Best Practices

1. **Keep Services Pure**: Services should be framework-agnostic
2. **Use Hooks for Integration**: React-specific logic stays in hooks
3. **Component Simplicity**: Components receive data and callbacks, minimal logic
4. **Consistent Error Handling**: Handle errors at the query level
5. **Optimistic Updates**: Consider for better UX (can be added to mutations)

## Extension Ideas

- [ ] Add filtering (All, Active, Completed)
- [ ] Add sorting (Date, Alphabetical, Priority)
- [ ] Add categories/tags
- [ ] Add due dates
- [ ] Add priority levels
- [ ] Add search functionality
- [ ] Add bulk operations
- [ ] Add undo/redo
- [ ] Persist to backend API
- [ ] Add authentication
- [ ] Add collaborative features

## Testing

The project includes comprehensive testing at three levels:

### Unit Tests
- Service layer tests (`todoService.test.js`)
- Component tests (`*.test.jsx`)
- Fast, isolated, covers edge cases

### Integration Tests
- Full app workflow tests (`App.integration.test.jsx`)
- Tests component interactions
- Validates data flow through layers

### E2E Tests
- Real browser tests (`e2e/todo.spec.js`)
- User workflow validation
- Cross-browser testing (Chrome, Firefox, Safari)

**Quick Commands:**
```bash
npm test                  # Run unit & integration tests
npm run test:ui           # Visual test runner
npm run test:coverage     # Coverage report
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui       # E2E tests in UI mode
```

For detailed testing guide, see [TESTING.md](./TESTING.md)

## Resources

- [LangChain Agent Engineering Blog](https://blog.langchain.com/agent-engineering-a-new-discipline/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Docs](https://playwright.dev/)

## Notes for AI Assistant

When working with this project in future conversations:
- Project location: `/Users/minhpham/working/agent/todo-agent`
- Main patterns: Service layer → Hooks → Components
- State management: TanStack Query for server state, local state for UI
- All data operations go through `todoService.js`
- Mutations auto-invalidate queries for fresh data
- Components are presentational and receive data via props
- Testing: Vitest for unit/integration, Playwright for E2E
- Test coverage targets: Services 100%, Components 95%+, Overall 90%+
- When adding features, write tests first (TDD approach)
- All tests should pass before committing (`npm test && npm run test:e2e`)
