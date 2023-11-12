import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/clienteAxios"
import useAuth from "../hooks/useAuth"
import { Input } from "@nextui-org/react"



export default function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { auth, setAuth } = useAuth()
    
    const handleSubmit =  async (e) => {
        e.preventDefault()

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        
        setAlerta({})

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            localStorage.setItem('token', data.token)
            setAuth(data)
            if(data.rol === 'administrador'){
                navigate('/admin')
                return
            }
            navigate('/tienda')
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
            <h1 className='text-primary-100 text-6xl font-black capitalize text-center'>Inicia Sesion</h1>

            <form onSubmit={handleSubmit} className='my-10 bg-white shadow p-10 py-5 rounded-md'>
                {msg && <Alerta alerta={alerta}/>}
                <div className='my-5'>
                    <label 
                        htmlFor="email"
                        className='uppercase text-gray-600 block text-sm font-bold'
                    >Email</label>
                    <input
                        type="text" 
                        id="email" 
                        placeholder='Email de Registro'
                        className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-accent-100 outline-none'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label 
                        htmlFor="password"
                        className='uppercase text-gray-600 block text-sm font-bold'
                    >Password</label>
                    <input
                        type="password" 
                        id="password" 
                        placeholder='Password de Registro'
                        className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-accent-100 outline-none'
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value={'Iniciar Sesión'}
                    className='bg-accent-100 w-full mb-5 text-center font-bold text-white p-3 rounded hover:cursor-pointer hover:bg-accent-200 transition-colors'
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/registrar'}>¿No tienes una cuenta? Regístrate</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/olvide-password'}>Olvide mi password</Link>
            </nav>
        </>
    )
}
