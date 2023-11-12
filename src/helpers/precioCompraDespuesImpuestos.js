export default function precioCompraDespuesImpuestos(precio_compra, costo_importacion, costo_flete, arancel, iva) {
  return parseInt(precio_compra + costo_importacion + costo_flete + arancel + iva)
}
