const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

// const corsOptions ={
//    origin:'*',
//    credentials:true,
//    optionSuccessStatus:200,
// }

const app = express();

app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);

app.use(bodyParser.json());

app.use("/auction", require("./routes/auction"));
app.use("/leaderboard", require("./routes/leaderboard"));
app.use("/trading", require("./routes/trading"));
app.use("/profile", require("./routes/profile"));

const PORT = process.env.PORT || 3008;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
