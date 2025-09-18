
// src/api/controllers/inv-inversions-controller.js
const cds = require('@sap/cds');
class InvService extends cds.ApplicationService {
  async init() {
    this.on('getall', async (req) => {
      // tu lógica aquí
      // e.g., return cds.run(SELECT.from('inv.priceshistory'));
      
      return [];
    });
    return super.init();
  }
}
module.exports = InvService;


//2.-importar el servicio
const {GetAllPricesHistory} = require('../services/inv-priceshistory-service');
// aun no esta creado el servicio

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