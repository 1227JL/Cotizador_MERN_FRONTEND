import { Outlet } from "react-router-dom"
import HeaderShop from "../components/HeaderShop"
import { ToastContainer } from "react-toastify"

export default function ShopLayout() {
  return (
    <>
      <HeaderShop/>
      <main className="p-5 max-w-full lg:max-w-5xl mx-auto">
        <Outlet/>
      </main>
      <ToastContainer/>
    </>
  )
}
