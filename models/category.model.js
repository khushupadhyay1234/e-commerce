/** category me following things hone chahiye
 * name, description
 */
const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique : true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps : true, versionKey: false}) // timestamp will give createdAt and modifiedAt. Mongoose bydefault always add --v. so, to remove it

module.exports = mongoose.model("Category", categorySchema) //for msking it for whole.    glti se "export" ke kaaran 1 ghnata barbad.