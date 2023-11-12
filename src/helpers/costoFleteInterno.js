export default function costoFleteInterno(peso, costo_flete_interno_por_tonelada) {
  return parseInt(peso / 1000 * costo_flete_interno_por_tonelada)
}
