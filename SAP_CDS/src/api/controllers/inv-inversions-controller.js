
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
