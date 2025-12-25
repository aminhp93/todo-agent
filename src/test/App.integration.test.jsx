import { describe, it, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithClient } from './utils/test-utils'
import App from '../App'

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render the app with empty state', async () => {
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Agent Engineering Todo')).toBeInTheDocument()
    })
    
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })

  it('should show statistics', async () => {
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByText(/Total:/)).toBeInTheDocument()
      expect(screen.getByText(/Completed:/)).toBeInTheDocument()
      expect(screen.getByText(/Active:/)).toBeInTheDocument()
    })
  })

  it('should create a new todo', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'New Integration Test Todo')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('New Integration Test Todo')).toBeInTheDocument()
    })
  })

  it('should complete a todo', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    // Create a todo
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'Todo to complete')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('Todo to complete')).toBeInTheDocument()
    })
    
    // Complete it
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })

  it('should edit a todo', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    // Create a todo
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'Original Title')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('Original Title')).toBeInTheDocument()
    })
    
    // Edit it
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    const editInput = screen.getByDisplayValue('Original Title')
    await user.clear(editInput)
    await user.type(editInput, 'Edited Title{Enter}')
    
    await waitFor(() => {
      expect(screen.getByText('Edited Title')).toBeInTheDocument()
      expect(screen.queryByText('Original Title')).not.toBeInTheDocument()
    })
  })

  it('should delete a todo', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    // Create a todo
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'Todo to delete')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('Todo to delete')).toBeInTheDocument()
    })
    
    // Delete it
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    
    await waitFor(() => {
      expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument()
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
    })
  })

  it('should update statistics correctly', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    // Create two todos
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'Todo 1')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument()
    })
    
    await user.type(input, 'Todo 2')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('Todo 2')).toBeInTheDocument()
    })
    
    // Check stats - 2 total, 0 completed, 2 active
    expect(screen.getByText(/Total:/).parentElement).toHaveTextContent('2')
    expect(screen.getByText(/Active:/).parentElement).toHaveTextContent('2')
    expect(screen.getByText(/Completed:/).parentElement).toHaveTextContent('0')
    
    // Complete one
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Completed:/).parentElement).toHaveTextContent('1')
      expect(screen.getByText(/Active:/).parentElement).toHaveTextContent('1')
    })
  })

  it('should persist todos in localStorage', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    // Create a todo
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'Persistent Todo')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    await waitFor(() => {
      expect(screen.getByText('Persistent Todo')).toBeInTheDocument()
    })
    
    // Check localStorage
    const stored = JSON.parse(localStorage.getItem('todos-agent'))
    expect(stored).toHaveLength(1)
    expect(stored[0].title).toBe('Persistent Todo')
  })

  it('should handle multiple operations in sequence', async () => {
    const user = userEvent.setup()
    renderWithClient(<App />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    })
    
    const input = screen.getByPlaceholderText('Add a new todo...')
    
    // Create first todo
    await user.type(input, 'First')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await waitFor(() => expect(screen.getByText('First')).toBeInTheDocument())
    
    // Create second todo
    await user.type(input, 'Second')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await waitFor(() => expect(screen.getByText('Second')).toBeInTheDocument())
    
    // Complete first
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await waitFor(() => expect(checkboxes[0]).toBeChecked())
    
    // Delete second
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' })
    await user.click(deleteButtons[1])
    await waitFor(() => expect(screen.queryByText('Second')).not.toBeInTheDocument())
    
    // Only first todo should remain
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText(/Total:/).parentElement).toHaveTextContent('1')
  })
})
