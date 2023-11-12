import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/clienteAxios"
import { useEffect, useState } from "react"

export default function ConfirmarCuenta() {

  const params = useParams()
  const { token } = params
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${token}`)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    return ()=>{confirmarCuenta()}
  }, [])
  
  const { msg } = alerta

  return (
    <>
      <h1 className='text-primary-100 font-black text-6xl capitalize'>Confirma tu cuenta</h1>
      <div className="mt-20 md:mt-10 shadow-100 px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta}/>}

        {cuentaConfirmada && (
          <Link 
            to={'/'}
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}
