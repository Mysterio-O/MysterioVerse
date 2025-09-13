import { createBrowserRouter } from "react-router"
import Home from "../pages/Home/Home"
import RootLayout from "../Layouts/RootLayout"
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails"
import ControlProjects from "../components/CMS/ControlProjects"
import Login from "../pages/Authentication/Login"
import Forbidden from "../pages/Forbidden/Forbidden"
import PrivateRoute from "../routes/PrivateRoute"

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/project-details/:id',
                Component: ProjectDetails
            },
            {
                path: '/control-projects',
                element: <PrivateRoute>
                    <ControlProjects />
                </PrivateRoute>
            },
            {
                path: '/login/my-account',
                Component: Login
            },
            {
                path: '/forbidden',
                Component: Forbidden
            }
        ]
    }
])