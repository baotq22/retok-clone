import './App.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ForYou from './pages/ForYou'
import Following from "./pages/Following";
import UserLogin from "./pages/LogIn";
import { Provider } from "react-redux";
import store from "./store";
import VideoDetails from "./pages/VideoDetails";
import UserDetails from "./pages/UserDetails";

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
    path: '/users',
    element: <UserDetails />
  }
])

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
