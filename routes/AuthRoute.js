import express from "express"
import AuthController from "../controllers/AuthController.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.get("/profile", AuthMiddleware.verifyToken, AuthController.getProfile);

export default authRouter