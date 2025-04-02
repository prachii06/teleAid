
const express = require("express");
const path = require("path");
const i18n = require("i18n");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser()); // Middleware to read cookies

// Configure i18n
i18n.configure({
  locales: ["en", "hi"], // Supported languages
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  cookie: "lang",
});

app.use(i18n.init);
app.use(express.static("public")); // Serve static files
app.set("view engine", "ejs"); // Use EJS for templates
app.set("views", path.join(__dirname, "views")); // Ensure correct path

// Middleware to set default language if not set
app.use((req, res, next) => {
  let lang = req.cookies.lang || "en"; // Get lang from cookie or default to 'en'
  res.setLocale(lang);
  res.locals.lang = lang; // Make lang available in EJS
  next();
});

// Render homepage with lang variable
app.get("/", (req, res) => {
  res.render("index", { __: res.__, lang: res.locals.lang });
});

// Route to change language
app.get("/change-lang/:lang", (req, res) => {
  res.cookie("lang", req.params.lang); // Set language cookie
  res.redirect("/"); // Reload page
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
