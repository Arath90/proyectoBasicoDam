/**
 * Componente MyPromisesAll
 * 
 * Este componente demuestra el uso de múltiples funciones que retornan Promesas en JavaScript,
 * y cómo manejarlas en paralelo usando Promise.all. También muestra cómo manejar errores (rejects).
 * 
 * Funcionamiento:
 * - fcnSumarUno: recibe un número y retorna una Promesa que suma uno después de 800ms.
 *   Si el número es mayor o igual a 7, la Promesa se rechaza con un mensaje de error.
 * - fcnSumarLento: recibe un número y retorna una Promesa que suma uno después de 800ms.
 *   Si el número es negativo, la Promesa se rechaza con un mensaje de error.
 * - fcnSumarRapido: función flecha que recibe un número y retorna una Promesa que suma uno después de 300ms.
 *   Si el número es negativo, la Promesa se rechaza con un mensaje de error.
 * - Se muestran ejemplos de llamadas individuales y en paralelo usando Promise.all.
 * - Promise.all permite ejecutar varias Promesas (y valores normales) al mismo tiempo y obtener todos los resultados juntos.
 * - Si alguna Promesa es rechazada, se maneja el error en el bloque .catch().
 * 
 * Ejemplo de flujo principal:
 * 1. fcnSumarLento(5) → resuelve 6 después de 800ms
 * 2. fcnSumarRapido(10) → resuelve 11 después de 300ms
 * 3. Promise.all([fcnSumarLento(5), fcnSumarRapido(10), true, '¡Hola Mundo!']) → resuelve [6, 11, true, '¡Hola Mundo!']
 * 4. Si alguna función rechaza, Promise.all ejecuta el bloque .catch() con el error.
 */

function MyPromisesAll() {
    // Función que recibe un número y retorna una Promesa que suma uno después de 800ms.
    // Si el número es mayor o igual a 7, la Promesa se rechaza.
    function fcnSumarUno(numero) {
        return new Promise(function(resolve, reject){
            if (numero >= 7 ){
                reject('fcnSumarUno: El número ya es muy alto');
                return;
            }
            setTimeout(function(){//porque es recursiva? porque se llama a si misma varias veces con la  llamada .then(fcnSumarUno)
                resolve(numero + 1);
            }, 800);
        });
    };

    // Función normal que regresa una Promesa, resultado lento.
    // Si el número es negativo, la Promesa se rechaza.
    function fcnSumarLento(numero) {
        return new Promise(function(resolve, reject){
            if (numero < 0) {
                reject('fcnSumarLento: El número no puede ser negativo');
                return;
            }
            setTimeout(function(){
                resolve(numero + 1);
            }, 800);
        });
    };

    // Función flecha optimizada, resultado rápido.
    // Si el número es negativo, la Promesa se rechaza.
    let fcnSumarRapido = (numero) => {
        return new Promise(function(resolve, reject){
            if (numero < 0) {
                reject('fcnSumarRapido: El número no puede ser negativo');
                return;
            }
            setTimeout(function(){
                resolve(numero + 1);
            }, 300);
        });
    };

    // Llamado normal de la función sumar lento y su promesa.
    /*fcnSumarLento(5)
        .then(respuesta => {
            console.log('Respuesta Lenta:', respuesta);
        })
        .catch(error => {
            console.log('Error en sumar lento:', error);
        });
*/
    // Llamado normal de la función sumar rápido y su promesa.
    // fcnSumarRapido(10)
    //     .then(respuesta => {
    //         console.log('Respuesta Rápida:', respuesta);
    //     })
    //     .catch(error => {
    //         console.log('Error en sumar rápido:', error);
    //     });

    // Llamado de varias funciones y valores al mismo tiempo con Promise.all.
    let arregloVarios = [
        fcnSumarLento(5),      // Promesa: resuelve 6
        fcnSumarRapido(10),    // Promesa: resuelve 11
        true,                  // Valor normal
        '¡Hola Mundo!',        // Valor normal
        fcnSumarUno(3)         // Promesa: rechaza por ser >= 7
    ];

    Promise.all(arregloVarios)
        .then(respuestas => {
            // Si todas las promesas se resuelven, imprime el arreglo de resultados.
            console.log('Respuestas:', respuestas);
        })
        .catch(error => {
            // Si alguna promesa es rechazada, imprime el error.
            console.log("Error en todas las promesas:", error);
        });

    // Renderiza un título en pantalla.
    return (
        <>
            <div>
                <h1>
                    Programa de Funciones con Promesas ALL
                </h1>
            </div>
        </>
    );
};

export default MyPromisesAll;