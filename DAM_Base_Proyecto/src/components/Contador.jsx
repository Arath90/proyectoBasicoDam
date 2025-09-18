// useState es un hook de React que permite a los componentes funcionales manejar un estado interno.
// Un estado es básicamente un dato que cambia con el tiempo y que, al cambiar, provoca que el componente se renderice de nuevo.
// ?estado: variable que guarda el valor actual.
// ?setEstado: función que actualiza el valor del estado.
// ?valorInicial: valor con el que se inicializa el estado.
import { useState } from 'react'
import { useEffect } from 'react';
// Se crea un componente funcional llamado Contador
export const Contador = () => {
    // Se define un estado llamado 'valor' con valor inicial 1
    // y la función 'setValor' que permite modificarlo.
    const [valor, setValor] = useState(1);
    // Función para acumular (sumar o restar) el valor del contador
    const acumular = (numero) => {
        // Actualiza el estado sumando el número recibido
        setValor(valor + numero);
        // Imprime en consola el valor actual (ojo: aquí React todavía no ha actualizado el DOM)
        console.log("Valor actual asíncrono:", valor);
    // !En React, la actualización de estado con setValor es asíncrona.
    // !Eso significa que el console.log("Valor actual:", valor); mostrará el valor previo, no el nuevo.
    
    };
    // !Conviene usar un useEffect para reaccionar a los cambios.
    // useEffect es un hook que reacciona al mismo tiempo que se realizan los cambios
    //* esta a la par con useState
    useEffect(() => {
    console.log("Valor actual :", valor);
    }, [valor]);

    // Renderiza la UI
    return (
        <div>
            <h1>Aprender useState</h1>
            <h2>
                Contador: <small>{valor}</small>
            </h2>
            {/* Botón para incrementar el contador */}
            <button onClick={() => acumular(1)}>
                Sumar (+1)
            </button>
            &nbsp;
            {/* Botón para decrementar el contador */}
            <button onClick={() => acumular(-1)}>
                Restar (-1)
            </button>
        </div>
    )
}
