import { FunctionComponent } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, {
  getListing as listingLoader,
  // getRoom as roomLoader,
} from "./routes/root";

import Error from "./routes/error";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Room from "./pages/explore/room";

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
        // loader: roomLoader,
      },
    ],
  },
]);

const App: FunctionComponent = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
