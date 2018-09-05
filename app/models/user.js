// Instancia de mongoose y mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Crea un modelo mongoose y lo envia usando module.exports
module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean,
    activeToken: String
}));