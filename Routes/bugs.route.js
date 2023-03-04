const express=require("express");

const bugsRouter=express.Router();
const {BugsModel}=require("../Model/Bugs.model")

bugsRouter.get("/",async(req,res)=>{
    console.log(req.body.userID)
    let ID=req.body.userID;
    try {
        const bugs = await BugsModel.find({userID:ID})
    res.send({data:bugs,msg:"Bugs Found..!Hurray"})
    } catch (error) {
        console.log(error)
        res.send({"msg":"Unable to fetch"})
    }
});

bugsRouter.post("/report",async(req,res)=>{
    console.log(req.body)
    let payload=req.body
    try {
        const New_bugs=new BugsModel(payload)
        await New_bugs.save()
        res.send({"msg" : "Bugs Reported successfully"})
    } catch (err) {
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
});

bugsRouter.patch("/update/:bugsID", async (req, res) => {
    const bugsID = req.params.bugsID
    const userID = req.body.userID;
    let payload=req.body
    const bug = await BugsModel.findOne({_id:bugsID})
    console.log(bug.userID,userID)
    if(userID !== bug.userID){
        res.send({"msg" : "Sorry, Not Authorised..!"})
    }
    else{
        await BugsModel.findByIdAndUpdate({_id : bugsID},payload)
        res.send({"msg" : " Bugs updated successfully"})
    }
})

bugsRouter.delete("/delete/:bugsID", async (req, res) => {
const bugsID = req.params.bugsID
const userID = req.body.userID
const bug = await BugsModel.findOne({_id:bugsID})
console.log(bug)
if(userID !== bug.userID){
    res.send({"msg" : "Sorry, Not Authorised..!"})
}
else{
    await BugsModel.findByIdAndDelete({_id : bugsID})
    res.send({"msg" : "Bugs deleted successfully"})
}
})

module.exports={bugsRouter}