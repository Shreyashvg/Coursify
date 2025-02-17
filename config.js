//to avoid circulare dependencies between routes and middleware
//you could either repeat variable in two places but its bad practice thats why we are creating this file
const JWT_USER_SECRECT="userloveme"
const JWT_ADMIN_SECRECT="adminloveme"


module.exports={
  JWT_ADMIN_SECRECT,
  JWT_USER_SECRECT
}