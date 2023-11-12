import { Card, CardBody, CardFooter, Image, Button, Tooltip } from '@nextui-org/react'
import useTienda from '../hooks/useTienda'
import formatearPrecio from '../helpers/formatearPrecio'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function Carrito() {

    const { auth } = useAuth()
    const { carrito, setCarrito, resumen, eliminarProductoCarrito, realizarPedido } = useTienda()
    
    const handleSubmit = async () => {
        console.log(carrito)
        const pedido = {
            usuario: auth._id,
            productosComprados: carrito,
            precioTotal: resumen.total,
            descuentoAplicado: resumen.cantidad > 10 ? 5 : 0
        }
        
        await realizarPedido(pedido)
    }

    return (
        <>
            <h1 className='font-black text-3xl uppercase text-primary-100 mb-5'>Carrito de Compras</h1>
            <div className='space-y-2 md:space-y-0 md:flex gap-5'>
                <div className='w-full'>
                    <h1 className='font-bold text-xl mb-5'>Productos del Carrito</h1>
                    {carrito.length > 0 ? (
                        carrito.map(producto => (
                            <Card
                                shadow="sm"
                                key={producto._id}
                                className='flex-row w-full mb-3 p-3'
                            >
                                <CardBody className="overflow-visible p-0 w-1/2 md:w-1/4 m-auto">
                                    <Image
                                        shadow="none"
                                        radius="none"
                                        width={'100%'}
                                        alt={producto.producto.nombre}
                                        src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto.producto.imagen}`}
                                    />
                                </CardBody>
                                <CardFooter className="flex-col text-small px-3 items-start">
                                    <div className='flex justify-between w-full mb-5'>
                                        <div>
                                            <div className='mb-2 text-left'>
                                                <b>{producto.producto.nombre}</b>
                                                <p className="text-primary-100 text-xl font-bold">${formatearPrecio(producto.precio_venta)}</p>
                                            </div>
                                            <CantidadProducto producto={producto} carrito={carrito} setCarrito={setCarrito}/>
                                        </div>
                                        <Tooltip color={'danger'} content={'Eliminar del Carrito'} className="capitalize">
                                            <Button onClick={()=>eliminarProductoCarrito(producto._id)} isIconOnly color='danger'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <p className='font-bold uppercase'>Subtotal: <span className='text-lg text-accent-100'>${formatearPrecio(producto.precio_venta * producto.cantidad_pedido)}</span></p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    ): (
                        <h2 className=''>Agrega productos al carrito!</h2>
                    )}
                </div>
                {Object.keys(resumen).length > 0 && (
                    <div className='md:w-1/2'>
                        <h1 className='font-bold text-xl mb-5'>Resumen de Compra</h1>
                        <div className='bg-bg-300 p-5 w-full rounded-xl shadow-md'>
                            <div>
                                <b className='text-xl text-foreground-700 uppercase'>Total Compra: </b>
                                <p className={`${resumen.cantidad > 10 ? 'line-through text-foreground-300' : ''} text-warning-400 text-xl font-bold`}>${formatearPrecio(resumen.total)}</p>
                            </div>
                                {resumen.cantidad > 10 && (
                                    <Descuento precio={resumen.total} porcentaje={5} />
                                )}
                            <Button onClick={handleSubmit} color='primary' fullWidth className='mt-2'>Realizar Compra</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
function Descuento({ precio, porcentaje }) {
    const descuento = precio * (porcentaje / 100);
    const precioConDescuento = precio - descuento;

    return (
        <p className='text-warning-400 text-xl font-bold'>${formatearPrecio(precioConDescuento)} <span className='text-small'>-5%</span></p>
    );
}


function CantidadProducto({ producto, carrito, setCarrito }) {
    const [cantidad, setCantidad] = useState(producto.cantidad_pedido);
    const [message, setMessage] = useState('')
  
    const incrementarCantidad = () => {
      if(cantidad === producto.cantidad){
        setMessage('Cantidad disponble excedida')
        return
      }
      const nuevaCantidad = cantidad + 1;
      setCantidad(nuevaCantidad);
      producto.cantidad_pedido = nuevaCantidad;
    };
  
    const disminuirCantidad = () => {
      if (cantidad > 1) {
        const nuevaCantidad = cantidad - 1;
        setCantidad(nuevaCantidad);
        producto.cantidad_pedido = nuevaCantidad;
      }
    };

    useEffect(() => {
        const carritoActualizado = carrito.map(productoState => productoState._id == producto._id ? {...producto, cantidad_pedido: cantidad} : productoState)
        setCarrito(carritoActualizado)
    }, [cantidad])
  
    return (
      <>
        <div className='bg-bg-100 ml-auto flex justify-center p-2 rounded-xl'>
          <Button disableRipple isIconOnly className='h-5 w-5 bg-neutral' onClick={disminuirCantidad}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
          <p>{cantidad}</p>
          <Button disableRipple isIconOnly className='h-5 w-5 bg-neutral' onClick={incrementarCantidad}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        </div>
        <p className="text-danger-400">{message}</p>
      </>
    );
  }