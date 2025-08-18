import { connect } from "mongoose";
interface ConnectionObj {
  isConnection?: number;
}

const connection: ConnectionObj = {};

const connectDb = async (uri: string) => {
  if (connection.isConnection) {
    console.log(`database already connected 😒`);
    return;
  }
  try {
    const connection_string = await connect(uri);
    connection.isConnection = connection_string.connections[0].readyState;
    console.log("database connected successfully 👍");
  } catch (error) {
    console.log(`error occurred while connecting to database 🤦‍♂️ ${error}`);
    process.exit(1);
  }
};

export default connectDb;
