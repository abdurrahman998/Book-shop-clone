import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  profile:{
     type : String,
    default : "",
  }
});

userSchema.pre("save", async function(next){
  if(!this.isModified("password"))  return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model("User", userSchema);
export default User;
