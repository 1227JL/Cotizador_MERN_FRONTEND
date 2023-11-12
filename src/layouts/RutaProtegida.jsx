import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function RutaProtegida() {
    const { auth, cargando } = useAuth()
    
    if(cargando) return <div className="mt-56">Autenticando...</div>
    return (
        <>
        {auth?._id ? (
            <>
                <div>
                    <Header/>
                    <div className="lg:flex divide-x-1">
                        <Sidebar/>
                        <main className="flex-1 p-5">
                            <Outlet/>
                        </main>
                    </div>
                </div>
                <ToastContainer/>
            </>
            ) : <Navigate to={'/'}/>}
        </>
    )
}
