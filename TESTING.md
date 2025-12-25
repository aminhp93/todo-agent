# Testing Documentation

## Overview
This project includes comprehensive testing at three levels:
1. **Unit Tests** - Individual components and services
2. **Integration Tests** - Component interactions and data flow
3. **E2E Tests** - Full user workflows in real browser

## Tech Stack
- **Vitest** - Unit and integration testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing
- **@vitest/ui** - Visual test runner
- **@vitest/coverage-v8** - Code coverage reporting

## Running Tests

### Unit & Integration Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test src/services/todoService.test.js

# Run tests matching pattern
npm test -- --grep="TodoForm"
```

### E2E Tests

```bash
# Run all E2E tests (starts dev server automatically)
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test e2e/todo.spec.js
```

## Test Structure

### Unit Tests

#### Service Tests (`src/services/todoService.test.js`)
Tests the data layer in isolation:
- ✅ Getting todos from localStorage
- ✅ Creating new todos
- ✅ Updating existing todos
- ✅ Deleting todos
- ✅ Error handling for invalid data

**Example:**
```javascript
it('should create a new todo', async () => {
  const title = 'New Todo'
  const todo = await todoService.createTodo(title)
  
  expect(todo).toMatchObject({
    title,
    completed: false,
  })
  expect(todo.id).toBeDefined()
})
```

#### Component Tests
Each component has comprehensive unit tests:

**TodoForm.test.jsx**
- Input rendering and interaction
- Form submission with valid/invalid data
- Loading states
- Keyboard interactions (Enter key)

**TodoItem.test.jsx**
- Rendering todo data
- Checkbox toggle
- Edit mode (click Edit button, double-click text)
- Save/cancel edit (Enter/Escape keys)
- Delete functionality
- Disabled states

**TodoList.test.jsx**
- Empty state display
- Rendering multiple todos
- Props passing to child components

### Integration Tests (`src/test/App.integration.test.jsx`)

Tests component interactions and data flow:
- ✅ Creating todos through the form
- ✅ Completing/uncompleting todos
- ✅ Editing todo titles
- ✅ Deleting todos
- ✅ Statistics updates
- ✅ Multiple operations in sequence
- ✅ localStorage persistence

**Example:**
```javascript
it('should create a new todo', async () => {
  const user = userEvent.setup()
  renderWithClient(<App />)
  
  const input = screen.getByPlaceholderText('Add a new todo...')
  await user.type(input, 'New Todo')
  await user.click(screen.getByRole('button', { name: 'Add' }))
  
  await waitFor(() => {
    expect(screen.getByText('New Todo')).toBeInTheDocument()
  })
})
```

### E2E Tests (`e2e/todo.spec.js`)

Real browser tests covering full user workflows:
- ✅ App loads correctly
- ✅ Initial state and statistics
- ✅ Creating todos
- ✅ Empty input validation
- ✅ Completing/uncompleting todos
- ✅ Editing todos (button click, double-click, Enter/Escape)
- ✅ Deleting todos
- ✅ Multiple todo management
- ✅ Statistics accuracy
- ✅ Persistence across page reloads
- ✅ Loading states
- ✅ Rapid operations
- ✅ Visual feedback (strikethrough for completed)
- ✅ Input trimming

**Example:**
```javascript
test('should complete a todo', async ({ page }) => {
  await page.goto('/')
  
  const input = page.getByPlaceholder('Add a new todo...')
  await input.fill('Todo to complete')
  await page.getByRole('button', { name: 'Add' }).click()

  const checkbox = page.getByRole('checkbox')
  await checkbox.check()

  await expect(checkbox).toBeChecked()
  await expect(page.getByText('Completed: 1')).toBeVisible()
})
```

## Test Coverage

Run coverage report:
```bash
npm run test:coverage
```

Current coverage targets:
- Services: 100%
- Components: 95%+
- Hooks: 90%+
- Overall: 90%+

Coverage report is generated in `coverage/` directory:
- `coverage/index.html` - Visual HTML report
- `coverage/coverage-final.json` - JSON data

## Testing Best Practices

### Writing Tests

1. **Arrange-Act-Assert Pattern**
   ```javascript
   it('should do something', async () => {
     // Arrange - Set up test data
     const user = userEvent.setup()
     render(<Component />)
     
     // Act - Perform action
     await user.click(screen.getByRole('button'))
     
     // Assert - Verify result
     expect(screen.getByText('Result')).toBeInTheDocument()
   })
   ```

2. **Use Testing Library Queries** (in order of preference)
   - `getByRole` - Most accessible
   - `getByLabelText` - For forms
   - `getByPlaceholderText` - For inputs
   - `getByText` - For content
   - `getByTestId` - Last resort

3. **Async Operations**
   ```javascript
   // Wait for element to appear
   await waitFor(() => {
     expect(screen.getByText('Loaded')).toBeInTheDocument()
   })
   
   // User interactions are async
   await user.click(button)
   await user.type(input, 'text')
   ```

4. **Test Isolation**
   - Each test should be independent
   - Clean up after tests (done automatically)
   - Don't rely on test execution order

### Common Patterns

**Testing Form Submission:**
```javascript
const input = screen.getByPlaceholderText('Add a new todo...')
await user.type(input, 'My Todo')
await user.click(screen.getByRole('button', { name: 'Add' }))
```

**Testing State Updates:**
```javascript
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

