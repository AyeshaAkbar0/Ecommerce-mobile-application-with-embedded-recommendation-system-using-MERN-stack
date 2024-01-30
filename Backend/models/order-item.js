const mongoose = require('mongoose');

const orderItemSchema  =new mongoose.Schema(
   {
    quantity:{
        type:Number,
    //{Comp} // required:true
    default:1
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
}}
);
exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);



