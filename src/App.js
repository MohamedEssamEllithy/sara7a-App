import logo from './logo.svg';
import * as ReactDOM from "react-dom";
import './App.css';
import Register from './components/register/register';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/home';
import LayOut from './components/LayOut/LayOut';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import { useContext, useEffect } from 'react';
import { TokenContext } from './components/Context/Context';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

import Sendmassage from './components/sendmassage/sendmassage';
import { QueryClient, QueryClientProvider } from 'react-query';

const Routes = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      { index: true, element: <Register /> },
      { path: "signup", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "massage/:id", element: <Sendmassage/> },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
let {Token,setToken}=useContext(TokenContext)

useEffect(()=>{
  if(localStorage.getItem("userToken")){
    setToken(localStorage.getItem("userToken"));
  }
})

  return (
    <>
      {/* <QueryClientProvider client={queryClient}>
      <Profile/>
      </QueryClientProvider> */}

      <RouterProvider router={Routes}></RouterProvider>

      
    </>
  );
}

export default App;
