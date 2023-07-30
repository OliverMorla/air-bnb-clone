import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, {
  getListing as listingLoader,
  getRoom as roomLoader,
  getProfile as profileLoader,
} from "./routes/root";

import Error from "./routes/error";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Room from "./pages/room";
import Reserve from "./pages/reserve";
import Failed from "./pages/failed";
import Success from "./pages/sucess";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
        loader: listingLoader,
      },
      {
        path: "/explore/:id",
        element: <Room />,
        loader: roomLoader,
      },
      {
        path: "/reserve",
        element: <Reserve />,
      },
      {
        path: "/reserve/:id",
        element: <Reserve />,
      },
      {
        path: "/reserve-success",
        element: <Success />,
      },
      {
        path: "/reserve-failed",
        element: <Failed />,
      },
      {
        path: "/auth/profile",
        element: <Profile />,
        loader: profileLoader,
      },
    ],
  },
]);

const App: React.FunctionComponent = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
