const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/mario", (req, res)=>{
    res.json({
        data: marioModel
    })
});
app.get("/mario/:id", (req,res)=>{
    const index = marioModel.findOne(element => element.id == req.params.id);
    if(index >= 0){
        const Model = marioModel[index];
        res.json({
            Model
        })
    }
    else{
        res.status(400).json({
            status: "Failed",
            message: "Model record not found"
        })
    }
   
});
let count = 0;
app.post('/mario', function(req,res){
    count++;
    const new_id = count;
    const {name="",weight=""} = req.body;
    if(name != "" && weight != "" ){
        const newModel = {
            id: new_id,
            name: name,
            weight: weight
        };
        marioModel.create(newModel);
        res.status(200).json({
            newModel
        })
    }
    else{
        res.status(400).json({
            message: "bad request"
        })
    }
    
});

app.patch("/mario/:id", (req,res)=>{
    const index = marioModel.updateOne(element => element.id == req.params.id);
    if(index >= 0){
        marioModel[index] = req.body;
        res.json({
            message: "Record updated successfully!"
        })
    }
    else{
        res.status(400).json({
            status: "Failed",
            message: "Record not updated"
        })
    }
});

app.delete('/mario/:id', function(req, res){
    let targetIndex=marioModel.deleteOne(e=> e.id==req.params.id)
    if(targetIndex){
        marioModel.splice(targetIndex,1)
        res.json("Sucessfully deleted")
    }else{
        res.status(404).json("Delete Failed !! Invalid id")
    }
})
    




module.exports = app;