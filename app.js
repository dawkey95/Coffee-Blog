/**
 * Main application file.
 * BeanThereLatterly Blog Source Code V3.0.0
 * Created By the Team as Fuschia Fox Coding Inc
 */

// Setup Express server
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Setup body-parser

app.use(express.urlencoded({ extended: false }));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Handle index routing by rendering home page
app.get("/", function (req, res) {
    res.render("home");
});

// Use the toaster middleware
app.use(require("./middleware/toaster-middleware.js"));

// check client http req headers for an AuthToken and pass it to back-end for user-dao layer SQL search 

const { addUserToLocals } = require("./middleware/auth-middleware.js");
app.use(addUserToLocals); // this function call goes to the middleware which calls the backend user.dao function,passing in the cookie AuthToken value present in the request.cookies.Authtoken object.  That is then used in the SQL SELECT db query to return the matching row of user table data to the backend locals context for res.locals.user / greeting to guest or user / generic or user.name greeting if the db has a matching authToken.  It comes back here with the call back argument next() which continues the code flow here with routing set-ups below

// Setup routes

app.use(require("./routes/auth-routes.js"));
app.use(require("./routes/application-routes.js"));
app.use(require("./routes/article-routes.js"));


// Start the server running.
app.listen(port, function () {
    console.log(`BeanThereLatterly | Routes Set and App listening on port ${port}! `);
});