// Local storage service for todos
const STORAGE_KEY = 'todos-agent';

export const todoService = {
  getTodos: async () => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  },

  createTodo: async (title) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const todos = await todoService.getTodos();
    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    return newTodo;
  },

  updateTodo: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const todos = await todoService.getTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    return updatedTodos.find(todo => todo.id === id);
  },

  deleteTodo: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const todos = await todoService.getTodos();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    return id;
  },
};
