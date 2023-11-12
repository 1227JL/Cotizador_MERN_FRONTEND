import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { toast } from "react-toastify";

const CategoriaContext = createContext()

const CategoriaProvider = ({children})=>{

    const [ categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState({})
    const [cargando, setCargando] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [ modalCategoria, setModalCategoria] = useState(false)

    useEffect(()=>{
        const obtenerCategorias = async () => {
            try {
                setCargando(true)
                const { data } = await clienteAxios('/categorias')
                setCategorias(data)
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
        }

        return ()=>obtenerCategorias()
    }, [])

    const handleModalCategoria = () => {
        setModalCategoria(!modalCategoria)
    }

    const submitCategoria = async (categoria) => {
        if(categoria.id){
            await editarCategoria(categoria)
            return   
        }

        await registrarCategoria(categoria)
    }

    const editarCategoria = async () => {
        console.log('Editando Categoria')
    }

    const registrarCategoria = async (categoria) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            const { data } = await clienteAxios.post('/categorias', categoria, config)
            setCategorias([...categorias, data])
            toast.success('Categoria Creada Exitosamente')

            setTimeout(() => {
                setModalCategoria(false)
            }, 1000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            console.log(error)
        }
    }

    return (
        <CategoriaContext.Provider
            value={{
                alerta,
                cargando,
                setAlerta,
                categorias,
                categoria,
                modalCategoria,
                handleModalCategoria,
                submitCategoria
            }}
        >
            {children}
        </CategoriaContext.Provider>
    )
}

export {
    CategoriaProvider
}

export default CategoriaContext