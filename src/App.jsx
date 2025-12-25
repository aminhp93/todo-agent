import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const { data: todos = [], isLoading, error } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleCreate = (title) => {
    createTodo.mutate(title);
  };

  const handleUpdate = ({ id, updates }) => {
    updateTodo.mutate({ id, updates });
  };

  const handleDelete = (id) => {
    deleteTodo.mutate(id);
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Agent Engineering Todo
            </h1>
            <p className="text-gray-600">
              Built with React, TanStack Query, and Tailwind CSS
            </p>
          </header>

          <div className="mb-6 flex gap-4 text-sm">
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <span className="text-gray-600">Total: </span>
              <span className="font-semibold text-blue-600">{stats.total}</span>
            </div>
            <div className="px-4 py-2 bg-green-50 rounded-lg">
              <span className="text-gray-600">Completed: </span>
              <span className="font-semibold text-green-600">{stats.completed}</span>
            </div>
            <div className="px-4 py-2 bg-orange-50 rounded-lg">
              <span className="text-gray-600">Active: </span>
              <span className="font-semibold text-orange-600">{stats.active}</span>
            </div>
          </div>

          <TodoForm 
            onSubmit={handleCreate} 
            isLoading={createTodo.isPending}
          />

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading todos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p>Error loading todos: {error.message}</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </div>

        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Agent Engineering approach with TanStack Query for state management
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
