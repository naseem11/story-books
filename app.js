const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const {User}=require('./models/User');

require('./config/passport')(passport);
// const keys = require('./config/keys');



//  load Routes
const auth = require('./routes/auth');
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// passport middleware

app.use(passport.initialize());
app.use(passport.session());


// Set global vars

app.use((req, res, next) => {

    res.locals.user = req.user || null;
    next();
})




// mongoose connect
// mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI || keys.mongoURI)
    .then(() => {

        console.log('connected to database');
    });



app.use('/auth', auth);

app.get('/', (req, res) => {

    res.send('<h1> welcome to story books</h1>');
});


app.listen(port, () => {

    console.log(`Server is up on ${port}`);
})