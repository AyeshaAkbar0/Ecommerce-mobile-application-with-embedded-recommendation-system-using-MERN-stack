// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   // Define your schema fields here
//   //isbn:{
//    // types:Number,
//   //},
//   book_Title:{
//     type:String,
//    // required:true,
//    }
//    ,
//     Book_Author:{
//     type:String,
//     default:'',
//    },
//    year_of_Publication:
//    {
//     type:Number,
//     default:''
//    },
//    /*publisher:
//    {
//     type:String,
//     default:''
//    },*/
//    image:
//    {
//     type:String,
//     default:''
//    },
//    /*images:
//    [{
//     type:String
//    }],*/
//    price:{
//     type:Number,
//     default:0
//    },
//    categoryname:
//    {
//     type:String
//    },
//    category:
//    {
//    type:mongoose.Schema.Types.ObjectId,
//    ref :'Category'
//    },
//    /*rating:{
//    type:Number
//    },*/
   
//    inStock:
//    {
//     type:Number,
//     default:true
//    },
//   /* isFeatured:
//    {
//     type:Boolean,
//     default:false
//    },*/
//    description:{
//     type:String,
//     default:""
//    },
//    /*countInStock:{
//     type:Number
//    }*/


// });

// //const Product = mongoose.model('products', productSchema);
// productSchema.virtual('id').get(function(){
//   return this._id.toHexString();

// })
// productSchema.set('toJSON',{
//   virtuals:true,
// })

// // module.exports = Product;

// exports.Product = mongoose.model('Product', productSchema);



//mine
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Define your schema fields here
  //isbn:{
   // types:Number,
  //},
  book_Title:{
    type:String,
   // required:true,
   }
   ,
    Book_Author:{
    type:String,
    default:'',
   },
   year_of_Publication:
   {
    type:Number,
    default:''
   },
   publisher:
   {
    type:String,
    default:''
   },
   image:
   {
    type:String,
    default:''
   },
   /*images:
   [{
    type:String
   }],*/
   price:{
    type:Number,
    default:0
   },
   categoryname:
   {
    type:String
   },
   category:
   {
   type:mongoose.Schema.Types.ObjectId,
   ref :'Category'
   },
   /*rating:{
   type:Number
   },*/
   
   inStock:
   {
    type:Number,
    default:true
   },
  /* isFeatured:
   {
    type:Boolean,
    default:false
   },*/
   description:{
    type:String,
    default:""
   },
   /*countInStock:{
    type:Number
   }*/
   num_pages:{
    type:Number
   }



});

// const Product = mongoose.model('products', productSchema);
productSchema.virtual('id').get(function(){
  return this._id.toHexString();

})
productSchema.set('toJSON',{
  virtuals:true,
})

// module.exports = Product;

exports.Product = mongoose.model('Product', productSchema);

