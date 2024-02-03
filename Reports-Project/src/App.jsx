import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import SignIn from "./components/SignIn";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminPage from "./components/AdminPage";
import DetailPage from "./components/DetailPage";
import AddComplaint from "./components/AddComplaint";
import PageLayout from "./components/PageLayout";
import NavBar from "./components/Navbar";
import { AuthProvider } from "./AppContext";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PageLayout />,
//     errorElement: <SignIn />,
//   },
//   {
//     path: "signIn",
//     element: <SignIn />,
//   },
//   {
//     path: "register",
//     element: <RegisterPage />,
//   },
//   {
//     path: "admin",
//     element: <AdminPage />,
//   },
//   { path: "/:recordId", element: <DetailPage /> },
//   { path: "admin/:recordId", element: <DetailPage /> },
//   { path: "add", element: <AddComplaint /> },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <SignIn />,
    children: [
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
      { path: "/:id", element: <DetailPage /> },
      // { path: "add", element: <AddComplaint /> },
    ],
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
