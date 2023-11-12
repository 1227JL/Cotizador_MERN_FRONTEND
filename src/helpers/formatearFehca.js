export default function formatearFecha(fecha) {
    const fechaOriginal = new Date(fecha);
    
    const dia = fechaOriginal.getDate().toString().padStart(2, '0');
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses en JavaScript van de 0 a 11.
    const anio = fechaOriginal.getFullYear();
    
    const horas = fechaOriginal.getHours().toString().padStart(2, '0');
    const minutos = fechaOriginal.getMinutes().toString().padStart(2, '0');
    const segundos = fechaOriginal.getSeconds().toString().padStart(2, '0');
    
    const formato = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    
    return formato;
}