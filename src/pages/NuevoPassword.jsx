import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../../config/clienteAxios"
import Alerta from "../components/Alerta"

export default function NuevoPassword() {

  const params = useParams()
  const { token } = params

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)


  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg ,
          error: true
        })
      }
    }
    return ()=>{comprobarToken()}
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta


  return (
    <>
      <h1 className='text-primary-100 font-black text-6xl capitalize mb-5'>Restablece tu Password y obten de nuevo el <span className='text-slate-600'>Acceso</span></h1>

      {msg && <Alerta alerta={alerta}/>}
      {tokenValido && (
        <form onSubmit={handleSubmit} className='my-10 bg-white shadow-200 p-10 py-5 rounded-md'>
          <div className='my-5'>
            <label 
              htmlFor="password"
              className='uppercase text-gray-600 block text-sm font-bold'
            >Nuevo Password</label>
            <input
              type="password" 
              id="password" 
              placeholder='Escribe tu Nuevo Password'
              className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-primary-100 outline-none'
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          <input 
            type="submit"
            value={'Guardar Nuevo Password'}
            className='bg-accent-100 w-full mb-5 text-center font-bold text-white p-3 rounded hover:cursor-pointer hover:bg-primary-200 transition-colors'
          />
        </form>
      )}

      {passwordModificado && (
        <Link 
          to={'/'}
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Inicia Sesión</Link>
      )}
    </>
  )
}
