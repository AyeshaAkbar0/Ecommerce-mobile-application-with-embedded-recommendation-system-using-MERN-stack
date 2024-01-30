const mongoose = require('mongoose');

const userSchema  =new mongoose.Schema({
   name:{
   type:String,
   //required:true
   },
   gender:{
    type:String,
   },
   birthday:{
    type:String
   },
   shippingAddress:{
    type:String,
   },
   email:{
    type:String,
   // required:true
},
passwordHash:{
    type:String,
    // required:true
    default:''
},
phone:{
    type:String,
    //required:true
},
isAdmin:{
    type:Boolean,
    default:false
},
street:{
    type:String,
    default:''
},
city:{
    type:String,
    default:''
},
zip:{
    type:String,
    default:''
},
appartment:{
    type:String,
    default:''
},
country:{
    type:String,
    default:''
},
verified:{
    type:Boolean,
    default:false,
   // required:true,
}
 })
userSchema.virtual('id').get(function(){
    return this._id.toHexString
})
userSchema.set('toJSON',{
    virtuals:true,
  })
exports.User = mongoose.model('User', userSchema);
//exports.userSchema = userSchema;