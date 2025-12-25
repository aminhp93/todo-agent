import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../TodoItem'

const mockTodo = {
  id: '1',
  title: 'Test Todo',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
}

describe('TodoItem', () => {
  it('should render todo title', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

  it('should show checkbox with correct state', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should call onUpdate when checkbox is toggled', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(onUpdate).toHaveBeenCalledWith({
      id: '1',
      updates: { completed: true }
    })
  })

  it('should show line-through for completed todos', () => {
    const completedTodo = { ...mockTodo, completed: true }
    
    render(
      <TodoItem
        todo={completedTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    const title = screen.getByText('Test Todo')
    expect(title).toHaveClass('line-through')
  })

  it('should call onDelete when delete button clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={onDelete}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('should enter edit mode when Edit button clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    const input = screen.getByDisplayValue('Test Todo')
    expect(input).toBeInTheDocument()
    expect(input).toHaveFocus()
  })

  it('should enter edit mode when double-clicking title', async () => {
    const user = userEvent.setup()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    const title = screen.getByText('Test Todo')
    await user.dblClick(title)
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument()
  })

  it('should call onUpdate when edit is saved', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    const input = screen.getByDisplayValue('Test Todo')
    await user.clear(input)
    await user.type(input, 'Updated Todo')
    await user.tab() // Blur the input
    
    expect(onUpdate).toHaveBeenCalledWith({
      id: '1',
      updates: { title: 'Updated Todo' }
    })
  })

  it('should save edit on Enter key', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    const input = screen.getByDisplayValue('Test Todo')
    await user.clear(input)
    await user.type(input, 'Updated Todo{Enter}')
    
    expect(onUpdate).toHaveBeenCalledWith({
      id: '1',
      updates: { title: 'Updated Todo' }
    })
  })

  it('should cancel edit on Escape key', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    const input = screen.getByDisplayValue('Test Todo')
    await user.clear(input)
    await user.type(input, 'Updated Todo{Escape}')
    
    expect(onUpdate).not.toHaveBeenCalled()
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

  it('should not save empty title', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={false}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    const input = screen.getByDisplayValue('Test Todo')
    await user.clear(input)
    await user.tab()
    
    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('should disable controls when updating', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={true}
        isDeleting={false}
      />
    )
    
    expect(screen.getByRole('checkbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeDisabled()
  })

  it('should show deleting text when deleting', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        isUpdating={false}
        isDeleting={true}
      />
    )
    
    expect(screen.getByText('Deleting...')).toBeInTheDocument()
  })
})
