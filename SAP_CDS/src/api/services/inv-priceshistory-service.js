const ztpriceshistory = require('../models/mongodb/ztpriceshistory');

async function GetAllPricesHistory(req){
    try{
        let pricesHistory;
        pricesHistory = await ztpriceshistory.find().lean();
        return(pricesHistory);
    }catch(error){
        return error;
    } finally {

    }
};

module.exports = { GetAllPricesHistory };