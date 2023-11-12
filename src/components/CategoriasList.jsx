import React from 'react'
import useCategoria from '../hooks/useCategoria'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Spinner from './Spinner';

export default function CategoriasList() {
  const { cargando, categorias } = useCategoria()

  if(cargando) return <Spinner>Obteniendo Categorias...</Spinner>
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-5">
        {categorias.length > 0 ? (          
          categorias?.map(categoria => (
            <Card shadow="sm" key={categoria?._id} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <Image
                  radius="lg"
                  width="100%"
                  alt={categoria?.nombre}
                  className="w-full h-[100px] object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/categorias/${categoria?.imagen}`}
                />
              </CardBody>
              <CardFooter className="text-small justify-center">
                <b>{categoria?.nombre}</b>
              </CardFooter>
            </Card>
          ))
        ): (
          <h2>No hay categorias aún</h2>
        )}
      </div>
    </>
  )
}
