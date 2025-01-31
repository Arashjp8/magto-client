import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "watch", element: <Watch /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
