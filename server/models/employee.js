let mongoose = require("mongoose");

//create a model class
let employeeModel = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    age: Number
},
{
    collection: "employees"
});

module.exports = mongoose.model('Employee', employeeModel);