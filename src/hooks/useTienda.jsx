import { useContext } from "react";
import TiendaContext from "../context/TiendaProvider";

export default function useTienda() {
  return useContext(TiendaContext)
}
