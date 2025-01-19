const category_model = require("../models/category.model");

/**
 * controller for creating the category
 * 
 * post localhost:8888/ecomm/api/v1/categories
 * {
 *  "name" : "household",
 *  "description": This will haveall the household items}
 */
exports.createNewCategory = async(req,res)=>{

    //read the req body
    //create the category object
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    try{
        //insertr into mongodb
        const category = await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("Error while creating the category",err)
        return res.status(500).send({
            message: "Error while creating the category"
        })
        
    }

    //retrun the response of the created category
}