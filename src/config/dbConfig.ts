import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected Succesfully");
    });

    connection.on("error", (err) => {
      console.log("Db Error" + err);
      process.exit()
    });
  } catch (error) {
    console.log("Cannot connect with the database");
    console.log(error);
  }
}
