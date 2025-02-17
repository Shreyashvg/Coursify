const jwt =require("jsonwebtoken")
const{JWT_USER_SECRECT}=require("../config")

function userMiddleware (req,res,next){
  const token=req.headers.token
  const decodedpayload=jwt.verify(token,JWT_USER_SECRECT)

  if(decodedpayload){
    req.userId=decodedpayload.id
    next()
  }else{
    res.status(403).json({
      message:"You are not signed in"
    })
  }

}

module.exports={
  userMiddleware
}