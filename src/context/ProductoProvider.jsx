import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';

const ProductoContext = createContext()

const ProductoProvider = ({children}) => {
    
    const { auth } = useAuth()
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(true)
    const [producto, setProducto] = useState({})
    const [productos, setProductos] = useState([])
    const [modalProducto, setModalProducto] = useState(false)
    const [modalNuevoProducto, setModalNuevoProducto] = useState(false)

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                setCargando(true)
                
                const token = localStorage.getItem('token')

                if(!token){
                    return
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/productos', config)
                setProductos(data)
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
        }
        return ()=>obtenerProductos()
    }, [auth])

    const submitProducto = async (producto) => {
        if(producto.id){
            await editarProducto(producto)
            return
        }
        await agregarProducto(producto)
    }

    const agregarProducto = async (producto) => {
        try {
            const token = localStorage.getItem('token')

            if(!token){
                return
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const { data } = await clienteAxios.post('/productos', producto, config)
            toast.success('Producto Agregado Exitosamente')
            setProductos([...productos, data]) 

            setTimeout(() => {
                setModalNuevoProducto(false)
            }, 1000);

        } catch (error) {
            console.log(error.response)
        }
    }

    const editarProducto = async (producto) => {
        try {
            const token = localStorage.getItem('token')

            if(!token){
                return
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/productos/${producto.id}`, producto, config)

            const productosActualizados = productos.map(producto => producto._id == data._id ? data : producto)
            setProductos(productosActualizados)

            toast.info('Producto Actualizado Exitosamente')
            setTimeout(() => {
                setModalNuevoProducto(false)
            }, 1000);
            setProducto({})
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarProducto = async (id) => {
        try {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/productos/${id}`, config)
            toast.error(data.msg)

            const productosActualizados = productos.filter(producto => producto._id !== id)
            setProductos(productosActualizados)
            setTimeout(() => {
                setModalProducto(false)
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalProducto = (producto) => {
        setModalProducto(!modalProducto)
        setProducto(producto)
    }

    const handleModalNuevoProducto = (producto) => {
        setModalNuevoProducto(!modalNuevoProducto)
        setProducto(producto)
    }
    
    return (
        <ProductoContext.Provider
            value={{
                alerta,
                setAlerta,
                cargando,
                producto,
                productos,
                submitProducto,
                eliminarProducto,
                modalProducto,
                modalNuevoProducto,
                handleModalProducto,
                handleModalNuevoProducto
            }}
        >
            {children}
        </ProductoContext.Provider>
    )
}

export {
    ProductoProvider
}

export default ProductoContext