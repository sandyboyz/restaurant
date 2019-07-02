const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');


const port = process.env.PORT || 5000;


const mongooseURI = "mongodb://localhost:27017/restaurant";
mongoose
    .connect(mongooseURI, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(e => console.log(e));

// Middleware
app.use(cors());
app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Export Routes 
const mainfood = require("./routes/mainfood");
const users = require("./routes/users");

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api', mainfood);
app.use('/api/users', users);

http.listen(port, () => console.log(`App running at port ${port}`));

io.on('connection', (socket) => {
    console.log(socket.client.id);
});