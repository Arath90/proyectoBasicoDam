/**
 * Componente MyPromises
 * 
 * Este componente demuestra el uso de Promesas en JavaScript para manejar operaciones asíncronas.
 * El objetivo es mostrar cómo encadenar operaciones dependientes usando Promesas y cómo manejar errores.
 * 
 * Funcionamiento:
 * - Se define la función fcnSumarUno que recibe un número y retorna una Promesa.
 * - Si el número es mayor o igual a 7, la Promesa se rechaza con un mensaje de error.
 * - Si no, espera 800ms y resuelve la Promesa con el número incrementado en uno.
 * - Se muestran varios ejemplos de cómo encadenar Promesas usando .then() y cómo manejar errores con .catch().
 * 
 * Ejemplo de flujo principal:
 * 1. fcnSumarUno(5) → resuelve 6
 * 2. fcnSumarUno(6) → resuelve 7
 * 3. fcnSumarUno(7) → rechaza con 'El numero ya es muy alto'
 * 4. El resultado final o el error se imprime en la consola.
 */

function MyPromises() {
    // Función que recibe un número y retorna una Promesa que suma uno después de 800ms.
    // Si el número es mayor o igual a 7, la Promesa se rechaza.
    function fcnSumarUno(numero) {
        var promesa = new Promise(function(resolve, reject) {
            if (numero >= 7) {
                reject('El numero ya es muy alto');
            }
            setTimeout(function() {
                resolve(numero + 1);
            }, 800);
        });
        return promesa;
    };

    // Ejemplo de encadenamiento de Promesas con manejo de error:
    // Se llama a fcnSumarUno tres veces, cada vez con el resultado anterior.
    // Si en algún paso el número es >= 7, se ejecuta el bloque .catch().
    fcnSumarUno(2) 
        .then(fcnSumarUno) 
        .then(fcnSumarUno) 
        .then(nuevoNumero => { 
            console.log("Resultado:", nuevoNumero); 
        }) 
        .catch(error => { 
            console.log('Error en la Promesa', error); 
        });

    // Renderiza un título en pantalla.
    return (
        <>
            <div>
                <h1>
                    Programa de Funciones con Promesas
                </h1>
            </div>
        </>
    );
};

export default MyPromises;