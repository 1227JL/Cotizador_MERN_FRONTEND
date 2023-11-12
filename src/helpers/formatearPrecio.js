export default function formatearPrecio(precio) {
    const precioSinDecimales = Math.trunc(precio); // o Math.floor(precio) para redondear hacia abajo

    const precioFormateado = precioSinDecimales?.toLocaleString('es-CO');
    return precioFormateado;
}