**Testing with React Query:**
```javascript
import { renderWithClient } from './test/utils/test-utils'

const client = createTestQueryClient()
renderWithClient(<App />, client)
```

**Playwright Page Navigation:**
```javascript
test('test name', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button').click()
  await expect(page.getByText('Result')).toBeVisible()
})
```

## Debugging Tests

### Vitest

```bash
# Run with verbose output
npm test -- --reporter=verbose

# Run single test
npm test -- -t "test name"

# Debug with Node inspector
node --inspect-brk ./node_modules/vitest/vitest.js
```

**In test file:**
```javascript
import { screen } from '@testing-library/react'

// Print current DOM
screen.debug()

// Print specific element
screen.debug(screen.getByRole('button'))
```

### Playwright

```bash
# Run with headed browser to see what's happening
npm run test:e2e:headed

# Run with Playwright Inspector
npx playwright test --debug

# Run specific test in debug mode
npx playwright test --debug -g "test name"
```

**In test file:**
```javascript
// Add pause to inspect
await page.pause()

// Take screenshot
await page.screenshot({ path: 'screenshot.png' })

// Get page state
console.log(await page.content())
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      
      # Unit & Integration Tests
      - run: npm test -- --coverage
      
      # E2E Tests
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      # Upload coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Continuous Testing Workflow

### During Development

1. **Run tests in watch mode**
   ```bash
   npm test -- --watch
   ```

2. **Focus on current work**
   ```javascript
   // Use .only to run specific test
   it.only('should test current feature', () => {
     // ...
   })
   ```

3. **Skip broken tests temporarily**
   ```javascript
   // Use .skip (but fix soon!)
   it.skip('should be fixed later', () => {
     // ...
   })
   ```

### Before Committing

1. Run all tests:
   ```bash
   npm test
   ```

2. Run E2E tests:
   ```bash
   npm run test:e2e
   ```

3. Check coverage:
   ```bash
   npm run test:coverage
   ```

### Adding New Features

1. **Write test first (TDD)**
   ```javascript
   it('should do new thing', () => {
     // Test that fails
   })
   ```

2. **Implement feature**
   - Make test pass
   - Keep coverage high

3. **Refactor**
   - Tests ensure nothing breaks

## Troubleshooting

### Common Issues

**Tests timeout**
```javascript
// Increase timeout for slow operations
test('slow test', async () => {
  // ...
}, 10000) // 10 second timeout
```

**Element not found**
```javascript
// Make sure to wait for async operations
await waitFor(() => {
  expect(screen.getByText('Text')).toBeInTheDocument()
})
```

**Playwright connection issues**
```bash
# Reinstall browsers
npx playwright install
```

**Mock issues**
```javascript
// Clear mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [React Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing)

## Metrics to Track

- Test count by type
- Code coverage percentage
- Test execution time
- Flaky test rate
- E2E test pass rate

Regular review and maintenance of tests ensures they remain valuable and don't become a burden.
