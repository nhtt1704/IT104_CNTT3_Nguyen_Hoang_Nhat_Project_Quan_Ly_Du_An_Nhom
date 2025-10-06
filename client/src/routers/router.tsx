import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Admin from '../pages/admin/Admin'
import ProtectedRoute from '../components/ProtectedRoute'
import AddArticle from '../components/AddArticle'
import ArticleDetails from '../components/ArticleDetails'
import Home from '../components/Home'
import AllMyPosts from '../components/AllMyPosts'
import AdminEntries from '../pages/admin/AdminEntries'
import AdminUser from '../pages/admin/AdminUser'
import AdminArticle from '../pages/admin/AdminArticle'

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
        element: <AdminUser></AdminUser>
    },
    {
        path: "/admin/entries",
        element: <AdminEntries></AdminEntries>
    },
    {
        path: "/admin/article",
        element: <AdminArticle></AdminArticle>
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
    },
    {
        path: "/allMyPosts",
        element:<AllMyPosts></AllMyPosts>
    }
])