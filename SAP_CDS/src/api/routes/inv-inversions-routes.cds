
//1.-importar el modelo de datos de pricehistory desestructurandolos
using {inv as myinv} from '../models/inv-inversions';


//2.-implementacion del controlador logico
@impl: 'src/api/controllers/inv-inversions-controller.js'


//3.-creacion de la estructura base
//definicion del servicio
service InversionssRoute @(path:'/api/inv'){


    //4.-instanciar la entidad de prices history
    entity priceshistory as projection on myinv.priceshistory;
    entity strategies as projection on myinv.strategies;


    //5.- definir la ruta de la API GEt ALL price history
    //definir la endpont
    localhost:333/api/inv/priceshistory/getall

    // no olvidar que el nombre de la funcion debe ser el mismo que el del path


    //localhost:3333/api/inv/getall
    @Core.Description: 'get-all-prices-history'
    @path :'getall'
        function getall()
        returns array of priceshistory;

}