const app = require("./src/app");
require("dotenv").config();

PORT = process.env.SERVER_PORT;

app.listen(PORT || 3000, function (err) {
  if (err) console.log("Can't connect to the server");
  console.log(`server connected to port : ${PORT}`);
});
