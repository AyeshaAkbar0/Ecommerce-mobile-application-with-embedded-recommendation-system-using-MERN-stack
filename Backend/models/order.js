const mongoose = require('mongoose');
require('../models/user')

const orderSchema  =new mongoose.Schema(
   {
    orderItems:
   [{
   type:mongoose.Schema.Types.ObjectId,
   ref :'OrderItem',
      required:true
   }],
   shippingAddress1:{
    type:String,
    //   {Comp} //  required:true
   },
   shippingAddress2:{
    type:String
   },
   city:
   {
    type:String,
   //   {Comp} //   required:true
   },
   zip:
   {
    type:String,
   //   {Comp} //   required:true
   },
   country:
    {
     type:String,
    //   {Comp} //   required:true
    },
    phone:{
        type:String,
        //   {Comp} //  required:true
    },
    status:{
type:String,
//   {Comp} //  required:true,
default:"Pending"
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dateOrdered:
    {
        type:Date,
        default:Date.now,
    },
//////////////SOMETHING NEW //////////////////
orderedProducts: [
    {
      productSnapshot: {
        // Store the details of the product here
        image:
        {
         type:String,
         default:''
        },
        book_Title: String,
        price:{
            type:Number,
           // default:0
           },
        // ... (other relevant fields)
      },
      quantity: Number,
    },
  ],
  orderedUser: {
    userSnapshot: {
      // Store the details of the user here
      name: String,
      // ... (other relevant fields)
    },
  },









}
);
orderSchema.virtual('id').get(function(){
    return this._id.toHexString
})
orderSchema.set('toJSON',{
    virtuals:true,
  })
exports.Order = mongoose.model('Order', orderSchema);




