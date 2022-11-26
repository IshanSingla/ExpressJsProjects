const mongoose = require("mongoose");
const databaseUrl = process.env.MONGO_ATLAS;

const connectDatabase = async () => {
  try {
    const con =await mongoose.connect("mongodb+srv://IshanSingla:IshanSingla@cluster.7n3viqu.mongodb.net/?retryWrites=true&w=majority", { dbName: "main" });
    console.log(`MongoDB is Connected with Host :${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to mongo.", error);
  }
};

module.exports = {connectDatabase}