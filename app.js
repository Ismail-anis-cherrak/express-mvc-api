import express from "express"
import userRouter from "./routes/UserRoute.js"
import productRouter from "./routes/ProductRoute.js"
import authRouter from "./routes/AuthRoute.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api", userRouter)
app.use("/api", productRouter)
app.use("/api", authRouter)

export default app
