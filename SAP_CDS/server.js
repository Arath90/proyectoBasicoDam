const express = require('express');
const cds = require('@sap/cds');
const cors = require('cors')
const router = express.Router();

module.exports = async (o) => {
    let app = express();
    app.express = express;
   try{
app.use(express.json({limit:'500kb'}));
    app.use(cors());
    app.use('/api', router);
    app.get('/', (req, res) => {
        res.end(SAP CDS está en ejecución...${req.url});
    });
     o.app = app;
   }catch(err){
    console.error("Error starting server:", err);
    process.exit(1);
   }

o.app.httpServer = await cds.server(o);

};
return o.app.httpServer;