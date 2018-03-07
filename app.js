
const express = require('express');
const path=require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
// const {User}=require('./models/User');

require('./config/passport')(passport);
// handlebars helpers
const {truncate,stripTags,formatDate,select,editIcon}=require('./helpers/hbs');

const keys = require('./config/keys');



//  load Routes
const auth = require('./routes/auth');
const index=require('./routes/index');
const stories=require('./routes/stories');



const app = express();
const port = process.env.PORT || 3000;

// handlebars middleware

app.engine('handlebars',exphbs({
    helpers: { truncate:truncate,
                stripTags:stripTags,
                formatDate:formatDate,
                select:select ,
                editIcon:editIcon
            },
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

// Method override
app.use(methodOverride('_method'));

// bodyParser middleware

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


// static files middleware
app.use(express.static(path.join(__dirname,'public')));

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
mongoose.connect(keys.mongoURI)
    .then(() => {

        console.log('connected to database');
    });



app.use('/auth', auth);
app.use('/',index);
app.use('/stories',stories);



app.listen(port, () => {

    console.log(`Server is up on ${port}`);
})