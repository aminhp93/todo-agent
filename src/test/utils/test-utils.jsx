import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}, // Suppress error logs in tests
    },
  })
}

export function renderWithClient(ui, client) {
  const testQueryClient = client || createTestQueryClient()
  
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  )
}

export const mockTodos = [
  {
    id: '1',
    title: 'Test todo 1',
    completed: false,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Test todo 2',
    completed: true,
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Test todo 3',
    completed: false,
    createdAt: '2024-01-03T00:00:00.000Z',
  },
]
