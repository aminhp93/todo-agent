import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from '../TodoForm'

describe('TodoForm', () => {
  it('should render input and button', () => {
    render(<TodoForm onSubmit={vi.fn()} isLoading={false} />)
    
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('should call onSubmit with trimmed value', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<TodoForm onSubmit={onSubmit} isLoading={false} />)
    
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, '  New Todo  ')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    expect(onSubmit).toHaveBeenCalledWith('New Todo')
  })

  it('should clear input after submission', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<TodoForm onSubmit={onSubmit} isLoading={false} />)
    
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'New Todo')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    expect(input).toHaveValue('')
  })

  it('should not submit empty todo', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<TodoForm onSubmit={onSubmit} isLoading={false} />)
    
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should not submit whitespace-only todo', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<TodoForm onSubmit={onSubmit} isLoading={false} />)
    
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should disable input and button when loading', () => {
    render(<TodoForm onSubmit={vi.fn()} isLoading={true} />)
    
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeDisabled()
  })

  it('should show loading text when submitting', () => {
    render(<TodoForm onSubmit={vi.fn()} isLoading={true} />)
    
    expect(screen.getByText('Adding...')).toBeInTheDocument()
  })

  it('should handle Enter key submission', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<TodoForm onSubmit={onSubmit} isLoading={false} />)
    
    const input = screen.getByPlaceholderText('Add a new todo...')
    await user.type(input, 'New Todo{Enter}')
    
    expect(onSubmit).toHaveBeenCalledWith('New Todo')
  })
})
