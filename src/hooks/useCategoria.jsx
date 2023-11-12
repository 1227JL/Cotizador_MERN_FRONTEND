import { useContext } from "react";
import CategoriaContext from "../context/CategoriaProvider";

export default function useCategoria() {
  return useContext(CategoriaContext)
}
