import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";
import SearchResults from "./pages/SearchResults";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "results", element: <SearchResults /> },
            { path: "watch/:id", element: <Watch /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;
