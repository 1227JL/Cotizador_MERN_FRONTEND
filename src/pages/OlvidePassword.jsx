import { useState } from "react"
import { Link } from "react-router-dom"

export default function OlvidePassword() {
  return (
    <>
        <h1 className='text-primary-100 font-black text-6xl capitalize text-center'>Recupera tu acceso</h1>

        <form className='my-10 bg-white shadow p-10 py-5 rounded-md'>
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
                // value={email}
                // onChange={e=>setEmail(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value={'Enviar Instrucciones'}
                className='bg-accent-100 w-full mb-5 text-center font-bold text-white p-3 rounded hover:cursor-pointer hover:bg-accent-200 transition-colors'
            />
        </form>

        <nav className='lg:flex lg:justify-between'>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/'}>¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/registrar'}>¿No tienes una cuenta? Regístrate</Link>
        </nav>
    </>
  )
}
