import { useContext } from "react"
import CotizadorContext from "../context/CotizadorProvider"

export default function useCotizador() {
  return useContext(CotizadorContext)
}
