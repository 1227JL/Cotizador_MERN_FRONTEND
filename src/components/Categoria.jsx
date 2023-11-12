import React from 'react'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function Categoria({categoria}) {
  return (
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
    )
}
