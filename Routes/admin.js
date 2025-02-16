const {Router}=require("express")
const adminRouter=Router()

adminRouter.post("/signup",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})
  
adminRouter.post("/signin",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})
  
adminRouter.get("/course",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})

adminRouter.put("/course",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})

adminRouter.get("/course/bulk",(req,res)=>{
  res.json({
    message:"endpoint for signup"
  })
  
})

module.exports={
  adminRouter
}
