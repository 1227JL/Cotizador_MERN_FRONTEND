import { Button } from '@nextui-org/react'
import React from 'react'
import ModalCategoria from '../../components/ModalCategoria'
import useCategoria from '../../hooks/useCategoria'
import Categoria from '../../components/Categoria'
import Spinner from '../../components/Spinner'

export default function Categorias() {

    const { cargando, categorias, handleModalCategoria } = useCategoria()

    if(cargando) return <Spinner>Obteniendo Categorias...</Spinner>
    return (
        <>
            <div className="mb-5 md:mb-0 md:flex md:justify-between">
                <h1 className="text-center md:text-left uppercase text-3xl mb-5 text-primary-100 font-bold">Categorias de los Productos</h1>
                <Button onClick={handleModalCategoria} className="w-full md:w-auto bg-accent-100 text-white">Agregar Categoria</Button>
            </div>
            <ModalCategoria/>
            {categorias.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-5"'>
                    {categorias?.map(categoria => (
                        <Categoria key={categoria._id} categoria={categoria}/>
                    ))}
                </div>
            ): (
                <h2>No hay categorias aun</h2>
            )}
        </>
    )
}