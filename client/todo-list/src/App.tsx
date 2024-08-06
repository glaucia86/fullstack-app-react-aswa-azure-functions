import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
