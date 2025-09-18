
//1.-importar el modelo de datos de pricehistory desestructurandolos
using {inv as myinv} from '../models/inv-inversions';

//2.-implementacion del controlador logico
@impl: 'src/api/controllers/inv-inversions-controller.js'


//3.-creacion de la estructura base
//definicion del servicio
service InversionsRoute @(path:'/api/inv'){

    entity priceshistory as projection on myinv.priceshistory;
    entity Estrategias as projection on myinv.strategies;

    @Core.Description: 'get-all-prices-history'
    @path :'ObtenerTodo'
        function getall()
        returns array of priceshistory;

}