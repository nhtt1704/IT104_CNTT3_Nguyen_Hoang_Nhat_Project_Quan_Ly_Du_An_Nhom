import Header from './components/Header'
import Footer from './components/Footer'
import AdminHeader from './pages/admin/AdminHeader'
import {RouterProvider} from 'react-router-dom'
import {routers} from './routers/router'

export default function App() {
  return (
    <div>
      {/* <Header/> */}
      {/* <Footer/> */}
      {/* <AdminHeader/> */}
      <RouterProvider router={routers}/>
    </div>
  )
}
