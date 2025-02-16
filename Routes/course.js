const {Router}=require("express")
const courseRouter=Router()
const{courseModel}=require("../db")
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
  courseRouter
}