import app from "./app/app.js";
import config from "./config/config.js";
import connectDb from "./config/db.js";

app.listen(config.port, () => {
  //! database connection
  connectDb(config.mongo_uri!);
  console.log("listening on port", config.port);
});
