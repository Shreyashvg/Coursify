const express=require("express")
const{userRouter}=require("./Routes/user")
const{courseRouter}=require("./Routes/course");
const{ adminRouter } = require("./Routes/admin");

const app=express();


app.use("api/v1/user",userRouter)
app.use("api/v1/course",courseRouter)
app.use("api/v1/admin",adminRouter)








app.listen(3000,()=>{
  console.log("server is running on port 3000")
})