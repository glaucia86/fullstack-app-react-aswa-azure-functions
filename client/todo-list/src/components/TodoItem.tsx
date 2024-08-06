import React from 'react';

interface TodoItemProps {
  todo: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className='bg-gray-100 p-2 border-b'>
      <span>{todo}</span>
    </div>
  );
};

export default TodoItem;
