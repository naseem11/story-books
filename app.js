const express=require('express');
const passport=require('passport');
require('./config/passport')(passport);



//  load Routes
const auth=require('./routes/auth');

const port=process.env.PORT|| 3000;

const app=express();

app.use('/auth',auth);

app.get('/',(req,res)=>{

    res.send('<h1> welcome to story books</h1>');
});


app.listen(port,()=>{

    console.log(`Server is up on ${port}`);
})