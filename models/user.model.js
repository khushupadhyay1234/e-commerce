//user correction
const mongoose = require("mongoose");

/** want to track user
 * name
 * userID
 * password
 * email
 * usertYPE
 */
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"] //2 VALUE OF USER IS POSSIBLE  EITHER HE IS ADMIN OR CUSTOMER. OTHER TYPE IS NOT ALLOWED.
    }
    //Now we want to add timestamp also
},{timestamps: true, versionKey: false}) //since, mongoose add version automatically

/** Now, want to convert this file as models, so export. */
module.exports = mongoose.model("user", userSchema) //this will create a collection of "users" (even it is singular)


