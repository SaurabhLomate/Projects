import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI || "",
  env: process.env.NODE_ENV,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_expiry: process.env.JWT_EXPIRY,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_password: process.env.REDIS_PASSWORD,
};

export default Object.freeze(_config);
