import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ListEmployees from './pages/EmployeeList';
import UpdateEmployee from './pages/UpdateEmployee';

const App: React.FC = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <nav className='bg-blue-600 text-white p-4'>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/' className='hover:underline'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/list' className='hover:underline'>
                Employee List
              </Link>
            </li>
          </ul>
        </nav>
        <div className='container mx-auto p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/list' element={<ListEmployees />} />
            <Route path='/update/:id' element={<UpdateEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
