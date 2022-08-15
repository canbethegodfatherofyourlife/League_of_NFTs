const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

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

// ------------------------------------Deployment --------------------------------

const __dirname1 = path.resolve()
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname1,'/frontend/build')))
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname1,'frontend','build','index.html'));
  })

}else{
  app.send("API is Running Successfully!")
}

// ------------------------------------Deployment --------------------------------

const PORT = process.env.PORT || 3008;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
