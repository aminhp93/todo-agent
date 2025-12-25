import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete, isUpdating, isDeleting }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate({ id: todo.id, updates: { title: editTitle.trim() } });
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    onUpdate({ id: todo.id, updates: { completed: !todo.completed } });
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isUpdating || isDeleting}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUpdate();
            if (e.key === 'Escape') {
              setEditTitle(todo.title);
              setIsEditing(false);
            }
          }}
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            disabled={isUpdating || isDeleting}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          disabled={isUpdating || isDeleting}
          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
