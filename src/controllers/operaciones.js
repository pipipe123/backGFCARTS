export default function generarCodigoAleatorio(longitud = 8) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigoAleatorio = '';
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigoAleatorio += caracteres.charAt(indiceAleatorio);
    }
    return codigoAleatorio;
}

console.log(generarCodigoAleatorio()); // Ejemplo de salida: "aB3dE1Gh"
