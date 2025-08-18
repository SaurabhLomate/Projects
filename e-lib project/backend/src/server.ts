import app from "./app/app.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDb(process.env.MONGO_URI || "");
  console.log("listening on port", port);
});
