import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import ProtectedRoute from "../components/Protected";
import Logout from "../pages/Logout";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/contact",
        element: (
            <ProtectedRoute>
                <Contact />
            </ProtectedRoute>
        ),
    },

    {
        path: "/logout",
        element: (
            <ProtectedRoute>
                <Logout />
            </ProtectedRoute>
        ),
    },

    //NotFoundPage sempre vai ser o último a cair
    {
        path: "*",
        element: (
            <ProtectedRoute>
                <NotFound />
            </ProtectedRoute>
        ),
    },
];