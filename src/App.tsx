import './App.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ForYou from './pages/ForYou'
import Following from "./pages/Following";
import UserLogin from "./pages/LogIn";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import VideoDetails from "./pages/VideoDetails";
import UserDetails from "./pages/UserDetails";
import UserFollowDetails from "./pages/FollowingDetails";
import { useEffect } from "react";
import { loginSuccess } from "./slices/userLoginSlice";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ForYou />
  },
  {
    path: '/following',
    element: <Following />
  },
  {
    path: '/login',
    element: <UserLogin />
  },
  {
    path: '/videos/:userId',
    element: <VideoDetails />
  },
  {
    path: '/users/:userId',
    element: <UserDetails />
  },
  {
    path: '/userFollow/:userId',
    element: <UserFollowDetails />
  }
])

function App() {
  

  useEffect(() => {
    const usernameLocalStorage = localStorage.getItem('username');
    const passwordLocalStorage = localStorage.getItem('password');
    const idLocalStorage = localStorage.getItem('id');
    if (usernameLocalStorage && passwordLocalStorage) {
      store.dispatch(loginSuccess({
        username: usernameLocalStorage,
        password: passwordLocalStorage,
        id: idLocalStorage,
      }))
    }
  }, [])

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
