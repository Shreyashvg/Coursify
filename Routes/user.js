const {Router}=require("express") 
const courseRouter=Router()

courseRouter.post("user/signup",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})
  
courseRouter.post("user/signin",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})
  
courseRouter.get("user/purchases",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})

module.exports={
  courseRouter
}
