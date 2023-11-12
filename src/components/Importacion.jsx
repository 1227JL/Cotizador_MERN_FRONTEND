import React from 'react'
import {Accordion, AccordionItem, Chip, Image} from "@nextui-org/react";
import formatearFecha from '../helpers/formatearFehca'

export default function Importacion({importacion}) {
  return (
    <Accordion variant="splitted">
        <AccordionItem aria-label={`Importación ${importacion?._id}`} subtitle={
            <div className='flex gap-2 mt-2'>
                {importacion?.productos_importados?.map(producto => (
                    <div key={producto?._id} className='flex flex-col gap-1 items-center p-2 bg-bg-100 rounded-xl'>
                    <Image className='mix-blend-multiply' width={70} height={60} src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto?.producto?.imagen}`}/>
                    <Chip size='sm' color='primary'>{producto?.cantidad}</Chip>
                    </div>
                ))}
            </div>
        } title={<div className='md:flex md:justify-between'>
            <p>{importacion._id}</p>
            <p className='text-foreground-400'>{formatearFecha(importacion?.fecha_importacion)}</p>
            </div>}>
            <h2 className='font-bold'>Detalles de Importación</h2>
        </AccordionItem>
    </Accordion>
  )
}
