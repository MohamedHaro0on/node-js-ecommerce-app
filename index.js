import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import connectDB from "./configurations/config.js";
import categroryRouter from "./modules/category/routes/category.routes.js";
import ProductRoutes from "./modules/product/routes/product.routes.js";

const app = express();

config(); // to Setup the dotenv  ;

connectDB();

// MiddleWares :
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Routes :
app.use(categroryRouter);
app.use(ProductRoutes);
// LISTEN
app.listen(process.env.PORT, () => {
  console.log("this is the console app on : ", process.env.PORT);
});
