/**
 *  I need to write the controller/ logic to register a user
 */

const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model") // this will help to store userObj in user collection.
 // defining a method signup which is available for whole project.
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")
 //        |--> signup help me to create / register a user. "exports" help using sign up in entire project.
exports.signup = async (req, res)=>{ // async so that I can use await.
    //logic to create user
    //1. Read the request body
    const request_body = req.body  // req.body will give me the request body in the form of js object.

    // 2. Insert the data in the users collection in MongoDB.
    const userObj = {
        name: request_body.name,
        userID: request_body.userID,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created = await user_model.create(userObj) // await - bcoz want to wait untill user not stored
        /**
         * return this user
         */
        // we don't want to show password even it is encrypted.
        const res_obj = {
            name : user_created.name,
            userID: user_created.userID,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt

        }
        res.status(201).send(res_obj) //response.status(201) jb kuchh create krte aur successfully create hota to 201 i.e. sttp return code return krta
    }catch(err){
        console.log("Error while registering the user",err);
        res.status(500).send({
            message: "Some error happened while registering the user"
        }) //  500 means internal server error.
        
    }
//TILL ABOVE WE HAVE CREATED model & controller. nOW, route IT WILL INTERCEPT THE REQUEST.
    // 3. Return the response back to the user
}

// For sign in:
exports.signin = async (req,res) => {
    //check if the userid is present.
    const user = await user_model.findOne({userID : req.body.userID}) // find out the user whose userID pass in the req.body

    if(user == null){
        return res.status(400).send({
            message: "Use ID passed is not a valid user ID"
        })
    }
    //password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password) //req.body.password - new value by user, user.password - value stored in db
    if(!isPasswordValid){
        return res.status(401).send({
            message: 'Wrong password passed'
        })
    }

    //using jwt we will create the access token with a given TTL(time to left) and return

    // const token = jwt.sign({id : user.userID}, "My xyz secret",{ // token kis basis pe hoga: userID + some secret code is inserted inside it. Importance of secret code, if a hacker make a software for cracking jwt made by name then, it is easy to fraud. so, it's important.
    const token = jwt.sign({id : user.userID}, secret.secret,{    
        
        // Here, my secret code is hard coded but it should not be hard coded, otherwise fraud is easy. so, we should centralize it.
        expiresIn : 120 //after 2 mins token expires.
    })

    res.status(200).send({
        name: user.name,
        userID: user.userID,
        email : user.email,
        userType: user.userType,
        accessToken: token
    })
}
// we have created controller now, define routes...