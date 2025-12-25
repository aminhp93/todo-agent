import { describe, it, expect, beforeEach, vi } from 'vitest'
import { todoService } from '../todoService'

describe('todoService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllTimers()
  })

  describe('getTodos', () => {
    it('should return empty array when no todos exist', async () => {
      const todos = await todoService.getTodos()
      expect(todos).toEqual([])
    })

    it('should return todos from localStorage', async () => {
      const mockTodos = [
        { id: '1', title: 'Test', completed: false }
      ]
      localStorage.setItem('todos-agent', JSON.stringify(mockTodos))
      
      const todos = await todoService.getTodos()
      expect(todos).toEqual(mockTodos)
    })

    it('should handle invalid JSON in localStorage', async () => {
      localStorage.setItem('todos-agent', 'invalid json')
      
      await expect(todoService.getTodos()).rejects.toThrow()
    })
  })

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const title = 'New Todo'
      const todo = await todoService.createTodo(title)
      
      expect(todo).toMatchObject({
        title,
        completed: false,
      })
      expect(todo.id).toBeDefined()
      expect(todo.createdAt).toBeDefined()
    })

    it('should save todo to localStorage', async () => {
      const title = 'New Todo'
      await todoService.createTodo(title)
      
      const stored = JSON.parse(localStorage.getItem('todos-agent'))
      expect(stored).toHaveLength(1)
      expect(stored[0].title).toBe(title)
    })

    it('should append to existing todos', async () => {
      await todoService.createTodo('First')
      await todoService.createTodo('Second')
      
      const todos = await todoService.getTodos()
      expect(todos).toHaveLength(2)
      expect(todos[0].title).toBe('First')
      expect(todos[1].title).toBe('Second')
    })
  })

  describe('updateTodo', () => {
    it('should update todo title', async () => {
      const todo = await todoService.createTodo('Original')
      const updated = await todoService.updateTodo(todo.id, { title: 'Updated' })
      
      expect(updated.title).toBe('Updated')
      expect(updated.id).toBe(todo.id)
    })

    it('should update todo completed status', async () => {
      const todo = await todoService.createTodo('Test')
      const updated = await todoService.updateTodo(todo.id, { completed: true })
      
      expect(updated.completed).toBe(true)
    })

    it('should persist updates to localStorage', async () => {
      const todo = await todoService.createTodo('Test')
      await todoService.updateTodo(todo.id, { completed: true })
      
      const todos = await todoService.getTodos()
      expect(todos[0].completed).toBe(true)
    })

    it('should return undefined for non-existent todo', async () => {
      const updated = await todoService.updateTodo('non-existent', { title: 'Test' })
      expect(updated).toBeUndefined()
    })
  })

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const todo = await todoService.createTodo('To Delete')
      const deletedId = await todoService.deleteTodo(todo.id)
      
      expect(deletedId).toBe(todo.id)
      
      const todos = await todoService.getTodos()
      expect(todos).toHaveLength(0)
    })

    it('should only delete specified todo', async () => {
      const todo1 = await todoService.createTodo('Keep')
      const todo2 = await todoService.createTodo('Delete')
      
      await todoService.deleteTodo(todo2.id)
      
      const todos = await todoService.getTodos()
      expect(todos).toHaveLength(1)
      expect(todos[0].id).toBe(todo1.id)
    })

    it('should handle deleting non-existent todo', async () => {
      await todoService.createTodo('Test')
      const deletedId = await todoService.deleteTodo('non-existent')
      
      expect(deletedId).toBe('non-existent')
      
      const todos = await todoService.getTodos()
      expect(todos).toHaveLength(1)
    })
  })
})
