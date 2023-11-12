import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button} from "@nextui-org/react";
import useProducto from "../hooks/useProducto";
import formatearPrecio from "../helpers/formatearPrecio";

export default function ModalProducto() {

  const { producto, modalProducto, handleModalProducto, handleModalNuevoProducto, eliminarProducto } = useProducto()
  
  return (
    <>
      <Modal size="5xl" isOpen={modalProducto} onOpenChange={handleModalProducto}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{producto?.nombre}</ModalHeader>
              <ModalBody>
                <div className="md:flex">
                  <img className="mx-auto w-1/2" src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto.imagen}`} alt={`Imagen ${producto?.nombre}`} />
                  <div className="flex flex-col gap-2 p-2">
                    <h2 className="font-bold text-xl">Información del Producto</h2>
                    <div>
                      <h3 className="font-bold">Descripción</h3>
                      <p>{producto?.descripcion}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Proporciones</h3>
                      <p>{producto?.peso}kg</p>
                      <p>{producto?.volumen}m<sup>3</sup></p>
                    </div>
                    <div>
                      <h3 className="font-bold">Precio</h3>
                      <p>${formatearPrecio(producto?.precio_compra)}</p>
                    </div>
                    <div className="flex gap-5 mt-2">
                      <Button onClick={()=>{
                        handleModalProducto(),
                        handleModalNuevoProducto(producto)
                      }} color="primary" radius="sm">Editar</Button>
                      <Button onClick={()=>eliminarProducto(producto._id)} color="danger" radius="sm">Eliminar del Inventario</Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
