import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Input, Textarea, Button, Image, Select, SelectItem} from "@nextui-org/react";
import useProducto from "../hooks/useProducto";
import FileUpload from "./FileUpload";
import Alerta from "./Alerta";
import useCategoria from "../hooks/useCategoria";

export default function ModalNuevoProducto() {

  const { alerta, setAlerta, submitProducto, modalNuevoProducto, handleModalNuevoProducto, producto } = useProducto()
  const {categorias} = useCategoria()
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [peso, setPeso] = useState('')
  const [volumen, setVolumen] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagen, setImagen] = useState(null)

  useEffect(() => {
    if(Object.values(producto) !== ''){
      setId(producto._id)
      setNombre(producto.nombre)
      setPeso(producto.peso)
      setVolumen(producto.volumen)
      setPrecio(producto.precio_compra)
      setDescripcion(producto.descripcion)      
      setCategoria(producto.categoria)      
    }
  }, [producto])
  

  const inputsTitulada = [
    {state: nombre, stateSet: setNombre, type: 'text', label: 'Nombre Producto', placeholder: 'Nombre del Producto'},
    {state: peso, stateSet: setPeso, type: 'number', label: 'Peso Producto', placeholder: 'Peso del Producto en kg'},
    {state: volumen, stateSet: setVolumen, type: 'number', label: 'Volumen Producto', placeholder: 'Volumen del Producto m3'},
    {state: precio, stateSet: setPrecio, type: 'number', label: 'Precio Producto', placeholder: 'Precio del Producto'},
  ]

  const handleSubmit = async (e)  => {
    e.preventDefault()

    if([nombre, peso, volumen, precio, descripcion, categoria].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(!imagen && !id){
      setAlerta({
        msg: 'Es necesario subir la imagen del producto',
        error: true
      })
      return
    }

    setAlerta({})

    await submitProducto({id, nombre, peso, volumen, precio_compra: precio, descripcion, categoria, imagen})

    setImagen(null)
  }

  const { msg } = alerta

  return (
    <>
      <Modal size="xl" isOpen={modalNuevoProducto} onOpenChange={handleModalNuevoProducto}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{id ? 'Editar' : 'Agregar'} Producto</ModalHeader>
              <ModalBody>
                {msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit} action="" encType="multipart/form-data">
                  {inputsTitulada.map(input => (
                    <div key={input.label} className='mb-5'>
                      <Input
                        type={input.type}
                        label={input.label}
                        labelPlacement={'inside'}
                        placeholder={input.placeholder}
                        value={input.state}
                        onChange={e=>input.stateSet(e.target.value)}
                      />
                    </div>
                  ))}
                  <div className="mb-5">
                    <Select
                      label="Categoria producto"
                      placeholder="Selecciona una categoria"
                      value={categoria}
                      onChange={e=>setCategoria(e.target.value)}
                      defaultSelectedKeys={categoria ? [categoria] : []}
                    >
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria._id} value={categoria.nombre}>
                          {categoria.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Textarea
                      label="Descripción Producto"
                      labelPlacement="outside"
                      placeholder="Ingresa la descripción del Producto"
                      value={descripcion}
                      onChange={e=>setDescripcion(e.target.value)}
                    />
                  </div>
                  <div className={id ? 'flex justify-between' : ''}>
                    {id && (
                      <div>
                        <p className="text-small mt-2 text-foreground font-medium">Imagen Actual</p>
                        <Image width={100} height={100} src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/productos/${producto.imagen}`}/>
                      </div>
                    )}
                    <div>
                      <FileUpload onFileSelect={(file) => setImagen(file)}>Producto</FileUpload>
                    </div>
                  </div>

                  <Button className="bg-accent-100 mb-5 text-white" fullWidth type='submit'>{id ? 'Editar' : 'Agregar'} Producto</Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
