import React, { createContext, useState } from "react"
import clienteAxios from "../../config/clienteAxios"
import { toast } from 'react-toastify';
import useImportacion from "../hooks/useImportacion";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const { importaciones, setImportaciones } = useImportacion()
    const [alerta, setAlerta] = useState({})
    const [productosSelected, setProductosSelected] = useState([])
    const [cotizacion, setCotizacion] = useState({})
    const [modalCotizadorProductos, setModalCotizadorProductos] = useState(false)
    
    const handleModalCotizadorProductos = () => {
        setModalCotizadorProductos(!modalCotizadorProductos)
    }

    const submitCotizacion = async (cotizacion) => {
        try {
            const token = localStorage.getItem('token')
            if(!token){
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/importaciones', {cotizacion}, config)
            console.log(data)
            toast.success('Pedido Realizado Correctamente')
            setImportaciones([...importaciones, data])
            console.log(importaciones)
            setProductosSelected([])
            setCotizacion({})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CotizadorContext.Provider 
            value={{
                alerta,
                setAlerta,
                productosSelected,
                cotizacion,
                setCotizacion,
                setProductosSelected,
                modalCotizadorProductos,
                handleModalCotizadorProductos,
                submitCotizacion
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext