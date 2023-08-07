import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
const port = process.env.PORT;

const app = express();

const setMessageMiddleware = (req, res, next) => {
  res.locals.message = "";
  res.locals.errorEmailMessage = "";
  res.locals.errorUsernameMessage = "";
  res.locals.errorPasswordMessage = "";
  res.locals.errorPasswordMatchMessage = "";
  res.locals.errorField = "";
  res.locals.userRegistered = "";
  res.locals.loginError = "";
  res.locals.userLogin = "";
  next();
};

app.use(setMessageMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRoutes);

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.set("view engine ", "ejs");

// server listen
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is successfully running at port ${port} `);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
