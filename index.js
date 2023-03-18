const app = require("./src/app");
require("dotenv").config();

PORT = process.env.SERVER_PORT;
TZ = "Asia/Dubai";

app.listen("https://stormy-fawn-polo-shirt.cyclic.app/", () => {
  console.log(`Server is running on port: ${PORT}`);
});
