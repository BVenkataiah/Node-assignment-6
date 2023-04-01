const mongoose = require('mongoose');

//  Your code goes here
const modelSchema = new mongoose.Schema({
    // Your code goes here
    
    name : String,
    weight : Number

})

const marioModel = mongoose.model('Model', modelSchema);


module.exports = marioModel;