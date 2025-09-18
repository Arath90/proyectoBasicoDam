const cds  = require ('@sap/cds')
//2.-importar el servicio
const {GetAllPricesHistory} = require('../services/inv-priceshistory-service');

//3.- estructura princiapl  de la clase de controller
class InversionsClass extends cds.ApplicationService{

    //4.-iniciiarlizarlo de manera asincrona
    async init (){
        this.on('getall', async (req)=> {
            //llamada al metodo de servicio y retorna el resultado de la ruta
            return GetAllPricesHistory(req);
        });
        return await super.init();
    };


};

module.exports = InversionsClass;