import {RouterProvider} from 'react-router-dom'
import {routers} from './routers/router'

export default function App() {
  return (
    <div>
      <RouterProvider router={routers}/>
    </div>
  )
}
