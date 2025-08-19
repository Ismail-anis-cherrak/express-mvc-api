import { addUser, deleteUser, editUserPatch, getAllUsers, getSingleUser, editUserPut } from "../controllers/UserController.js";


import express from "express";

const userRouter = express.Router();

userRouter.post("/users", addUser);

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getSingleUser);

userRouter.put("/users/:id", editUserPut);

userRouter.patch("/users/:id", editUserPatch);

userRouter.delete("/users/:id", deleteUser);

export default userRouter;
