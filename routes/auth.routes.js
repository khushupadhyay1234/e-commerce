/**
 * I have to create this POST call: localhost:8888/ecomm/api/v1/auth/signup
 * I need to intercept this
 */

//bringing controller for below:
const authController = require("../controllers/auth.contoller")

const authMV = require("../middlewares/auth_mw")
module.exports = (app)=>{
    // app.post("/ecomm/api/v1/auth/signup", handover to the right controller)
    app.post("/ecomm/api/v1/auth/signup",[authMV.verifySignUpBody], authController.signup) //if postcall comes for following "uri" then call authController

    /**
 * route for POST Call: localhost:8888/ecomm/api/v1/auth/signin
 */
    app.post("/ecomm/api/v1/auth/signin",[authMV.verifySignInBody],authController.signin)

// now, ready for login, to check this, enter same username and password as you have written in server.js.....this sign in part from 2nd video
}
//now route created, I had made model, connected these to controller and route. Now, I have to connect route to app server. .........from 1st video

/** Auth feature completed... */

