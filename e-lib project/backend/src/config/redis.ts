import { Redis } from "ioredis";
import config from "./config.js";

const redis = new Redis({
  host: config.redis_host,
  password: config.redis_password,
  port: config.redis_port,
});

export default redis;
