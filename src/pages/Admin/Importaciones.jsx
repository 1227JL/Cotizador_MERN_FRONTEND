import React from 'react'
import useImportacion from '../../hooks/useImportacion'
import Importacion from '../../components/Importacion'

export default function Importaciones() {
  const { cargando, importaciones } = useImportacion()

  if(cargando) return 'Obteniendo Importaciones...'
  return (
    <>
      <h1 className="text-center md:text-left uppercase text-3xl mb-5 text-primary-100 font-bold">Importaciones</h1>
      {importaciones?.length > 0 ? (
        <div className='flex flex-col gap-3'>
          {importaciones?.map(importacion => (
           <Importacion key={importacion?._id} importacion={importacion}/>
          ))}
        </div>
      ) : (
        <h1>No hay importaciones aun</h1>
      )}
    </>
  )
}
