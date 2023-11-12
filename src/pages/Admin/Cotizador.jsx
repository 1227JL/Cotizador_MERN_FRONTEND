import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import ModalSeleccionCotizador from "../../components/ModalSeleccionCotizador";
import useProducto from "../../hooks/useProducto";
import useCotizador from "../../hooks/useCotizador";
import formatearPrecio from "../../helpers/formatearPrecio";
import costoImportacionM3 from "../../helpers/costoImportacionM3";
import costoFleteInterno from "../../helpers/costoFleteInterno";
import costoArancel from "../../helpers/costoArancel";
import precioCompraDespuesImpuestos from "../../helpers/precioCompraDespuesImpuestos";
import obtenerMargenGanancia from "../../helpers/obtenerMargenGanancia";
import calcularIVA from "../../helpers/calcularIVA";

export default function Cotizador() {

    const { productos } = useProducto()
    const { productosSelected, cotizacion, setCotizacion, submitCotizacion } = useCotizador()
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        const nuevosProductosFiltrados = productos.filter(producto => productosSelected.some(selected => selected === producto._id))
            .map(producto => ({
                _id: producto._id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                volumen: producto.volumen,
                peso: producto.peso,
                precio_compra: producto.precio_compra,
                cantidad: 1
            }));
            setProductosFiltrados(nuevosProductosFiltrados);
    }, [productosSelected, productos]);
        
    const [costoImportacionMetroCubico, setCostoImportacionMetroCubico] = useState('1850000')
    const [costoFleteInternoPorTonelada, setCostoFleteInternoPorTonelada] = useState('600000')
    const [impuestoIvaPorcentaje, setImpuestoIvaPorcentaje] = useState('19')
    const [porcentajeGanancia, setPorcentajeGanancia] = useState('35')
    
    const inputsCotizador = [
        {state: costoImportacionMetroCubico, stateSet: setCostoImportacionMetroCubico, type: 'number', label: 'Costo Importacion Metro Cubico', placeholder: 'Costo de Importación por m3'},
        {state: costoFleteInternoPorTonelada, stateSet: setCostoFleteInternoPorTonelada, type: 'number', label: 'Costo Flete Interno Tonelada', placeholder: 'Costo del flete interno por tonelada'},
        {state: impuestoIvaPorcentaje, stateSet: setImpuestoIvaPorcentaje, type: 'number', label: 'Impuesto IVA Porcentaje', placeholder: 'Ingresa el porcentaje del IVA'},
        {state: porcentajeGanancia, stateSet: setPorcentajeGanancia, type: 'number', label: 'Porcentaje Beneficio', placeholder: 'Ingresa el porcentaje de Beneficio'},
    ]
    
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if([costoImportacionMetroCubico, costoFleteInternoPorTonelada, impuestoIvaPorcentaje, porcentajeGanancia].includes('')){
            return
        }

        setCotizacion({
            fecha_Importacion: Date.now(),
            volumen_total: productosFiltrados.reduce((total, selected) => {
                const producto = productosFiltrados.find(producto => producto._id === selected._id);
                return total + (producto ? producto.volumen * producto.cantidad : 0);
            }, 0),
            peso_total: productosFiltrados.reduce((total, selected) => {
                const producto = productosFiltrados.find(producto => producto._id === selected._id);
                return total + (producto ? producto.peso * producto.cantidad : 0);
            }, 0),
            costo_importacion_metro_cubico: costoImportacionMetroCubico,
            costo_flete_interno_por_tonelada: costoFleteInternoPorTonelada,
            impuesto_iva_porcentaje: impuestoIvaPorcentaje,
            porcentaje_ganancia: porcentajeGanancia,
        })
    }

    const handleRealizarPedido = async () => {
        await submitCotizacion({ 
            ...cotizacion, 
            productos_importados: productosFiltrados.map(producto => ({
                producto: producto._id,
                cantidad: producto.cantidad,
                costo_importacion_metro_cubico: costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen),
                arancel_porcentaje: costoArancel(producto.precio_compra, producto.cantidad),
                costo_flete_interno_por_tonelada: costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada),
                impuesto_iva_porcentaje: calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje),
                precio_venta: obtenerMargenGanancia(precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)), cotizacion.porcentaje_ganancia) + precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)),
            }))
        });
    }

    return (
        <>
            <h1 className="text-center md:text-left uppercase text-3xl mb-5 text-primary-100 font-bold">Cotizador</h1>
            <ModalSeleccionCotizador/>
            <div className="bg-bg-300 p-5">
                {productosSelected.length > 0 ? (
                    <div>
                        <div>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
                                {productosFiltrados.map(producto => (
                                    <div key={producto._id} className="flex flex-col items-center bg-bg-100 rounded-md p-3">
                                        <img className="mix-blend-multiply h-24 w-32 sm:h-auto" src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto?.imagen}`} alt={`Imagen Producto ${producto.nombre}`} />
                                        <div>
                                            <p className="text-sm text-center font-bold">{producto?.nombre}</p>
                                            <p className="text-accent-100 text-center font-bold mb-2">${producto?.precio_compra}</p>
                                            <Input isInvalid={producto.cantidad == 0 ? true : false} errorMessage={producto.cantidad == 0 ? 'Ingresa una cantidad mayor a 0' : ''} color="primary" isRequired variant="bordered" className="text-center" type="number" min={0} placeholder="Digita las unidades" value={producto.cantidad}  onChange={(e) => {
                                                const newCantidad = parseInt(e.target.value) || '';
                                                const updatedProductos = productosFiltrados.map((p) =>
                                                    p._id === producto._id ? { ...p, cantidad: newCantidad } : p
                                                );
                                                setProductosFiltrados(updatedProductos);
                                            }}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-xl font-bold mb-3">Cobro de Impuestos por la Importación</h2>
                            <form onSubmit={handleSubmit} className="bg-bg-300 rounded">
                                {inputsCotizador.map(input => (
                                    <div key={input.label} className='mb-5'>
                                        <Input
                                            isInvalid={input.state == 0 ? true : false} errorMessage={input.state == 0 ? 'Ingresa una cantidad mayor a 0' : ''}
                                            type={input.type}
                                            label={input.label}
                                            labelPlacement={'inside'}
                                            placeholder={input.placeholder}
                                            value={input.state}
                                            onChange={e=>input.stateSet(e.target.value)}
                                        />
                                    </div>
                                ))}
                                <Button type="submit" fullWidth className="bg-accent-100 text-white">Realizar Cotización</Button>
                            </form>
                        </div>
                        <div className="mt-5">
                            {Object.keys(cotizacion).length > 0 ? (
                                <>
                                    <h2 className="text-center font-bold mb-5">Contenido de la Cotización</h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {productosFiltrados.map(producto => {
                                            cotizacion.gasto_total = productosFiltrados.reduce((total, producto) => total + (precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)) * producto.cantidad), 0)
                                            cotizacion.ganancia_total = productosFiltrados.reduce((total, producto) => total + (obtenerMargenGanancia(precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)), cotizacion.porcentaje_ganancia) * producto.cantidad), 0)
                                            cotizacion.cobro_impuestos = productosFiltrados.reduce((total, producto)=> total + (costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen) + costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada) + costoArancel(producto.precio_compra, producto.cantidad) * producto.cantidad), 0)
                                            cotizacion.unidades = productosFiltrados.reduce((total, producto) => total + (producto.cantidad), 0)

                                            return (
                                                <Card className="mb-5" key={producto._id}>
                                                    <CardHeader className="flex gap-3">
                                                        <Image
                                                            alt={`Imagen ${producto.nombre}`}
                                                            height={40}
                                                            radius="sm"
                                                            src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto.imagen}`}
                                                            width={40}
                                                        />
                                                        <div className="flex flex-col">
                                                            <p className="text-md">{producto.nombre}</p>
                                                        </div>
                                                    </CardHeader>
                                                    <Divider/>
                                                        <CardBody className="gap-2">
                                                            <div>
                                                                <p className="font-bold">Impuestos Aplicados</p>
                                                                <p className="text-small">Costo importacion metro cubico: <span className="text-danger-400">${formatearPrecio(costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen))}</span></p>
                                                                <p className="text-small">Costo flete interno por tonelada: <span className="text-danger-400">${formatearPrecio(costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada))}</span></p>
                                                                <p className="text-small">Costo arancel: <span className="text-danger-400">${formatearPrecio(costoArancel(producto.precio_compra, producto.cantidad))} +{producto.cantidad >= 100 ? '6%' : '8%'}</span></p>
                                                                <p className="text-small">IVA: <span className="text-danger-400">${formatearPrecio(calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje))} +{cotizacion.impuesto_iva_porcentaje}%</span></p>
                                                            </div>
                                                            <div>
                                                                <p className="font-bold">Total Impuestos por Unidad</p>
                                                                <p className="text-danger-400 text-xl font-bold">${formatearPrecio(costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen) + costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada) + costoArancel(producto.precio_compra, producto.cantidad) + calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje))}</p>
                                                            </div>
                                                        </CardBody>
                                                    <Divider/>
                                                    <Divider/>
                                                        <CardBody className="gap-2">
                                                            <div>
                                                                <p className="font-bold">Detalles del pedido</p>
                                                                <p className="text-small">Volumen Total: <span className="text-primary-100">{producto.volumen * producto.cantidad}m<sup>3</sup></span></p>
                                                                <p className="text-small">Peso Total: <span className="text-primary-100">{(producto.peso * producto.cantidad).toFixed(2)}kg</span></p>
                                                                <p className="text-small">Cantidad: <span className="text-primary-100">{producto.cantidad} {producto.cantidad > 1 ? 'Unidades' : 'Unidad'}</span></p>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <div>
                                                                <p className="text-small">Costo importacion metro cubico: <span className="text-danger-400">${formatearPrecio(costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen) * producto.cantidad)}</span></p>
                                                                <p className="text-small">Costo flete interno por tonelada: <span className="text-danger-400">${formatearPrecio(costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada) * producto.cantidad)}</span></p>
                                                                <p className="text-small">Costo arancel: <span className="text-danger-400">${formatearPrecio(costoArancel(producto.precio_compra, producto.cantidad) * producto.cantidad)} +{producto.cantidad >= 100 ? '6%' : '8%'}</span></p>
                                                                <p className="text-small">IVA: <span className="text-danger-400">${formatearPrecio(calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje) * producto.cantidad)} +{cotizacion.impuesto_iva_porcentaje}%</span></p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold">Total Impuestos Pedido</p>
                                                                    <p className="text-danger-400 text-xl font-bold">${formatearPrecio((costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen) + costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada) + costoArancel(producto.precio_compra, producto.cantidad) + calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)) * producto.cantidad)}</p>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    <Divider/>
                                                    <CardFooter className="flex-col items-start">
                                                        <div className="flex justify-between w-full">
                                                            <p className="text-small">Precio Compra:</p>
                                                            <span className="text-danger-400">${formatearPrecio(producto.precio_compra)}</span>
                                                        </div>
                                                        <div className="flex justify-between w-full">
                                                            <p className="text-small">Precio Compra despues de Impuestos: </p>
                                                            <span className="text-danger-400">${formatearPrecio(precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)))}</span>
                                                        </div>
                                                        <div className="flex justify-between w-full">
                                                            <p className="text-small">Precio Venta:</p>
                                                            <span className="text-accent-100">${formatearPrecio(obtenerMargenGanancia(precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)), cotizacion.porcentaje_ganancia) + precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad),calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)))}</span>
                                                        </div>
                                                        <div className="flex justify-between w-full mt-2">
                                                            <p className="font-bold">Ganancia Unitaria</p>
                                                            <p className="font-bold text-success-400 text-xl">${formatearPrecio(obtenerMargenGanancia(precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)), cotizacion.porcentaje_ganancia))}</p>
                                                        </div>
                                                        <div className="flex justify-between w-full">
                                                            <p className="font-bold">Ganancia Total</p>
                                                            <p className="font-bold text-success-400 text-xl">${formatearPrecio(obtenerMargenGanancia(precioCompraDespuesImpuestos(producto.precio_compra, costoImportacionM3(cotizacion.costo_importacion_metro_cubico, producto.volumen), costoFleteInterno(producto.peso, cotizacion.costo_flete_interno_por_tonelada), costoArancel(producto.precio_compra, producto.cantidad), calcularIVA(producto.precio_compra, cotizacion.impuesto_iva_porcentaje)), cotizacion.porcentaje_ganancia) * producto.cantidad)}</p>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            )
                                        }
                                        )}
                                        <Card className="mb-2 md:col-span-2">
                                            <CardHeader className="flex gap-3">
                                                <p className="font-bold">Detalles de la Orden</p>
                                            </CardHeader>
                                            <Divider/>
                                                <CardBody className="gap-2">
                                                    <div>
                                                        <p className="font-bold">Unidades</p>
                                                        <p className="mb-2">{cotizacion.unidades} unidades</p>
                                                        {productosFiltrados.map(producto => (
                                                            <p key={producto._id} className="text-small">{producto.cantidad} <span>{producto.nombre}</span></p>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Volumen Total</p>
                                                        <p>{(cotizacion.volumen_total)}m<sup>3</sup></p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Peso Total</p>
                                                        <p>{(cotizacion.peso_total).toFixed(2)}kg</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Cobro Impuestos</p>
                                                        <p className="font-bold text-xl text-danger-400">${formatearPrecio(cotizacion.cobro_impuestos)} <span className="text-small font-normal">{(cotizacion.cobro_impuestos / cotizacion.gasto_total * 100).toFixed(2)}% sobre el gasto total</span></p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Gasto Total</p>
                                                        <p className="font-bold text-xl text-danger-400">${formatearPrecio(cotizacion.gasto_total)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Ganancia Total</p>
                                                        <p className="font-bold text-xl text-success-400">${formatearPrecio(cotizacion.ganancia_total)}</p>
                                                    </div>
                                                </CardBody>
                                            <Divider/>
                                        </Card>
                                        <Button onClick={handleRealizarPedido} className="md:col-span-2 bg-primary-100 text-white">Realizar Orden</Button>
                                    </div>
                                </>
                            ) : (
                                <h2 className="text-center font-bold">Aquí se visualizarán los resultados despues de la Cotización</h2>
                            )}
                        </div>
                    </div>
                ) : (
                    <h2>Aun no hay productos seleccionados</h2>
                )}
            </div>
        </>
    )
}
