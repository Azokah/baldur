// Instancia de mongoose y mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Crea un modelo mongoose y lo envia usando module.exports
module.exports = mongoose.model('Messages', new Schema({ 
    name_from: String, 
    name_to: String, 
    message: String,
    date: Date
}));