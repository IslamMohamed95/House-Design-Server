require("../app/db/dbConnection");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/upload", express.static("upload"));
const masterRoute = require("../app/routers/master.route");
const userRoute = require("../app/routers/user.route");
const contractRoute = require("../app/routers/contract.route");
const visitorRoute = require("../app/routers/visitors.route");
const salesRoute = require("../app/routers/sales.route");
const variationRoute = require("../app/routers/variations.route");
app.use("/master", masterRoute);
app.use("/user", userRoute);
app.use("/contract", contractRoute);
app.use("/visitor", visitorRoute);
app.use("/sales", salesRoute);
app.use("/variation", variationRoute);

app.get("*", (req, res) => {
  res.status(404).send({
    API: false,
    message: "Invalid Link !..",
  });
});

module.exports = app;
