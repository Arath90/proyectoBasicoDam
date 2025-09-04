//NOTA 3.2 - COMPONENTE MyFunctions
//functions/MyFunctions.jsx es un componente de React que muestra un título en la pantalla.
//functions en general es una carpeta donde se pueden almacenar funciones reutilizables o componentes de React que encapsulan lógica específica.
function MyFunctions() {
//código javascript
//--------------------------------------------------------------------
    //se usa para imprimir mensajes en la consola del navegador, útil para depuración.
    console.log("Programa de Funciones");
//--------------------------------------------------------------------
    //se declara mediante la palabra reservada function seguida del nombre del componente (MyFunctions).
    return (
        //return se usa porque los componentes de React deben devolver un elemento JSX que representa la interfaz de usuario.
         // Fragmento vacío que permite agrupar múltiples elementos sin añadir nodos extra al DOM.
        <>
            <div>
                <h1>
                    Programa de Funciones
                </h1>
            </div>
        </>
    );
};
//este export permite que el componente MyFunctions sea importado y utilizado en otros archivos.
export default MyFunctions;