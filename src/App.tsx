import "./App.css"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ForYou from "./pages/ForYou"
import Following from "./pages/Following";
import { Provider } from "react-redux";
import store from "./slices/store";
import VideoDetails from "./pages/VideoDetails";
import UserDetails from "./pages/UserDetails";
import UserFollowDetails from "./pages/FollowingDetails";
import { useEffect } from "react";
import { loginSuccess } from "./slices/userLoginSlice";
import VideoDetails1 from "./pages/videodetails/VideoDetails1";
import VideoDetails2 from "./pages/videodetails/VideoDetails2";
import VideoDetails3 from "./pages/videodetails/VideoDetails3";
import VideoDetails4 from "./pages/videodetails/VideoDetails4";
import VideoDetails5 from "./pages/videodetails/VideoDetails5";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ForYou />
  },
  {
    path: "/following",
    element: <Following />
  },
  {
    path: "/videos/:userId",
    element: <VideoDetails />
  },
  {
    path: "/users/:userId",
    element: <UserDetails />
  },
  {
    path: "/userFollow/:userId",
    element: <UserFollowDetails />
  },
  {
    path: "/videoDetails/1",
    element: <VideoDetails1 />
  },
  {
    path: "/videoDetails/2",
    element: <VideoDetails2 />
  },
  {
    path: "/videoDetails/3",
    element: <VideoDetails3 />
  },
  {
    path: "/videoDetails/4",
    element: <VideoDetails4 />
  },
  {
    path: "/videoDetails/5",
    element: <VideoDetails5 />
  }
])

function App() {
  

  useEffect(() => {
    const usernameLocalStorage = localStorage.getItem("username");
    const passwordLocalStorage = localStorage.getItem("password");
    const idLocalStorage = localStorage.getItem("id");
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
