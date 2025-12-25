# Quick Test Reference

## Run Tests

```bash
# Unit & Integration Tests
npm test                    # Run all tests
npm test -- --watch         # Watch mode (recommended for dev)
npm run test:ui             # Visual test runner
npm run test:coverage       # Generate coverage report

# E2E Tests  
npm run test:e2e            # Run all E2E tests
npm run test:e2e:ui         # Interactive UI mode
npm run test:e2e:headed     # See browser while running

# Specific Tests
npm test TodoForm.test      # Run specific file
npm test -- --grep="create" # Run tests matching pattern
npx playwright test --grep="complete todo"  # Specific E2E test
```

## Test Structure

```
src/
├── components/
│   ├── TodoForm.jsx          ← Component
│   └── TodoForm.test.jsx     ← Unit tests
├── services/
│   ├── todoService.js        ← Service
│   └── todoService.test.js   ← Unit tests
└── test/
    └── App.integration.test.jsx  ← Integration tests

e2e/
└── todo.spec.js              ← E2E tests
```

## Test Coverage

Current coverage targets:
- Services: 100%
- Components: 95%+
- Overall: 90%+

View coverage:
```bash
npm run test:coverage
open coverage/index.html
```

## Writing Tests

### Unit Test Template
```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ComponentName', () => {
  it('should do something', async () => {
    const user = userEvent.setup()
    render(<ComponentName />)
    
    await user.click(screen.getByRole('button'))
    
    expect(screen.getByText('Result')).toBeInTheDocument()
  })
})
```

### Integration Test Template
```javascript
import { renderWithClient } from './utils/test-utils'
import { waitFor } from '@testing-library/react'

it('should handle workflow', async () => {
  const user = userEvent.setup()
  renderWithClient(<App />)
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
  
  // Perform actions...
})
```

### E2E Test Template
```javascript
import { test, expect } from '@playwright/test'

test('should complete workflow', async ({ page }) => {
  await page.goto('/')
  
  await page.getByRole('button', { name: 'Add' }).click()
  
  await expect(page.getByText('Success')).toBeVisible()
})
```

## Debugging

### Vitest
```bash
# Verbose output
npm test -- --reporter=verbose

# Run single test
npm test -- -t "test name"

# Debug specific test
node --inspect-brk ./node_modules/vitest/vitest.js
```

In code:
```javascript
screen.debug()  // Print DOM
```

### Playwright
```bash
# Debug mode
npx playwright test --debug

# Headed browser
npm run test:e2e:headed

# Specific browser
npx playwright test --project=chromium
```

In code:
```javascript
await page.pause()  // Pause for inspection
```

## Common Issues

**Tests timing out?**
```javascript
test('slow test', async () => {
  // ...
}, 10000) // Increase timeout
```

**Element not found?**
```javascript
await waitFor(() => {
  expect(screen.getByText('Text')).toBeInTheDocument()
})
```

**Playwright browser issues?**
```bash
npx playwright install
```

## Before Committing

Run this checklist:

```bash
# 1. All unit/integration tests pass
npm test

# 2. E2E tests pass  
npm run test:e2e

# 3. Check coverage (should be >90%)
npm run test:coverage

# 4. No warnings in console
npm run build
```

## CI/CD

Tests run automatically on:
- Push to any branch
- Pull requests
- Before deployment

Local test commands mirror CI behavior.

## Resources

- Full docs: [TESTING.md](./TESTING.md)
- Vitest: https://vitest.dev/
- Testing Library: https://testing-library.com/
- Playwright: https://playwright.dev/
