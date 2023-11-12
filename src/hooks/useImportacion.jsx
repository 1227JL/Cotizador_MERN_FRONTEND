import { useContext } from "react";
import ImportacionContext from "../context/ImportacionProvider";

export default function useImportacion() {
  return useContext(ImportacionContext)
}
