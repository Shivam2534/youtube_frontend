import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Store/Store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RegistrationPage } from "./Pages/RegistrationPage.jsx";
import { Upload_video_page } from "./Pages/Upload_video_page.jsx";
import { Login_page } from "./Pages/Login_page.jsx";
import { Logout_page } from "./Pages/Logout_page.jsx";
import { User_channel_profile_page } from "./Pages/User_channel_profile_page.jsx";
import { Your_channel_profile_page } from "./Pages/Your_channel_profile_page.jsx";
import { Home_videos_page } from "./Pages/Home_videos_page.jsx";
import { Get_watchHistory_page } from "./Pages/Get_watchHistory_page.jsx";
import {Video_play_section} from './Components/Home/Video_play_section.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <Login_page />,
      },
      {
        path: "/logout",
        element: <Logout_page />,
      },
      {
        path: "/upload_video",
        element: <Upload_video_page />,
      },
      {
        path: "/channel_profile",
        element: <User_channel_profile_page />,
      },
      {
        path: "/Your_channel_profile",
        element: <Your_channel_profile_page />,
      },
      {
        path: "/",
        element: <Home_videos_page />,
      },
      {
        path: "/watchHistory",
        element: <Get_watchHistory_page />,
      },
      {
        path: "/Home_video",
        element: <Video_play_section />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
