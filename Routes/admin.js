const {Router}=require("express")
const adminRouter=Router()
const{adminModel,courseModel}=require("../db")
const{z}=require("zod")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt =require("jsonwebtoken")
const{JWT_ADMIN_SECRECT}=require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup",async (req,res)=>{
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
    await adminModel.create({
      email,
      password:hashedPassword,
      firstName,
      lastName
    })
    res.json({
      message:"Admin signedup successfully"
    })
    }catch(e){
      res.status(500).json({
        error: "An internal server error occurred"
      });
  }
  
})
  
adminRouter.post("/signin",async (req,res)=>{
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
    const admin =await adminModel.findOne({
      email
    })
    if(!admin){
      res.status(403).json({
        message:"Admin does not exist"
      })
      return
    }
     const passwordMatch= await bcrypt.compare(password,admin.password)//comparing i/p pass with hashedpasss
     if(passwordMatch){
      const token=jwt.sign({id:admin._id.toString() },JWT_ADMIN_SECRECT)
      res.json({
        token:token,
        message:"Admin logged in successfully"
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
  
adminRouter.post("/course",adminMiddleware,async(req,res)=>{
  const adminId= req.adminId
  const {title,description,imageUrl,price}=req.body

  const course =await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId:adminId
  })
  res.json({
    message:"Course created",
    courseId:course._id
  })
  
})

adminRouter.put("/course",adminMiddleware,async(req,res)=>{
  const adminId= req.adminId
  const {title,description,imageUrl,price,courseId}=req.body

  const course =await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
  },{
    title,
    description,
    imageUrl,
    price
  })
  res.json({
    message:"Course updated",
    courseId:course._id
  })
  
 
  
})

adminRouter.get("/course/bulk",adminMiddleware,async (req,res)=>{
  const adminId= req.adminId

  const courses =await courseModel.find({
    creatorId:adminId
  })
  res.json({
    courses
  })
  
  
})

module.exports={
  adminRouter
}
