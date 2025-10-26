import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import PetsNews from "../Pages/PetsNews";
import Authentication from "../Pages/Authentication";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import ProtectedRoute from "../Components/ProtectedRoute";
import PopularToys from "../Pages/PopularToys";
import About from "../Pages/About";
import More from "../Pages/More";

const router = createBrowserRouter([

    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },

            {
                path: "/pets-news/:id",
                loader: async ({ params }) => {
                    const response = await fetch('/kidsdata.json');
                    const data = await response.json();
                    return data;
                },
                element: (
                    <ProtectedRoute>
                        <PetsNews></PetsNews>
                    </ProtectedRoute>
                )
            },
        ]
    },
    {
        path: '/auth',
        element: <Authentication></Authentication>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/my-profile',
        element: (
            <ProtectedRoute>
                <Profile></Profile>
            </ProtectedRoute>
        )
    },
    {
        path: "/popular-toys",
        element: <PopularToys></PopularToys>
    },
    {
        path: "/about",
        element: <About></About>
    },
    {
        path: "/more",
        element: <More></More>
    },

    {
        path: '/*',
        element: <div>Error-404</div>
    }

]);

export default router;