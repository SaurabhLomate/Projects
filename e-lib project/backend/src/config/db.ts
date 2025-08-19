import mongoose from "mongoose";
interface ConnectedObj {
  isConnected?: number;
}

const connected: ConnectedObj = {};
let isListenersSet = false;

const connectDb = async (uri: string) => {
  if (connected.isConnected) {
    console.log(`database already connected 😒`);
    return;
  }
  try {
    if (!isListenersSet) {
      const conn = mongoose.connection;
      conn.on("connected", () => {
        connected.isConnected = 1;
        console.log("database connected successfully 👍");
      });
      conn.on("disconnected", () => {
        connected.isConnected = 0;
        console.log(`database connection disconnected 😭`);
      });

      conn.on("reconnected", () => {
        connected.isConnected = 1;
        console.log(`reconnected to database successfully 😁`);
      });

      // listen for error events
      conn.on("error", (err) => {
        console.error("MongoDB connection error: 🤬", err);
      });
      isListenersSet = true;
    }
    await mongoose.connect(uri);
  } catch (error) {
    console.log(`error occurred while connecting to database 🤦‍♂️ ${error}`);
    process.exit(1);
  }
};

export default connectDb;
