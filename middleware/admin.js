
const jwt =require("jsonwebtoken")
const{JWT_ADMIN_SECRECT}=require("../config")
function adminMiddleware(req,res,next){
  const token=req.headers.token
  const decodedpayload=jwt.verify(token,JWT_ADMIN_SECRECT)

  if(decodedpayload){
    req.adminId=decodedpayload.id
    next()
  }else{
    res.status(403).json({
      message:"You are not signed in"
    })
  }

}

module.exports={
  adminMiddleware
}


