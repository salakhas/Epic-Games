const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connect = require("./configs/db")
const helpCRUD = require("./controllers/help.controller")
const { MongoClient, ObjectID } = require("mongodb");
var cors = require('cors');
const BodyParser = require("body-parser");
const client = new MongoClient(process.env["ATLAS_URI"]);
app.use(cors())

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/help", helpCRUD)


var collection;
app.get("/search", async (request, response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${request.query.query}`,
                        "path": "subject",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

app.listen(3000, async()=>{
    try {
        await connect();
        console.log("Listening on port 3000")
        collection = client.db("web14").collection("subject");
    } catch (error) {
     console.log(error.message)   
    }
    
})