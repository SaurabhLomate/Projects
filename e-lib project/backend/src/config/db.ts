import mongoose from "mongoose";
interface ConnectedObj {
  isConnected?: number;
}

const connected: ConnectedObj = {};

const connectDb = async (uri: string) => {
  if (connected.isConnected) {
    console.log(`database already connected 😒`);
    return;
  }
  try {
    const connection_string = await mongoose.connect(uri);
    connected.isConnected = connection_string.connections[0].readyState;
    console.log("database connected successfully 👍");

    // listen for error events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error: 🤬", err);
    });
  } catch (error) {
    console.log(`error occurred while connecting to database 🤦‍♂️ ${error}`);
    process.exit(1);
  }
};

export default connectDb;
