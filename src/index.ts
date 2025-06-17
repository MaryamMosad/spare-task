import express from "express";
import { dbConnection } from "./_common/database/db-connection";
import productsRouter from "./products/routes";
import { errorMiddleware } from "./_common/middleware/error";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/products/", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

dbConnection();

app.use(errorMiddleware);
