/**
 * !Componente MyFunctions
 * 
 * Este componente demuestra el uso de funciones asíncronas con callbacks en JavaScript.
 * El objetivo es mostrar cómo encadenar operaciones que dependen de resultados previos usando callbacks,
 * simulando asincronía con setTimeout.
 * 
 * Funcionamiento:
 * - Se define una función fcnSumarUno que recibe un número y un callback.
 * - La función espera 800ms y luego ejecuta el callback con el número incrementado en uno.
 * - Se encadenan tres llamadas a fcnSumarUno, cada una usando el resultado de la anterior.
 * - El resultado final se muestra en la consola.
 * 
 * Ejemplo de flujo:
 * 1. fcnSumarUno(5, cb) → cb(6)
 * 2. fcnSumarUno(6, cb) → cb(7)
 * 3. fcnSumarUno(7, cb) → cb(8)
 * 4. Se imprime "Resultado: 8" en la consola.
 */

function MyFunctions() {
    // Función asíncrona que recibe un número y un callback.
    // Después de 800ms, llama al callback con el número + 1.
    function fcnSumarUno(numero, fcnResultadoCallBack) {
        setTimeout(function () {
            fcnResultadoCallBack(numero + 1);
        }, 800);
    }

    // Mensaje inicial en consola para indicar el inicio del programa.
    console.log("Programa de Funciones");

    // Ejemplo de encadenamiento de callbacks:
    // Se llama a fcnSumarUno tres veces, cada vez con el resultado anterior.
    fcnSumarUno(5, function (nuevoValor1) {
        fcnSumarUno(nuevoValor1, function (nuevoValor2) {
            fcnSumarUno(nuevoValor2, function (nuevoValor3) {
                console.log("Resultado:", nuevoValor3); // Resultado final: 8
            });
        });
    });

    // Renderiza un título en pantalla.
    return (
        <>
            <div>
                <h1>
                    Programa de Funciones
                </h1>
            </div>
        </>
    );
}

export default MyFunctions;