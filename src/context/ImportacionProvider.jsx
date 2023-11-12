import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";

const ImportacionContext = createContext()

const ImportacionProvider = ({children}) => {

    const [cargando, setCargando] = useState(false)
    const [importaciones, setImportaciones] = useState([])

    useEffect(() => {
        const obtenerImportaciones = async () => {
            setCargando(true)
            try {
                const token = localStorage.getItem('token')

                if(!token){
                    return
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                }

                const { data } = await clienteAxios('/importaciones', config)
                setImportaciones(data)
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
        }
        return ()=>obtenerImportaciones()
    }, [])

    return (
        <ImportacionContext.Provider 
            value={{
                cargando,
                importaciones,
                setImportaciones
            }}
        >
            {children}
        </ImportacionContext.Provider>
    )
}

export {
    ImportacionProvider
}

export default ImportacionContext