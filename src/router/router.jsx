import { createBrowserRouter } from "react-router"
import Home from "../pages/Home/Home"
import RootLayout from "../Layouts/RootLayout"
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails"
import ControlProjects from "../components/CMS/ControlProjects"

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
                path:'/project-details/:id',
                Component: ProjectDetails
            },
            {
                path:'/control-projects',
                Component: ControlProjects
            }
        ]
    }
])