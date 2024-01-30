const express = require ('express');
const router = express.Router();
const {Order} = require('../models/order')
const {OrderItem}= require('../models/order-item')
const mongoose= require('mongoose');
const {User} =require ('./users')
//Middleware

router.get('/',async (req,res)=>{
    const orderlist = await Order.find().populate('user','name').populate({
        path:'orderItems', populate:{
        path:'product', populate:'category'}})
    // ({path:'orderItems',populate:{path:'product',populate:'category'}}).sort
    // ('dateOrdered').lean();
    if(orderlist){
        res.send(orderlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})


router.get('/:id', async (req, res) => {
  const orderlist = await Order.findById(req.params.id);
  if (orderlist) {
    res.send(orderlist);
  } else {
    res.status(500).json({
      success: false,
    });
  }
});











// router.get('/:id',async (req,res)=>{
//     const orderlist = await Order.findById(req.params.id)
//     .populate('user', 'name')
//     // .populate({path:'orderItems', populate:'product'});
//     if(orderlist){
//         res.send(orderlist);
//     }
//     else{
//         res.status(500).json({
//             success:false
//         })
//     }
// })

//PERFECTLY WORKING
// router.post('/', async (req,res)=>{
//     const orderItemsIds= Promise.all( req.body.orderItems.map(
//         async(orderitem)=>{
//             let neworderitem= new OrderItem({
//                 quantity:orderitem.quantity,
//                 product:orderitem.product
//             })
//             neworderitem = await neworderitem.save();
//             return neworderitem._id;
//         }
//     ))
//     const orderItemsIdsResolved = await orderItemsIds;
//     const totalPrices= await Promise.all(orderItemsIdsResolved.map(async(orderItemId)=>{
//         const orderItem= await OrderItem.findById(orderItemId).populate('product',
//          'price')
//          const totalPrice= orderItem.product.price
//           * orderItem.quantity;
//          return totalPrice
//     }))
//     const totalPrice= totalPrices.reduce((a,b)=>a+b,0)



//         let orderlist = await Order({
//             orderItems :orderItemsIdsResolved,
//             shippingAddress1:req.body.shippingAddress1,
//             shippingAddress2:req.bodyshippingAddress2,
//             city:req.body.city,
//             zip:req.body.zip,
//             country:req.body.country,
//             phone:req.body.phone,
//             status:req.body.status,
//             totalPrice:totalPrice,
//             dateOrdered:req.body.dateOrdered,
//             user:req.body.user

//          } );
//     orderlist = await orderlist.save();
//     if(orderlist){
//         await orderlist.populate('user', 'name');
//       res.send(orderlist);
//     }
//     else{
//         res.status(500).json({
//             success:false
//         })
//     }
// })




router.post('/', async (req, res) => {
  const orderItemsIds = await Promise.all(
    req.body.orderItems.map(async (orderitem) => {
      let neworderitem = new OrderItem({
        quantity: orderitem.quantity,
        product: orderitem.product,
      });
      neworderitem = await neworderitem.save();
      return neworderitem._id;
    })
  );

  const totalPrices = await Promise.all(
    orderItemsIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  // Create an array to store ordered product snapshots
  const orderedProducts = [];
  for (const orderItemId of orderItemsIds) {
    const orderItem = await OrderItem.findById(orderItemId).populate('product', 'book_Title price image');
    orderedProducts.push({
      productSnapshot: {
        book_Title: orderItem.product.book_Title,
        price: orderItem.product.price,
        image: orderItem.product.image,
      },
      quantity: orderItem.quantity,
    });
  }

  // Create a snapshot of the user details
  const orderedUser = {
    userSnapshot: {
      name: req.body.user.name,
      // ... (other relevant fields)
    },
  };

  let orderlist = await Order({
    orderItems: orderItemsIds,
    orderedProducts,
    orderedUser,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice, // Add totalPrice field
    dateOrdered: req.body.dateOrdered,
    user: req.body.user,
  });

  orderlist = await orderlist.save();

  if (orderlist) {
    await orderlist.populate('user', 'name');
    res.send(orderlist);
  } else {
    res.status(500).json({
      success: false,
    });
  }
});




















// router.post('/', async (req, res) => {
//   const orderItemsIds = await Promise.all(
//     req.body.orderItems.map(async (orderitem) => {
//       let neworderitem = new OrderItem({
//         quantity: orderitem.quantity,
//         product: orderitem.product,
//       });
//       neworderitem = await neworderitem.save();
//       return neworderitem._id;
//     })
//   );

//   // Create an array to store ordered product snapshots
//   const orderedProducts = [];
//   for (const orderItemId of orderItemsIds) {
//     const orderItem = await OrderItem.findById(orderItemId).populate('product', 'book_Title price image ');
//     orderedProducts.push({
//       productSnapshot: {
//         book_Title: orderItem.product.book_Title,
//         price: orderItem.product.price,
//         image:orderItem.product.image,
//       },
//       quantity: orderItem.quantity,
//     });
//   }

//   // Create a snapshot of the user details
//   const orderedUser = {
//     userSnapshot: {
//       name: req.body.user.name,
//       // ... (other relevant fields)
//     },
//   };

//   let orderlist = await Order({
//     // ... (your existing fields)
//     orderedProducts,
//     orderedUser,
//     shippingAddress1:req.body.shippingAddress1,
//                 shippingAddress2:req.bodyshippingAddress2,
//                 city:req.body.city,
//                 zip:req.body.zip,
//                 country:req.body.country,
//                 phone:req.body.phone,
//               //  totalPrice:totalPrice,
//             dateOrdered:req.body.dateOrdered,
//             user:req.body.user
                
//   });
//   orderlist = await orderlist.save();

//   if (orderlist) {
//     await orderlist.populate('user', 'name');
//     res.send(orderlist);
//   } else {
//     res.status(500).json({
//       success: false,
//     });
//   }
// });







/////**************************************************88////////////// */

//postman 
// {"orderItems" :[{
//     "product":"644ce3dec69bde5a9ca24e6f",
//     "quantity":3

// }],
//             "shippingAddress1":"Flat",
//             "shippingAddress2":"Model-town",
//             "city":"Hasilpur",
//             "zip":"12456",
//             "country":"Pakistan",
//             "phone":"030467849",
//             "status":"Dilevered",
//             "totalPrice":"2000",
//             "user":"644d472f6aad72f3215e5c05"
//             }
router.put('/:id',async (req,res)=>{
    let orderlist = await Order.findByIdAndUpdate(req.params.id,
        {
          status:req.body.status
        }
        );
    if(orderlist){
      res.send(orderlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})
router.delete('/:id', (req,res)=>{
    Order.findByIdAndDelete(req.params.id).then(async order=>{
        if(order)
        {
            await Order.orderItems.map(async orderitem=>{
                OrderItem.findByIdAndDelete(orderitem)
            })
           return res.status(300).json({success:true, message:"Order deleted"}
            )
        }
        else{
            return res.status(101).send("Not deleted")
        }
    }).catch(err=>{
     return res.status(400).json({
        success:false,
        message:"Not connected"
     })
    })
})
router.get('/get/totalsales',async (req,res)=>{
    const totalSales = await Order.aggregate([
       {$group:{_id:null, totalsales:{$sum:'$totalPrice'}}} 
    ])
    
    if(!totalSales)
    {
        return res.status(400).send("The order sales cannot be generated")
    }
    res.status(200).send({totalsales:totalSales.pop().totalsales})
})
// router.get('/get/count',async (req,res)=>{
//     const ordercount = await Order.countDocuments({}).then(count => {
//         res.send({Totalcount:count});

//     })
//     .catch(err => {
//         console.error(err);
//     });
//     if(ordercount){
//         res.send(
//             {count:
//                 ordercount});
//     }
//     else{
//         res.status(500).json({
//             success:false
//         })
//     }
// }
router.get('/get/count', async (req, res) => {
    try {
      const orderCount = await Order.countDocuments({});
      if (!orderCount) {
        console.log('Error occcureing')
        return res.status(400).json({ success: false, message: "Order count not found" });
      }
      res.status(200).json({ success: true, count: orderCount });
      console.log('Total count is : ', orderCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
  


router.get('/get/userorders/:id',async (req,res)=>{
    const orderlist = await Order.find({user:req.params.id}).populate({
        path:'orderItems', populate:{
        path:'product', populate:'category'}})

    if(orderlist){
        res.send(orderlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
    
  
      // Find all orders where the 'user._id' field matches the provided userId
      const orders = await Order.find({ 'user.id': userId }).populate('user');
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for the user.' });
      }
  
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  });


// // API endpoint to fetch orders by date
// router.get("/orders/byDate:date", (req, res) => {
//   //  const { date } = req.query;
//   const {date} = req.params;
  
//     // Validate that the date parameter is provided and in a valid format (YYYY-MM-DD)
//     if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
//       return res.status(400).json({ message: "Invalid date format. Please provide the date in the format 'YYYY-MM-DD'." });
//     }
  
//     const startDate = new Date(date);
//     const endDate = new Date(date);
//     endDate.setDate(endDate.getDate() + 1);
  
//     // Find orders with dateOrdered between startDate and endDate
//     Order.find({
//       dateOrdered: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     })
//       .sort({ dateOrdered: "desc" })
//       .then((orders) => {
//         res.json(orders);
//       })
//       .catch((error) => {
//         console.error("Error fetching orders by date:", error);
//         res.status(500).json({ message: "Internal server error" });
//       });
//   });


router.get("/byDate/:date", (req, res) => {
    const { date } = req.params;
  
    // Validate that the date parameter is provided and in a valid format (YYYY-MM-DD)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: "Invalid date format. Please provide the date in the format 'YYYY-MM-DD'." });
    }
  
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
  
    // Find orders with dateOrdered between startDate and endDate
    Order.find({
      dateOrdered: {
        $gte: startDate,
        $lt: endDate,
      },
    }).populate('user','name')
      .sort({ dateOrdered: "desc" })
      .then((orders) => {
        res.json(orders);
      })
      .catch((error) => {
        console.error("Error fetching orders by date:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  
  


  router.get("/totalPriceByDate/:date", (req, res) => {
    const { date } = req.params;
  
    // Validate date parameter
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: "Invalid date format. Please provide the date in the format 'YYYY-MM-DD'." });
    }
  
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
  
    // Find orders with dateOrdered between startDate and endDate
    Order.find({
      dateOrdered: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .then((orders) => {
        console.log("Chlein orders :", orders);
        const totalPrice = orders.reduce((total, order) => total + order.totalPrice, 0);
        console.log("Price will be",totalPrice);
        res.json({ totalPrice });
      })
      .catch((error) => {
        console.error("Error fetching total price by date:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  


module.exports=router;