const {Router}=require("express") 
const userRouter=Router()

userRouter.post("/signup",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})
  
userRouter.post("/signin",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})
  
userRouter.get("/purchases",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})

module.exports={
  userRouter
}
