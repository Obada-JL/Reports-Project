import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import SignIn from "./components/SignIn";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminPage from "./components/ManageAdmins";
import DetailPage from "./components/DetailPage";
import AddComplaint from "./components/AddComplaint";
import PageLayout from "./components/PageLayout";
import NavBar from "./components/Navbar";
import { AuthProvider } from "./AppContext";
import AdminDetails from "./components/AdminDetails";
import GridExample from "./components/Paginate";
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
      { path: "admins", element: <AdminPage /> },
      { path: "admins/:id", element: <AdminDetails /> },
      { path: "paginate", element: <GridExample /> },
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
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
