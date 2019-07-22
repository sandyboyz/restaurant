const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoose2 = require("mongoose");
const passport = require("passport");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

const port = process.env.PORT || 5000;

const mongooseURI = "mongodb://localhost:27017/restaurant";
// mongoose
//   .connect(mongooseURI, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(e => console.log(e));
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(conn => {
    console.log("MongoDB Atlas Connected");
  })
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use("/uploads/", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Export Routes
const mainfood = require("./routes/mainfood");
const users = require("./routes/users");
const _super = require("./routes/super");

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api", mainfood);
app.use("/api/users", users);
app.use("/api/super", _super);

http.listen(port, () => console.log(`App running at port ${port}`));

io.on("connection", socket => {
  console.log(socket.client.id);
});
