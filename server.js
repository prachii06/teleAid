// const express = require("express");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const twilio = require("twilio");
// const path = require("path");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Twilio Client
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public"))); // Serve static files
// app.set("view engine", "ejs"); // Set EJS as view engine

// // 📌 Route: Render the Home Page
// app.get("/", (req, res) => {
//   res.render("index");
// });

// // 📌 Route: Send Emergency Alert via Twilio
// app.post("/send-alert", async (req, res) => {
//   const { latitude, longitude, phoneNumber } = req.body;

//   if (!latitude || !longitude || !phoneNumber) {
//     return res.status(400).json({ error: "Missing required parameters." });
//   }

//   try {
//     const mapLink = `https://maps.mapmyindia.com/hospitals/near/${latitude},${longitude}`;

//     const message = await twilioClient.messages.create({
//       body: `🚨 Emergency Alert! Patient at ${mapLink}. Please provide immediate assistance.`,
//       from: process.env.TWILIO_PHONE,
//       to: phoneNumber,
//     });

//     res.json({ success: true, message: "Emergency alert sent.", sms_sid: message.sid });
//   } catch (error) {
//     console.error("Twilio Error:", error);
//     res.status(500).json({ error: "Failed to send emergency alert." });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

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
