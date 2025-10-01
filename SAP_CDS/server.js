// server.js
const express = require('express');
const cds = require('@sap/cds');
const cors = require('cors');

// 1) Variables de entorno y conexión a Mongo ANTES de cds.server
require('@dotenvx/dotenvx').config();
require('./src/config/connectToMongoDB'); // <-- ruta al archivo que hace mongoose.connect(...)

module.exports = async (o = {}) => {
  try {
    const app = express();
    app.use(express.json({ limit: '500kb' }));
    app.use(cors());

    // si vas a usar rutas personalizadas, añádelas aquí:
    // app.use('/api', require('./src/api/rest'));

    // expón el express app a CDS
    o.app = app;

    // arranca CDS usando tu app de Express
    const srv = await cds.server(o);

    return srv;
  } catch (error) {
    console.error('Error starting server', error);
    process.exit(1);
  }
};
