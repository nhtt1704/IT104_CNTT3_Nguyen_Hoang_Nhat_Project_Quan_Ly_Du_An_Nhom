import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Admin from '../pages/admin/Admin'
import ProtectedRoute from '../components/ProtectedRoute'
import ManagerUser from '../pages/admin/ManagerUser'
import ManagerEntries from '../pages/admin/ManagerEntries'
import AddArticle from '../components/AddArticle'
import ArticleDetails from '../components/ArticleDetails'
import Home from '../components/Home'

export const routers = createBrowserRouter([
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/admin/user",
        element: <ManagerUser></ManagerUser>
    },
    {
        path: "/admin/entries",
        element: <ManagerEntries></ManagerEntries>
    },
    {
        path: "/addArticle",
        element:<AddArticle></AddArticle>
    },
    {
        path: "/articleDetails",
        element:<ArticleDetails></ArticleDetails>
    },
    {
        path: "/home",
        element:<Home></Home>
    }

])