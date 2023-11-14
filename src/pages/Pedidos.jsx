import React from 'react'
import useTienda from '../hooks/useTienda'
import { Card, CardBody, CardFooter, Image, Chip, Button, Tooltip } from '@nextui-org/react'
import formatearPrecio from '../helpers/formatearPrecio'
import formatearFecha from '../helpers/formatearFehca'

export default function Pedidos() {
  const { pedidos } = useTienda()
  console.log(pedidos)
  return (
    <>
      <h1 className='text-xl mb-4'>Mis pedidos</h1>
      {pedidos.length > 0 ? (
        pedidos.map(pedido =>(
          <Card
            shadow="sm"
            key={pedido._id}
            className='w-full mb-3 p-3'
          >
            <CardBody className="overflow-visible p-1">
              <div className='flex justify-between'>
                <p className='text-small'>ID pedido: <span className='text-foreground-400 font-normal'>{pedido._id}</span></p>
                <p className='text-foreground-400'>{formatearFecha(pedido.createdAt)}</p>
              </div>
              <div className='flex items-center p-2'>
                {pedido.productosComprados.map(producto => (
                  <div className='mt-1 flex flex-col items-center'>
                    <Image
                      shadow="none"
                      radius="none"
                      width={'50'}
                      className="w-full h-[75px] object-contain"
                      alt={producto.nombre}
                      src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto.producto.imagen}`}
                    />
                    <Chip color='primary'>{producto.cantidad_pedido}</Chip>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter className="flex-col text-small p-0 items-start">
              <p className='ml-auto text-warning-400 text-lg font-bold'>${formatearPrecio(pedido.precioTotal)}</p>
              {/* <div className='flex justify-between w-full mb-5'>
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
              </div> */}
            </CardFooter>
          </Card>
        ))
      ): (
        <h2>No tienes pedidos realizados</h2>
      )}
    </>
  )
}
