// src/api/services/inv-priceshistory-service.js
const ztpriceshistory = require('../models/mongodb/ztpriceshistory.js');

async function GetAllPricesHistory(req) {
  try {
    const IdPrice = parseInt(req.req.query?.IdPrice);

    let pricesHistory;
    if (!isNaN(IdPrice) && IdPrice >= 0) {
      // Get One
      pricesHistory = await ztpriceshistory.findOne({ ID: IdPrice }).lean();
    } else {
      // Get All
      pricesHistory = await ztpriceshistory.find().lean();
    }

    return pricesHistory;
  } catch (error) {
    console.error('Error GetAllPricesHistory:', error);
    return error;
  }
}
async function AddOnePricesHistory(req) {
  try {
    const newPrices = req.req.body.prices;
    const insertedRecords = await ztpriceshistory.insertMany(newPrices, { ordered: true });
    return JSON.parse(JSON.stringify(insertedRecords));
  } catch (error) {
    console.error('Error AddOnePricesHistory',error)
  }
}
// --------------- DELETE ---------------------
// inv-priceshistory-service.js
async function DeleteOnePricesHistory(req) {
  try {
    const rawId =
      req.data?.ID ??
      req.ID ??
      req.req?.body?.ID ??
      req.data?.id;

    const finalId = Number(rawId);
    if (!Number.isInteger(finalId)) {
      throw new Error(`El ID a eliminar es requerido y numérico. Valor leído: ${rawId}`);
    }

    const deleted = await ztpriceshistory.findOneAndDelete({ ID: finalId }).lean();
    if (!deleted) throw new Error(`No se encontró el registro con ID ${finalId}.`);

    return deleted; // devuelve el doc eliminado
  } catch (error) {
    throw new Error(`Error en DeleteOnePricesHistory: ${error.message}`);
  }
}


module.exports = { GetAllPricesHistory, AddOnePricesHistory, DeleteOnePricesHistory  };
