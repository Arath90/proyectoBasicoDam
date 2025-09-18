const cds = require ('@sap/cds');

class PricesHistoryClass extends cds.ApplicationService{
    async init (){
        this.on('getall', async (req)=> {
           return GetAllPricesHistory(req);
        });
        return await super.init();
    };
};
module.exports = PricesHistoryClass;