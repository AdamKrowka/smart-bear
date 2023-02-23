import PathPage from "pages/path/pathPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../pages/home/Home";

export const sitemap = {
  home: "/",
  path: "/:method/*",
};

const router = createBrowserRouter([
  {
    element: <App />,
    path: sitemap.home,
  },
  {
    element: <PathPage />,
    path: sitemap.path,
  },
]);

const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
