import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.DB_URI)
      .then((con) => {
        console.log("the connection was a suscessfull", con.connection.host);
      })
      .catch((e) => {
        console.log("this is the error ", e);
        process.exit();
      });
  } catch (e) {
    console.log("this is the error ");
    process.exit();
  }
};

export default connectDB;
