import { Button } from "@nextui-org/react"
import useProducto from '../hooks/useProducto'
import formatearPrecio from "../helpers/formatearPrecio"

export default function Producto({producto}) {
  const { handleModalProducto } = useProducto()
  return (
    <div className="bg-bg-300 mb-5 px-8 p-5 md:p-5 rounded-lg">
      <h2 className='text-center font-bold text-xl text-text-100 mb-4'>{producto?.nombre}</h2>
      <div className="">
        <img className='h-48 mx-auto' src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto?.imagen}`} alt={`Imagen ${producto.nombre}`} />
        <p className="font-black text-2xl text-center text-accent-100 mb-5">${formatearPrecio(producto?.precio_compra)}</p>
        <Button onClick={()=>handleModalProducto(producto)} fullWidth color="primary" radius="sm">
          Ver Información
        </Button>
      </div>
    </div>
  )
}
