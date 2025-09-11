import app from "./app/app.js";
import config from "./config/config.js";
import connectDb from "./config/db.js";
import redis from "./config/redis.js";

app.listen(config.port, () => {
  //! database connection
  connectDb(config.mongo_uri as string);
  console.log("listening on port", config.port);
  // ! redis connection
  redis.on("connect", () => {
    console.log("redis connected..");
  });
});
