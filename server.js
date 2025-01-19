/**
 * This will the starting file of the project.
 * jb yeh file start hoga tb project start hoga.
 * project start ke liye server needed
 */
const express = require("express"); //type of express is function
const mongoose = require("mongoose");
const app = express();

// importing server config
const server_config = require("./configs/server.config")

// importing db config
const db_config = require("./configs/db.config")
/**
 * create an admin user at the starting of the application.
 * if not already present
 */

const user_model = require("./models/user.model")

/** importing for encrypt password */
const bcrypt = require("bcryptjs")

app.use(express.json()) // Middle ware, used to convert json file of postman into js object.
// connection with mongodb
mongoose.connect(db_config.DB_URL)


const db = mongoose.connection
db.on("error",()=>{
    console.log('Error while connecting to the mongoDB')
})
db.once("open",()=>{
    console.log("connected to mongoDB")
    init()  //which initialize by data.
})
async function init(){
    //creating user
    try{
    let user = await user_model.findOne({userID : "admin"})

    if(user){
        console.log("Admin is already present")
        return
    }
  }catch(err){
    console.log("Error while reading the data", err);
    
   }
    // if user not present create....
    try{
        user = await user_model.create({
            name: "Aditya",
            userID : "admin",
            email : "aditya@GMAIL.COM",
            userType : "ADMIN",
            // password : "qwer123" //actual string insteadof encrypted. so, import bcrypt.

            password : bcrypt.hashSync("qwert123",8) // will create hash of this string
            //here, 8 is working like a salt which is enhancing the protection.
        })
        console,log("Admin created", user)
    }
    catch(err){
        console.log("Error while creating admin", err)
    }
}

/**
 * Stitch the route to the server.
 */
require("./routes/auth.routes")(app) //calling routes and passing app object.
/** Now, all model, controller and routes are connected to each other. */

require("./routes/category.routes")(app)
/**
 * Start the server
 */
app.listen(server_config.PORT, ()=>{// 8080 is a port no. it is customizable and good practice is never hard code customizable thing. We should centralize this, in order to centralize here, i creae a folder "config" and store all configuration
    console.log("server started AT PORT NUM: ",  server_config.PORT)
})