import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'

const mockTodos = [
  {
    id: '1',
    title: 'Todo 1',
    completed: false,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Todo 2',
    completed: true,
    createdAt: '2024-01-02T00:00:00.000Z',
  },
]

describe('TodoList', () => {
  it('should render empty state when no todos', () => {
    render(<TodoList todos={[]} onUpdate={vi.fn()} onDelete={vi.fn()} />)
    
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })

  it('should render all todos', () => {
    render(<TodoList todos={mockTodos} onUpdate={vi.fn()} onDelete={vi.fn()} />)
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 2')).toBeInTheDocument()
  })

  it('should pass correct props to TodoItem', () => {
    const onUpdate = vi.fn()
    const onDelete = vi.fn()
    
    render(<TodoList todos={mockTodos} onUpdate={onUpdate} onDelete={onDelete} />)
    
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(2)
  })

  it('should render todos in order', () => {
    render(<TodoList todos={mockTodos} onUpdate={vi.fn()} onDelete={vi.fn()} />)
    
    const todos = screen.getAllByRole('checkbox')
    expect(todos[0]).not.toBeChecked() // Todo 1 not completed
    expect(todos[1]).toBeChecked() // Todo 2 completed
  })
})
