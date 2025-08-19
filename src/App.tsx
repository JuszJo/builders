import { RouterProvider, createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom"

import './App.css'
import Home from "./pages/Home"
import ErrorPage from "./pages/Error"
import NotFound from "./pages/404"

const router = createBrowserRouter(createRoutesFromChildren([
  <Route errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Route>
]))


function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
