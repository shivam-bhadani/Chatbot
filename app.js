require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const path = require('path');
const Chat = require('./models/chat');

const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');

const initPassport = require("./passport-config");
const Button = require('./models/button');
initPassport(passport);

const Port = process.env.PORT || 2000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

require('./db/conn');

app.use(flash());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRoute);
app.use('/admin', adminRoute);

let server = app.listen(Port, () => console.log(`Listening to Port ${Port}`));

let io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        getAnswer(msg)
            .then((result) => {
                if (result) {
                    // console.log(result)
                    socket.emit('message', result.answer);
                }
                else {
                    socket.emit('message', "Invalid Question or this query is not available!");
                }
            }).catch((err) => {
                console.log(error)
            });
    })
    socket.on('btnClick', (titleId) => {
        getBtnSubtitle(titleId)
            .then((result) => {
                socket.emit('btnClick', result.subtitles);
            }).catch((err) => {
                console.log(error);
            });
    })

    socket.on('btnAnswer', (subtitleId) => {
        getBtnAnswer(subtitleId)
            .then((result) => {
                socket.emit('message', result);
            }).catch((err) => {
                console.log(err);
            });
    })

})

async function getAnswer(ques) {
    let result = await Chat.findOne({ 'question': { '$regex': ques, '$options': 'i' } });
    return result;
}

async function getBtnSubtitle(btnId) {
    let result = await Button.findById(btnId)
    return result
}

async function getBtnAnswer(id) {
    try {
        let results = await Button.findOne({ 'subtitles._id': id })
        // console.log(id);
        for (let i = 0; i < results.subtitles.length; i++) {

            if (results.subtitles[i]._id == id)
                return (results.subtitles[i].answer);

        }
    } catch (error) {
        console.log(error);
    }
}