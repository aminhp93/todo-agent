import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
  localStorage.clear()
})

// Mock localStorage
beforeEach(() => {
  localStorage.clear()
})
