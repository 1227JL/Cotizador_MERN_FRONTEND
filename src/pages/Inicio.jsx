import CategoriasList from "../components/CategoriasList"
import Productos from "./Productos"

export default function Inicio() {
  return (
    <>
      <div>
        <h1 className='font-medium mb-5 text-xl'>Categorias</h1>
        <CategoriasList/>
      </div>
      <Productos/>
    </>
  )
}
  