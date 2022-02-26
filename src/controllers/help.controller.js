const express = require('express');
const { body, validationResult } = require('express-validator');

const Help = require('../models/help.model');

const router = express.Router();


router.post('',

    body("id").isNumeric().withMessage("Id is not a number").bail().custom(async value => {
        const help = await Help.findOne({id: value});
          if (user) {
            throw new Error("ID already exists");
          }
          return true;
      }),
    body("subject").isString().notEmpty(),
   //here authenticate/authorise will be added
    async (req,res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newErrors;
            newErrors = errors.array().map(err =>{
                return {key: err.param, message: err.msg};
            });
          return res.status(400).json({ errors: newErrors });
        }



    const help = await Help.create(req.body);
    console.log(help)

   
    return res.send(help);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


router.get('',async (req,res) => {
    try{
        
        const helps = await Help.find().lean().exec();

        
      /*  let newArray = helps.map(el => el.subject.split(' '));
        let indexes = [];
        for(let i=0; i<newArray.length; i++){
            for(let j=0; j<newArray[i].length; j++){
                if(newArray[i][j] === query){
                    indexes.push(i)
                }
            }
        }
        console.log('indexes:', indexes)
        let finalArray=[];
        for(let k=0 ; k<indexes.length; k++){
            for(let l=0; l<helps.length; l++){
                if(indexes[k] === l){
                    finalArray.push(helps[l])
                }
            }
        }
        console.log(finalArray)*/
        return res.send(helps);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

router.patch('/:id',async (req,res) => {
    try {
        const help = await Help.findByIdAndUpdate(req.params.id,
            req.body,
            {
                new:true,
            }
            )
            .lean().exec();
            return res.status(201).send(help);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const help = await Help.findByIdAndDelete(req.params.id);
        
        return res.status(201).send(help);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})



module.exports = router;