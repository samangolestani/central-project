import './App.css';
import LoginPage from './pages/login';
import {createBrowserRouter, RouterProvider} from 'react-router'
import Dashborad from './pages/Dashboard';
function App() {
  const router = createBrowserRouter([
    { path : '/',
      element: <Dashborad/>
    },
    {
      path : '/login',
      element : <LoginPage/>
    }
  ]);
 
  return (
   <RouterProvider router={router}/>
  );
}

export default App;
