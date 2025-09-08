import * as mongoose from 'mongoose';

/**
 * NOTA 6.1
 * Esquema ProdServ para productos/servicios en MongoDB usando Mongoose.
 * Cada campo está diseñado para cubrir necesidades específicas de negocio y trazabilidad.
 */

const prodservSchema = new mongoose.Schema({
    // Clave primaria única para el producto/servicio.s
    IdProdServPK: { type: Number, required: true }, // Permite búsquedas rápidas y evita duplicados.

    // Claves alternativas para integración con otros sistemas o referencias externas.
    IdProdServOK: { type: String }, // Clave operativa.
    IdProdServBK: { type: String }, // Clave de negocio.

    //-- Claves de marca para asociar el producto/servicio con una marca específica.
    IdProdServMaOK: { type: String }, // Clave operativa de marca.
    IdProdServMaBK: { type: String }, // Clave de negocio de marca.

    //-- Descripción textual del producto/servicio.
    DesProdServ: { type: String }, // Permite mostrar información legible al usuario.

    // Claves para la unidad de medida del producto/servicio.
    IdMedidaOK: { type: String }, // Clave operativa de medida.
    IdMedidaBK: { type: String }, // Clave de negocio de medida.

    // Historial de estatus del producto/servicio.
    cat_prod_serv_estatus: [
        {
            IdTipoGenEstatusOk: { type: String }, // Tipo de estatus (ej. activo, inactivo).
            IdGenEstatusOk: { type: String }, // Clave específica del estatus.
            TipoEstatus: { type: String }, // Descripción del tipo de estatus.
            Actual: { type: String }, // Indica si es el estatus actual.
            Observacion: { type: String }, // Comentarios o notas sobre el estatus.
            detail_row: { // Trazabilidad de quién y cuándo se registró el estatus.
                FechaReg: { type: Date, default: Date.now }, // Fecha de registro.
                UsuarioReg: { type: String } // Usuario que registró el estatus.
            },
            _id: false, // Evita que Mongoose genere un _id para cada subdocumento de estatus.
        },
    ],

    // Archivos asociados al producto/servicio (imágenes, documentos, etc.).
    cat_prod_serv_archivos: [
        {
            DesArchivo: { type: String }, // Descripción del archivo.
            RutaArchivo: { type: String }, // Ruta o URL del archivo.

            // Información sobre el tipo de archivo.
            IdTipoGenArchivoOK: { type: String }, // Clave operativa del tipo de archivo.
            IdGenArchivoOK: { type: String }, // Clave específica del archivo.
            TipoArchivo: { type: String }, // Descripción del tipo de archivo.

            // Información sobre la sección a la que pertenece el archivo.
            IdTipoGenSeccionOK: { type: String }, // Clave operativa de la sección.
            IdGenSeccionOK: { type: String }, // Clave específica de la sección.
            TipoSeccion: { type: String }, // Descripción de la sección.

            // Orden y relevancia del archivo.
            Secuencia: { type: Number }, // Permite ordenar los archivos.
            Principal: { type: String }, // Indica si el archivo es el principal.

            // Trazabilidad y control de cambios del archivo.
            detail_row: {
                FechaReg: { type: Date, default: Date.now }, // Fecha de registro.
                UsuarioReg: { type: String }, // Usuario que registró el archivo.
                FechaUltMod: { type: Date, default: Date.now }, // Fecha de última modificación.
                UsuarioMod: { type: String }, // Usuario que modificó el archivo.
                Activo: { type: String, default: 'S' }, // Indica si el archivo está activo.
                Borrado: { type: String, default: 'N' }, // Indica si el archivo está borrado lógicamente.
                _id: false, // Evita generación de _id en el subdocumento de trazabilidad.
            },
            _id: false, // Evita generación de _id en el subdocumento de archivo.
        },
    ],

    // Trazabilidad y control de cambios del producto/servicio.
    detail_row: {
        FechaReg: { type: Date, default: Date.now }, // Fecha de registro del producto/servicio.
        UsuarioReg: { type: String }, // Usuario que registró el producto/servicio.
        FechaUltMod: { type: Date, default: Date.now }, // Fecha de última modificación.
        UsuarioMod: { type: String }, // Usuario que modificó el producto/servicio.
        Activo: { type: String, default: 'S' }, // Indica si el producto/servicio está activo.
        Borrado: { type: String, default: 'N' } // Indica si el producto/servicio está borrado lógicamente.
    }
});

//Commerce

export default mongoose.model( 
  'cat_prod_serv', 
  prodservSchema, 
  'cat_prod_serv' 
);