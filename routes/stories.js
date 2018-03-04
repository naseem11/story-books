const express=require('express');
const router=express.Router();

const {ensureAuthenticated,ensureGuest}=require('../helpers/auth');
const {Story}=require('../models/Story');



// stories index
router.get('/', (req,res)=>{

   Story.find({
       status:'public'
   })
   .sort({date:'desc'})
   .populate('user')
   .then((stories)=>{

     
     
   res.render('stories/index',{stories});

   });

});



// add story form

router.get('/add',ensureAuthenticated,(req,res)=>{

    res.render('stories/add');
})

//process story form

router.post('/add',(req,res)=>{

    let allowComments=false;
    if(req.body.allowComments){
        allowComments=true;
    }

    const newStory={

        title:req.body.title,
        body:req.body.body,
        status:req.body.status,
        allowComments:allowComments,
        user:req.user.id

      

    }

    new Story(newStory)
   .save()
   .then((story)=>{
    
    res.redirect(`/stories/show/${story.id}`);

   })
    
})

// edit story

router.get('/edit/:id',ensureAuthenticated, (req,res)=>{

    res.render('stories/edit');
})

// show story

router.get('/show/:id', (req,res)=>{
     Story.findOne({
         _id:req.params.id
     }).then((story)=>{

        res.render('stories/show',{story});
     })
   
})










module.exports=router;