import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI || "",
  env: process.env.NODE_ENV,
};

export default Object.freeze(_config);
