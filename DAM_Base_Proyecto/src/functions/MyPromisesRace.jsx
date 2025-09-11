//MyPromisesRace.jsx
//este es una funcion que tiene la finalidad de demostrar el uso de Promise con diferentes tiempos de espera y observar su comportamiento
//ademas de la manera en que se definen las funciones que regresan promesas mediante resolve y reject.
function MyPromisesRace() {

    // funcion normal que regresa una promesa
    //pero el resultado se obtiene mas lento.
    function fcnSumarLento( numero ){
        /* var promesa = new Promise(function(resolve, reject){
        });
        return promesa; */
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve( numero + 1 );
                reject('Error en la promesa de la funcion Sumar Lento');
                }, 800);
        });
    };

    // esta es la manera mas optimizada de definir una funcion
    //pero de tipo arrow (flecha) que tambien regresa una promesa
    //pero el resultado se obtiene mas rapido.
    let fcnSumarRapido = (numero)=>{
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve( numero + 1 );
                reject('Error en la promesa de la funcion Sumar Rapido');
                //!porque poner aqui el reject si nunca se cumple?
                //esto nunca se cumple porque el resolve se ejecuta primero
                //y una vez que se ejecuta el resolve, la promesa ya se considera resuelta y el reject ya no tiene efecto.
                //si quisieramos que el reject se cumpliera, tendriamos que ponerlo antes del resolve
                //pero entonces la promesa siempre se rechazaria y nunca se resolveria.
                //asi que no tiene sentido ponerlo despues del resolve.
                //nomas esta aqui para que veas como se pone un reject gato.
            }, 1000);
        });
    };

    // Promise.race
    // La promesa que se resuelva primero, gana. Y se obtiene su resultado.
    //EN BASE A LOS PARAMETROS Y TIEMPOS DEFINIDOS, GANA LA PROMESA DE fcnSumarLento PORQUE TIENE MENOR TIEMPO DE ESPERA (800ms)
    //y sus condiciones de reject no se cumplen.
    //! pero... porque no se cumplen diras pequeña niña que llora?
    //pues porque la promesa de fcnSumarRapido tiene un tiempo de espera mayor (1000ms)
    //y ademas su condicion de reject se encuentra despues del resolve, por lo que nunca se cumple.
    //asi que si, al igual que las elecciones a presidente, gana el que tenga el favoritismo del publico (osea yo o tu el que mueve los tiempos).
    Promise.race([fcnSumarLento(5), fcnSumarRapido(10)])
    .then(respuesta =>{
        //Respuesta con mayusculas porque es un dato que viene de fuera
        //y asi se distingue de las variables locales.
        //pero de donde fuera mi ñero? pues de las promesas que se estan ejecutando.
        //osease de fcnSumarLento y fcnSumarRapido.
        console.log('Respuesta:', respuesta);
    })
    .catch(error=>{
        console.log("Error en la respuesta de la promesa: ", error);
    });
    return (
        <>
            <div>
                <h1>

                    Programa de Funciones con Promesas RACE
                </h1>
            </div>
        </>
    );
};

export default MyPromisesRace;