import express, { Request, Response} from "express"
import { createProduct, deleteProducts, getProductsId, readProduct, updateProduct } from "./logics";
import { isIdExists, isProductNameExists } from "./middlewares";

const app = express();

app.use(express.json());

app.post("/products", isProductNameExists, createProduct);

app.get("/products", readProduct);

app.get("/products/:id", isIdExists, getProductsId);

app.patch("/products/:id", isIdExists, isProductNameExists, updateProduct);

app.delete("/products/:id", isIdExists, deleteProducts);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})