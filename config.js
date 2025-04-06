// configuration for which variable will be used depend on the case [Development / Production]
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
};
