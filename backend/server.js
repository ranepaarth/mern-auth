import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFoundError } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
