// src/config/mongo-conn.js
const mongoose = require('mongoose')
const cfg = require('./dotenvXConfig')

// (opcional) logs de queries
mongoose.set('debug', true)

;(async () => {
  try {
    const conn = await mongoose.connect(cfg.CONNECTION_STRING, {
      dbName: cfg.DATABASE,
      // Opcionales, ayudan con clusters Atlas
      serverSelectionTimeoutMS: 10000,
      // tls: true, // si tu cluster lo requiere
    })
    console.log('✅ Mongo conectado a:', conn.connection.name, '->', conn.connection.host)
  } catch (err) {
    console.error('❌ Error Mongo:', err.message)
  }

  mongoose.connection.on('error', (e) => console.error('Mongo error evt:', e))
  mongoose.connection.on('disconnected', () => console.warn('Mongo disconnected'))
})()
