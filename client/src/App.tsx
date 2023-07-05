import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Error from "./routes/error";
import Home from "./pages/home";
import Explore from "./pages/explore";

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
        path: '/explore',
        element: <Explore />
      }
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
