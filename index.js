const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { auth } = require("./middleweare/auth.middleware");
const {noteRouter} = require("./routes/Notes.routes")
const cors = require("cors");
require("dotenv").config()

const app = express();

app.use(cors())
app.use(express.json());
app.use("/users", userRouter);

//Protected Routes
app.use(auth);
app.use("/notes",noteRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Cannot connect to the DB");
  }
  console.log(`server is running at ${process.env.port}`);
});
