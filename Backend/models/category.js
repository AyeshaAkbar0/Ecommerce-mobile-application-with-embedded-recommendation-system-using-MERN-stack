const mongoose = require('mongoose');

const categorySchema  =new mongoose.Schema(
    {
        name:{type:String,
            dafault:''},
    }
);
categorySchema.virtual('id').get(function (){
    return this._id.toHexString()
});
categorySchema.set('toJSON',{
    virtuals:true,
})

categorySchema.pre('findOneAndDelete', async function (next) {
    const categoryId = this._conditions._id;
    await mongoose.model('Product').deleteMany({ category: categoryId });
    next();
  });


exports.Category = mongoose.model('Category', categorySchema);