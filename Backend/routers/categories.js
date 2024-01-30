const express = require ('express');
const router = express.Router();
const {Category} = require('../models/category')
const {Product} = require('../models/product')
const axios = require('axios')



//Middleware
router.get('/',async (req,res)=>{
    let categorylist = await Category.find();
    if(categorylist){
      res.send(categorylist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})
router.get('/:id',async (req,res)=>{
    let categorylist = await Category.findById(req.params.id);
    if(categorylist){
      res.send(categorylist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})
router.put('/:id',async (req,res)=>{
    let categorylist = await Category.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            color:req.body.color,
            icon:req.body.icon
        }
        );
    if(categorylist){
      res.send(categorylist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})

router.post('/',async (req,res)=>{
    let categorylist = await Category(
        
          req.body
        
    );
    categorylist = await categorylist.save();
    if(categorylist){
      res.send(categorylist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})
// router.delete('/:id', (req,res)=>{
//     Category.findByIdAndDelete(req.params.id).then(category=>{
//         if(category)
//         {
//            return res.status(204).json({success:true, message:"Category deleted"}
//             )
//         }
//         else{
//             return res.status(101).send("Not deleted")
//         }
//     }).catch(err=>{
//      return res.status(400).json({
//         success:false,
//         message:"Not connected"
//      })
//     })
// })


// router.delete('/:id', async (req, res) => {
//     try {
//       const categoryId = req.params.id;
  
//       // Find the category to delete
//       const category = await Category.findById(categoryId);
  
//       if (!category) {
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }
    
//       // Delete all associated products (books) before deleting the category
//       await Product.deleteMany({ "category.id": categoryId });
//       console.log()
  
//       // Delete the category itself
//       await Category.findByIdAndDelete(categoryId);
  
//       return res.status(204).json({ success: true, message: "Category and associated books deleted" });
//     } catch (err) {
//       return res.status(500).json({ success: false, message: "Failed to delete category and associated books" });
//     }
//   });
  




// DELETE /api/v1/categories/:id
// router.delete('/:id', async (req, res) => {
//     try {
//       const categoryId = req.params.id;
  
//       // Find the category to delete
//       const category = await Category.findById(categoryId);
  
//       if (!category) {
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }
  
//       // Find all products with the given category and populate the category field to get the complete category object
//       const productsWithCategory = await Product.find({ category: categoryId }).populate('category');
  
//       // Extract the category IDs from the populated products
//       const categoryIdsToDelete = productsWithCategory.map(product => product.category._id);
  
//       // Delete all associated products (books) with the retrieved category IDs
//       await Product.deleteMany({ category: { $in: categoryIdsToDelete } });
  
//       // Delete the category itself
//       await Category.findByIdAndDelete(categoryId);
  
//       return res.status(204).json({ success: true, message: "Category and associated books deleted" });
//     } catch (err) {
//       return res.status(500).json({ success: false, message: "Failed to delete category and associated books" });
//     }
//   });
router.delete('/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      
  
      // Find the category to delete
      const category = await Category.findById(categoryId);
      console.log("Eshay",category.name)
  
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
  
      // Find all products with the given category and populate the category field to get the complete category object
      const productsWithCategory = await Product.find({ category: categoryId }).populate('category');
  
      // Extract the category IDs from the populated products
      const categoryIdsToDelete = productsWithCategory.map(product => product.category._id);
  
      // Delete all associated products (books) with the retrieved category IDs
      await Product.deleteMany({ category: { $in: categoryIdsToDelete } });
  
      // Delete the category itself
      await Category.findByIdAndDelete(categoryId);
      console.log('Gyesga')
      const Categoryname= category.name
       // After successfully deleting from the database, call the Flask API
      try {
        console.log("category.name",category.name)
        const flaskApiResponse = await axios.delete(`https://30a5-182-191-144-187.ngrok-free.app/delete_category/${Categoryname}`);
        if (flaskApiResponse.status === 200  ) {
            return res.status(204).json({ success: true, message: "Category and associated books deleted" });
        } else if (flaskApiResponse.status === 404) {
            return res.status(200).json({ success: true, message: "Category not found in Flask API (assumed deleted)" });}
        else {
            return res.status(500).json({ success: false, message: "Failed to delete category and associated books from Flask API" });
        }
    } catch (apiError) {
        return res.status(500).json({ success: false, message: "Failed to call Flask API for category deletion" });
    }

    } catch (err) {
      return res.status(500).json({ success: false, message: "Failed to delete category and associated books" });
    }
  });


module.exports=router;