
const cds = require('@sap/cds');
const express = require('express');
const cors = require('cors');

// Agrega middlewares y rutas personalizadas al servidor de CAP
cds.on('bootstrap', (app) => {
  app.use(express.json({ limit: '500kb' }));
  app.use(cors());

  app.get('/', (req, res) => {
    res.end(`SAP CDS está en ejecución... ${req.url}`);
  });

  // Ejemplo: endpoint de salud
  app.get('/api/health', (req, res) => {
    res.json({ ok: true, at: new Date().toISOString() });
  });
});

// Delega el arranque al servidor por defecto de CAP
module.exports = cds.server;