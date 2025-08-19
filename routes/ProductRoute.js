import express from "express";
import { createProduct, deleteProduct, editProductPatch, editProductPut, getAllProducts, getSingleProduct } from "../controllers/ProductController.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";


const productRouter = express.Router()
productRouter.get("/products", AuthMiddleware.verifyToken, getAllProducts)
productRouter.get("/products/:id", AuthMiddleware.verifyToken, getSingleProduct)
productRouter.post("/products", AuthMiddleware.verifyToken, createProduct)
productRouter.put("/products/:id", AuthMiddleware.verifyToken, editProductPut)
productRouter.patch("/products/:id", AuthMiddleware.verifyToken, editProductPatch)
productRouter.delete("/products/:id", AuthMiddleware.verifyToken, deleteProduct)

export default productRouter;
