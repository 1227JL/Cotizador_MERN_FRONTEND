import { useContext } from "react"
import ProductoContext from "../context/ProductoProvider"

export default function useProducto() {
  return useContext(ProductoContext)
}
