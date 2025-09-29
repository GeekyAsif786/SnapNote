import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
        <div>
            <NavBar/>
            <Home/>
        </div>
    },

    {
      path:"/pastes",
      element:
        <div>
            <NavBar/>
            <Paste/>
        </div>
    },

    {
      path:"/pastes/:id",
      element:
        <div>
            <NavBar/>
            <ViewPaste/>
        </div>
    },
  ]
);


function App() {

  return (
    
    <div>
      {/* <Toaster position="top-right" /> */}
        <RouterProvider router={router}/>
    </div>
  )
}

export default App
