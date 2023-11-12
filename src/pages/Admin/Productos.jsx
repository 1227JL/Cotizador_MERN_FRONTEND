import useProducto from "../../hooks/useProducto"
import Producto from "../../components/Producto"
import ModalProducto from "../../components/ModalProducto"
import { Button } from "@nextui-org/react"
import ModalNuevoProducto from "../../components/ModalNuevoProducto"

export default function Productos() {

    const { cargando, productos, handleModalNuevoProducto } = useProducto()

    if(cargando) return 'Obteniendo Productos...'

    return (
        <>
            <div className="mb-5 md:mb-0 md:flex md:justify-between">
                <h1 className="text-center md:text-left uppercase text-3xl mb-5 text-primary-100 font-bold">Productos en Stock</h1>
                <Button onClick={handleModalNuevoProducto} className="w-full md:w-auto bg-accent-100 text-white">Agregar Producto</Button>
            </div>
            {productos.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productos?.map(producto => (
                        <Producto key={producto?._id} producto={producto}/>
                    ))}
                </div>
            ) : (
                <h2>No hay productos aun</h2>
            )}

            <ModalProducto/>
            <ModalNuevoProducto/>
        </>
    )
}
