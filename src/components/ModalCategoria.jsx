import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Input, Textarea, Button, Image} from "@nextui-org/react";
import useCategoria from "../hooks/useCategoria";
import FileUpload from "./FileUpload";
import Alerta from "./Alerta";

export default function ModalCategoria() {

  const { alerta, setAlerta, submitCategoria, modalCategoria, handleModalCategoria, categoria } = useCategoria()
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [imagen, setImagen] = useState(null)

  useEffect(() => {
    if(Object.values(categoria) !== ''){
      setId(categoria._id)
      setNombre(categoria.nombre)    
    }
  }, [categoria])
  
  const handleSubmit = async (e)  => {
    e.preventDefault()

    if(!nombre){
        console.log('campo vacio')
      setAlerta({
        msg: 'Es necesario asignar un nombre a la categoria',
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

    await submitCategoria({id, nombre, imagen})

    setNombre('')
    setImagen(null)
  }

  const { msg } = alerta

  return (
    <>
      <Modal size="xl" isOpen={modalCategoria} onOpenChange={handleModalCategoria}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{id ? 'Editar' : 'Agregar'} Categoria</ModalHeader>
              <ModalBody>
                {msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit} action="" encType="multipart/form-data">
                  <div className='mb-5'>
                    <Input
                      type='text'
                      label='Nombre Categoria'
                      labelPlacement={'inside'}
                      placeholder='Nombre de la Categoria'
                      value={nombre}
                      onChange={e=>setNombre(e.target.value)}
                    />
                  </div>
                  {id && (
                    <>
                      <p className="text-small mt-2 text-foreground font-medium">Imagen Actual</p>
                      <Image width={100} height={100} src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/${categoria.imagen}`}/>
                    </>
                  )}
                  <div>
                    <FileUpload onFileSelect={(file) => setImagen(file)}>Categoria</FileUpload>
                  </div>

                  <Button className="bg-accent-100 mb-5 text-white" fullWidth type='submit'>{id ? 'Editar' : 'Agregar'} Categoria</Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
