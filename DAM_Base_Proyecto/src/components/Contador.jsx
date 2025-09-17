import { useState } from 'react'
//se crea el componente Contador el cual va a  mostrar una mini ventana con un contador que se puede incrementar y decrementar
export const Contador = () => {
    //se crea una variable de estado llamada valor y una funcion para actualizar su valor llamada setValor, se inicializa en 1
    const [valor, setValor] = useState(1);
    //se crea la funcion acumular la cual recibe un numero y actualiza el valor de la variable de estado valor sumando el numero recibido
    const acumular = (numero) => {
        setValor(valor + numero);
        //se imprime en consola el valor actual de la variable de estado valor
        console.log("Valor actual:", valor);
    };
    return (
        <div>
            <h1>
                Aprender useState
            </h1>
            <h2>
                Contador: <small>{valor}</small>
            </h2>
            <button onClick={() => acumular(1)}>
                Sumar (+1)
            </button>
            &nbsp;
            <button onClick={() => acumular(-1)}>
                Restar (-1)
            </button>
        </div>
    )
}