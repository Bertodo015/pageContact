import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },

    //NotFoundPage sempre vai ser o último a cair
    {
        path: "*",
        element: <NotFound />
    }
];