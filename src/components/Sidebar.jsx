import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {

  const location = useLocation()

  return (
    <div className='lg:w-1/5 px-8 py-5 lg:h-full'>
      <ul className='flex flex-col gap-2'>
        <Link
          to={'productos'}
        >
          <li className={`${location.pathname.includes('productos') ? 'bg-bg-200' : ''} text-center lg:text-left p-2 rounded-lg hover:bg-bg-200 hover:shadow transition-shadow`}>Productos</li>
        </Link>
        <Link
          to={'categorias'}
        >
          <li className={`${location.pathname.includes('categorias') ? 'bg-bg-200' : ''} text-center lg:text-left p-2 rounded-lg hover:bg-bg-200 hover:shadow transition-shadow`}>Categorias</li>
        </Link>
        <Link
          to={'importaciones'}
        >
          <li className='text-center lg:text-left p-2 rounded-lg hover:bg-bg-200 hover:shadow transition-shadow'>Importaciones</li>
        </Link>
        <Link
          to={'pedidos'}
        >
          <li className='text-center lg:text-left p-2 rounded-lg hover:bg-bg-200 hover:shadow transition-shadow'>Pedidos Realizados</li>
        </Link>
        <Link
          to={'cotizar-importacion'}
        >
          <li className='text-center lg:text-left p-2 rounded-lg hover:bg-bg-200 hover:shadow transition-shadow'>Cotizar Importación</li>
        </Link>
      </ul>
    </div>
  )
}
