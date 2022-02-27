const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://Epic_Teams:Epic_123@cluster0.ocyih.mongodb.net/Epic_Games?retryWrites=true&w=majority")
    // return mongoose.connect("mongodb://localhost:27017/epicRegister")

}

module.exports = connect;