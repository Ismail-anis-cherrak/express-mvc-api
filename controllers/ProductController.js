import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSingleProduct  = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { title, description, price, imageUrl, owner } = req.body;
    const product = new Product({ title, description, price, owner });
    try {
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editProductPut = async (req, res) => {
    const { title, description, price, owner } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { title, description, price, owner }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editProductPatch =async (req, res) => {
    const updates = req.body
    const { id } = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });     
    }
}