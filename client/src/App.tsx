import React from 'react'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import AddArticle from './components/AddArticle'
import ArticleDetails from './components/ArticleDetails'
import ManagerUser from './pages/admin/ManagerUser'
import AdminHeader from './pages/admin/AdminHeader'
import ManagerEntries from './pages/admin/ManagerEntries'
import {RouterProvider} from 'react-router-dom'
import {routers} from './routers/router'

export default function App() {
  return (
    <div>
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <Header/> */}
      {/* <Footer/> */}
      {/* <AddArticle/>   */}
      {/* <ArticleDetails/> */}
      {/* <AdminHeader/> */}
      {/* <ManagerUser/> */}
      {/* <ManagerEntries /> */}
      <RouterProvider router={routers}/>
    </div>
  )
}
