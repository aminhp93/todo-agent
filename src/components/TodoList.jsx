import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
