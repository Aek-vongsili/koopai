require("dotenv").config();
require("./models");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./routers/user");
const middlewares = require("./middlewares");
const app = express();

//PORT
const port = process.env.PORT || 4000;

//CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api/user", userRouter);

// app.use((req, res) => {
//   res.send(process.env.DB_HOST);
// });

//server
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.listen(port, () => {
  console.log(`Your server is listening on port ${port}`);
});
