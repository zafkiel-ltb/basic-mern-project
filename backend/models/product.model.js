import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // created at, update at ???
});

const Product = mongoose.model('Product', productSchema); // create collection called Product use productSchema
// tại sao là Product chứ không phải là products => moongoose sẽ tự động convert về thành 'products'
export default Product;