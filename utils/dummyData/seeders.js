import fs from "fs";
import { config } from "dotenv";
import ProductModel from "../../modules/product/model/product.model.js";
import DBconnection from "../../configurations/config.js";

config({ path: "../../.env" });

// connect to DB
DBconnection();

// Read data
const products = await JSON.parse(fs.readFileSync("./products.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await ProductModel.insertMany(products);
    console.log("Data Inserted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
