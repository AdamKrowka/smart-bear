import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../pages/home/App";

const sitemap = {
  home: "/",
  path: "/:path",
};

const router = createBrowserRouter([
  {
    element: <App />,
    path: sitemap.home,
  },
]);

const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
