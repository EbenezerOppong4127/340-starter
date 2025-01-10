/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const path = require("path");
/* ***********************
 * Routes
 *
 *
 *************************/
/* ***********************
 * Set EJS as templating engine
 *************************/
app.set("view engine", "ejs"); // Set EJS as the default template engine
app.set("views", path.join(__dirname, "views")); // Define the views folder



app.use(static)

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
