import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import formatearPrecio from '../helpers/formatearPrecio';
import useImportacion from '../hooks/useImportacion';
import useTienda from '../hooks/useTienda';
import Spinner from "./Spinner";

export default function ProductosList() {
  const { cargando, importaciones } = useImportacion();
  const { añadirProducto } = useTienda();
  const productosFiltrados = [];

  const productosUnicos = [];
  const productoNombres = new Set();
  
  importaciones.forEach((importacion) => {
    importacion.productos_importados.forEach((producto) => {
      productosFiltrados.push(producto);
    });
  });
  
  productosFiltrados.forEach((producto) => {
    if (!productoNombres.has(producto.producto.nombre)) {
      productoNombres.add(producto.producto.nombre);
      productosUnicos.push(producto);
    }
  });
  
  // Seleccionar el producto con el precio de venta más alto y sumar las cantidades
  const productosFinales = productosUnicos.map((producto) => {
    const productosRepetidos = productosFiltrados.filter((p) => p.producto.nombre === producto.producto.nombre);
    const productoConMayorPrecio = productosRepetidos.reduce((mayor, p) =>
      p.producto.precio_venta > mayor.producto.precio_venta ? p : mayor
    );
  
    // Sumar las cantidades de los productos repetidos
    const cantidadTotal = productosRepetidos.reduce((total, p) => total + p.cantidad, 0);
  
    return { ...productoConMayorPrecio, cantidad: cantidadTotal };
  });
  
  if(cargando) return <Spinner>Obteniendo Productos...</Spinner>

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productosFinales?.length > 0 ? (
            productosFinales?.map((producto) => {
              if (producto.cantidad_pedido === undefined) {
                producto.cantidad_pedido = 0;
              }

              return (
                <Card shadow="sm" key={producto._id}>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={producto.producto.nombre}
                      className="w-full h-56 object-contain"
                      src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto.producto.imagen}`}
                    />
                  </CardBody>
                  <CardFooter className="flex-col text-small px-3 items-start">
                    <div className="w-full">
                      <b>{producto?.producto?.nombre}</b>
                      <div className='items-center w-full mb-2'>
                          <p className="text-primary-100 text-xl font-bold">${formatearPrecio(producto?.precio_venta)}</p>
                          <CantidadProducto producto={producto} />
                          <p className="font-bold mt-2">Disponibles en stock: <span className="font-normal">{producto?.cantidad}</span></p>
                      </div>
                    </div>
                    <Button onPress={() => añadirProducto(producto)} className='bg-accent-100 w-full'>Agregar al Carrito</Button>
                  </CardFooter>
                </Card>
              )
            })
        ) : (
          <h2>No hay productos aún</h2>
        )}
      </div>
    </>
  )
}

function CantidadProducto({ producto }) {
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
    if (cantidad > 0) {
      const nuevaCantidad = cantidad - 1;
      setCantidad(nuevaCantidad);
      producto.cantidad_pedido = nuevaCantidad;
    }
  };

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