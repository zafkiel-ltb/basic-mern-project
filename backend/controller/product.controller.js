import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => { // get: show all data
    try {
        const products = await Product.find({});
        res.status(200).json({ success : true, data: products});
    } catch (error){
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const createProduct = async (req, res) => { // post: post a new data into database

    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        res.status(400).json({ success:false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    }catch (error){
        console.log("Error in create product: ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const updateProduct = async (req, res) => { // put: put a new data for updates
    const {id} = req.params; // ID of product
    const product = req.body; // Send new data from body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "ID is not valid"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const deleteProduct = async (req, res) => { // delete: ok its for deletes
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "ID is not valid"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product");
        res.status(500).json({ success: false, message: "Server error"});
    }
};