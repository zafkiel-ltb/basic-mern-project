import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from 'path'
import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();

app.use(express.json()); // allow to accept Json in the req.body

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use("/api/products", productRoutes) // Dùng cái router của product ( product.router.js )

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve.apply(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
