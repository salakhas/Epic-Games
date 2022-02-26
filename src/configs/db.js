const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://salakha:salakha_16@cluster0.9ly28.mongodb.net/demo?retryWrites=true&w=majority")
}

module.exports = connect;