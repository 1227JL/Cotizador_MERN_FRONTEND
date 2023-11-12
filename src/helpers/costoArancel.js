export default function costoArancel(precio_compra, cantidad) {
  return parseInt(cantidad >= 100 ? (precio_compra * 6) : (precio_compra * 8)) / 100
}
