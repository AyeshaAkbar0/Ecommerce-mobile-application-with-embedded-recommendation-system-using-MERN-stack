const { isValidObjectId } = require("mongoose");
const {User}= require('../models/user')
const ResetToken= require('../models/Resettoken')
const { sendError } = require("../utils/helper");
const { isResetTokenValid } = require('../middleware/user');


exports.isResetTokenValid= async (req, res,next) => {

    const {token,id}=req.query;
    if(!token ||!id) return sendError(res,"Invalid req")
    if(!isValidObjectId(id)){
        return sendError(res,"Invalid user")
 }
 const user=await User.findById(id)
 if(!user) return sendError(res,"user not found")

 const resettoken=await ResetToken.findOne({owner:user._id})
 if(!resettoken) return sendError(res,"Reset token not found ")

 const isValid=await resettoken.compareToken(token)
 if(!isValid) return sendError(res,"Reset token not valid ")
 req.user=user;
 next()

}
