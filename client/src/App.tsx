import React from 'react'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import AddArticle from './components/AddArticle'
import ArticleDetails from './components/ArticleDetails'

export default function App() {
  return (
    <div>
      {/* <Register/>
      <Login/>
      <Header/>
      <Footer/>
      <AddArticle/>   */}
      <ArticleDetails/>
    </div>
  )
}
