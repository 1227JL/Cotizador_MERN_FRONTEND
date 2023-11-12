export default function obtenerMargenGanancia(precio_compra, porcentaje_beneficio) {
    return parseInt(precio_compra * porcentaje_beneficio / 100)
}
