import { CheckCircleIcon } from '@heroicons/react/24/solid';
import './App.css';

function App() {
  return (
    <>
      <div>
        <div className='header-container'>
          <CheckCircleIcon className='logo' />
          <h1>TODO Application</h1>
        </div>

        <h2>with React + Azure Static Web Apps and Azure Functions</h2>
      </div>
      <div className='card'></div>
      <p className='read-the-docs'>
        Made with ❤️ by JavaScript Advocacy Team at Microsoft
      </p>
    </>
  );
}

export default App;
