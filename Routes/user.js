const {Router}=require("express") 
const userRouter=Router()
const{userModel, purchaseModel,courseModel}=require("../db")
const{z}=require("zod")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt =require("jsonwebtoken")
const{JWT_USER_SECRECT}=require("../config");
const { userMiddleware } = require("../middleware/user");


userRouter.post("/signup",async (req,res)=>{
  const requiredBody=z.object({
    email:z.string().min(5).max(50).email(),
    password:z.string().min(5).max(20).refine((password) => /[A-Z]/.test(password), {
      message: "Required atleast one uppercase character",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Required atleast one lowercase character",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Required atleast one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Required atleast one special character",
    }),
    firstName:z.string().min(5).max(20),
    lastName:z.string().min(5).max(20)
  }).strict()//input validations

  const parsedDataWithSucess=requiredBody.safeParse(req.body)

  if(!parsedDataWithSucess.success){
    res.status(400).json({
      message:"Incorrect format",
      error:parsedDataWithSucess.error
    })
    return
  }

  const{email,password,firstName,lastName}=req.body

  try{
    const hashedPassword=await bcrypt.hash(password, saltRounds)//password hashing
    await userModel.create({
      email,
      password:hashedPassword,
      firstName,
      lastName
    })
    res.json({
      message:"User signedup successfully"
    })
    }catch(e){
      res.status(500).json({
        error: "An internal server error occurred"
      });
  }
})
  
userRouter.post("/signin",async (req,res)=>{
  const requiredBody=z.object({
    email:z.string().min(5).max(50).email(),
    password:z.string().min(5).max(20).refine((password) => /[A-Z]/.test(password), {
      message: "Required atleast one uppercase character",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Required atleast one lowercase character",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Required atleast one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Required atleast one special character",
    })
  }).strict()
  const parsedDataWithSucess=requiredBody.safeParse(req.body)

  if(!parsedDataWithSucess.success){
    res.status(400).json({
      message:"Incorrect format",
      error:parsedDataWithSucess.error
    })
    return
  }

  const{email,password}=req.body
  try{
    const user =await userModel.findOne({
      email
    })
    if(!user){
      res.status(403).json({
        message:"user does not exist"
      })
      return
    }
     const passwordMatch=await bcrypt.compare(password,user.password)//comparing i/p pass with hashedpasss
     if(passwordMatch){
      const token=jwt.sign({id:user._id.toString() },JWT_USER_SECRECT)
      res.json({
        token:token,
        message:"User logged in successfully"
      })
    }else{
      res.status(403).json({
        message:"Incorrect password"
      })
    }
  }catch(e){
    res.status(500).json({
      error: "An internal server error occurred"
    })
  }
 
})
  
userRouter.get("/purchases",userMiddleware,async (req,res)=>{
  const userId=req.userId
  const purchases=await purchaseModel.find({
    userId
  })

  const courseData=await courseModel.find({
    _id:{$in:purchases.map(x=>x.courseId)}
  })


  res.json({
    purchases,
    courseData
  })
})

module.exports={
  userRouter
}
