
const mongoose=require("mongoose");

const bugsSchema=mongoose.Schema({
    critical : Number,
    medium : Number,
    major : Number,
    low : Number,
    userID : String,
})

const BugsModel=mongoose.model("bugs",bugsSchema);

module.exports={BugsModel}