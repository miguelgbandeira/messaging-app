import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];

export default routes;
