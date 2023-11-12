import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <>
      <main className="container mx-auto p-5 md:flex md:justify-center">
        <div className="mt-5 md:mt-10 md:w-2/3 lg:w-2/5">
          <Outlet/>
        </div>
      </main>
    </>
  )
}
