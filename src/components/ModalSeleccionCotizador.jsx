import {CheckboxGroup, Checkbox, cn} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button} from "@nextui-org/react";
import useProducto from "../hooks/useProducto";
import useCotizador from "../hooks/useCotizador";

export default function ModalSeleccionCotizador() {

    const { productos } = useProducto()
    const { productosSelected, setProductosSelected, modalCotizadorProductos, handleModalCotizadorProductos } = useCotizador()
    
    return (
        <>
            <Button className="bg-accent-100 text-white w-full md:w-auto mb-5" radius="sm" onPress={handleModalCotizadorProductos}>Seleccionar Productos</Button>
            <Modal size="xl" isOpen={modalCotizadorProductos} onOpenChange={handleModalCotizadorProductos}>
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Agrega los productos que quieras cotizar</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-1 w-full">
                                <CheckboxGroup
                                    value={productosSelected}
                                    onChange={setProductosSelected}
                                >
                                    {productos?.map(producto => (
                                        <Checkbox
                                            classNames={{
                                                base: cn(
                                                    "inline-flex bg-content1 m-0",
                                                    "hover:bg-content2 items-center justify-start",
                                                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                    "data-[selected=true]:border-primary"
                                                ),
                                            }}
                                            key={producto?._id}
                                            value={producto?._id}
                                        >
                                            <div className="flex items-center">
                                                <img className="w-1/5 mix-blend-multiply" src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto?.imagen}`} alt={`Imagen Producto ${producto.nombre}`} />
                                                <div>
                                                    <p className="text-xl font-bold">{producto?.nombre}</p>
                                                    <p className="text-accent-100 font-bold">${producto?.precio_compra}</p>
                                                </div>
                                            </div>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                                
                            </div>
                        </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
}
