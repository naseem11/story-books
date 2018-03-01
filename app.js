const express=require('express');

const port=process.env.PORT|| 3000;

const app=express();

app.get('/',(req,res)=>{

    res.send('<h1> welcome to story books</h1>');
});


app.listen(port,()=>{

    console.log(`Server is up on ${port}`);
})