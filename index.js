const app = require("./src/app");
require("dotenv").config();

PORT = process.env.SERVER_PORT;

app.listen(3004, () => {
  console.log(`Server is running on port: ${3000}`);
});
