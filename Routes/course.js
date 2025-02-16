
const {Router}=require("express")
const { courseRouter } = require("./user")

const userRouter=Router()

courseRouter.post("/purchase",(req,res)=>{
    res.json({
      message:"endpoint for signup"
    })
  
  })
  
courseRouter.get("/preview",(req,res)=>{
    res.json({
      message:"endpoint for signup"
    })
  })


module.exports={
  userRouter
}