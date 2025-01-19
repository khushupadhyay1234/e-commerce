const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")
/**
 * create a mw that will check if the request body is proper and correct
 */

const verifySignupBody = async (req, res, next)=>{

    try{
        //check for name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed! Name was not provided in request body"
            })
        }
        //check for email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed! email was not provided in request body"
            })
        }
        //check for userID
        if (!req.body.userID) {
            return res.status(400).send({
                message: "Failed! userID was not provided in request body"
            })
        }
        //check if the user with same userid is already present 
        const user = await user_model.findOne({userID : req.body.userID})
        if(user){
            return res.status(400).send({
                message: "Failed ! user  with same id is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object",err); 
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
} 

const verifySignInBody = async (req, res, next)=>{
    if(!req.body.userID){  // if user id not provided
        return res.status(400).send({
            message: "userID is not provided"
        })
    }
    if(!req.body.password){  // if password not provided
        return res.status(400).send({
            message: "password is not provided"
        })
    }
    next() // if both fine, call next func.
}

//verifying token for categories, etc functions.
const verifyToken = (req, res, next)=> {
    //check if token present in the header
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message: "No token found: UnAuthorized"
        })
    }

    //if it's the valid token
    jwt.verify(token, auth_config.secret, async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message: "UnAuthorized !"
            })
        }
        const user = await user_model.findOne({userID : decoded.id}) // encrypted id ko decrypt kr ke userid ta krke user ko
        if(!user){
            return res.status(400).send({
                message: "UnAuthorized, this user for this token doesn.t exist"
            })
        }
        //set the user info in request body
        req.user = user
        next()
    })
    

    //Then move to the next step
}

/** i want that among users only admin is allowed */
const isAdmin = (req, res, next) => {
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message: "Only ADMIN USERS are allowed to access this endpoint."
        })
    }
}
module.exports = { // iske andar jitna term, routes me utne terms bracket me
    verifySignUpBody: verifySignupBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin : isAdmin
}