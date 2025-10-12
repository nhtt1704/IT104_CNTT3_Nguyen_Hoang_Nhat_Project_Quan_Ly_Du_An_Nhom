import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Admin from "../pages/admin/Admin";
import ProtectedRoute from "../components/ProtectedRoute";
import AddArticle from "../components/AddArticle";
import ArticleDetails from "../components/ArticleDetails";
import Home from "../components/Home";
import AdminEntries from "../pages/admin/AdminEntries";
import AdminUser from "../pages/admin/AdminUser";
import AdminArticle from "../pages/admin/AdminArticle";
import EditArticle from "../components/EditArticle";
import AddArticleHome from "../components/AddArticleHome";
import EditArticleHome from "../components/EditArticleHome";
import AllMyPostsHome from "../components/AllMyPostsHome";

export const routers = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
      path: "/addArticle",
      element: <AddArticle></AddArticle>,
    },
    {
        path: "/articleDetails/:id",
        element: <ArticleDetails></ArticleDetails>,
    },
    {
        path: "/home",
        element: <Home></Home>,
    },
    {
        path: "/allMyPosts",
        element: <AllMyPostsHome></AllMyPostsHome>,
    },
    {
        path: "/admin/users",
        element:<ProtectedRoute> <AdminUser></AdminUser> </ProtectedRoute> ,
    },
    {
        path: "/admin/entries",
        element: <ProtectedRoute> <AdminEntries></AdminEntries> </ProtectedRoute>,
    },
    {
        path: "/admin/article",
        element: <ProtectedRoute> <AdminArticle></AdminArticle> </ProtectedRoute>,
    },
    {
        path: "/editArticle/:id",
        element: <EditArticle></EditArticle>
    },
    {
        path: "/addArticleHome",
        element: <AddArticleHome></AddArticleHome>
    },
        {
        path: "/editArticleHome/:id",
        element: <EditArticleHome></EditArticleHome>
    },

]);
