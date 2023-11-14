import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../../config/clienteAxios";

const TiendaContext = createContext()

const TiendaProvider = ({children}) => {

    const [pedidos, setPedidos] = useState([])
    const [carrito, setCarrito] = useState([])
    const [resumen, setResumen] = useState({})

    useEffect(() => {
        const obtenerPedidos = async () => {
            try {
                const token = localStorage.getItem('token')

                if(!token){
                    return
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pedidos', config)
                setPedidos(data)
            } catch (error) {
                console.log(error)
            }
        }

        return ()=>obtenerPedidos()
    }, [])

    const añadirProducto = (producto) => {
        const existeProducto = carrito.some(productoCarrito => productoCarrito._id === producto._id)

        if(!existeProducto && producto.cantidad_pedido > 0){
            setCarrito([...carrito, producto])
            console.log(carrito)
            toast.success('Producto agregado al carrito')
        }else if(existeProducto && producto.cantidad_pedido > 0){
            const carritoActualizado = carrito.map(productoCarrito => productoCarrito._id == producto._id ? producto : productoCarrito)
            setCarrito(carritoActualizado)
            toast.info(`Se actualizo la cantidad del producto ${producto.producto.nombre} en el carrito de compras`)
        }
    }

    useEffect(()=> {
        if(carrito.length > 0){
            const total = carrito.reduce((total, producto)=> total + (producto.precio_venta * producto.cantidad_pedido), 0)
            const cantidad = carrito.reduce((total, producto)=> total + producto.cantidad_pedido, 0)
            setResumen({total, cantidad})
        }else{
            setResumen({})
        }
    }, [carrito])

    const eliminarProductoCarrito = (id) => {
        const carritoActualizado = carrito.filter(producto => producto._id !== id)
        setCarrito(carritoActualizado)
    }

    const realizarPedido = async (pedido) => {
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

            const { data } = await clienteAxios.post('/pedidos', pedido, config)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TiendaContext.Provider
            value={{
                añadirProducto,
                carrito,
                pedidos,
                setCarrito,
                resumen,
                eliminarProductoCarrito,
                realizarPedido
            }}
        >
            {children}
        </TiendaContext.Provider>
    )
}

export {
    TiendaProvider
}

export default TiendaContext