const express = require('express');
const router = express.Router();

const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const { Story } = require('../models/Story');



// stories index
router.get('/', (req, res) => {

    Story.find({
        status: 'public'
    })
        .sort({ date: 'desc' })
        .populate('user')
        .then((stories) => {



            res.render('stories/index', { stories });

        });

});

// /stories/mystories/userid

router.get('/user/:id',ensureAuthenticated,(req,res)=>{

    Story.find({user:req.params.id, status:'public'})
    .sort({date:'desc'})
    .populate('user')
    .then((stories)=>{


        res.render('stories/index',{stories});
    });


});

// add story form

router.get('/add', ensureAuthenticated, (req, res) => {

    res.render('stories/add');
})

//process story form

router.post('/add', (req, res) => {

    let allowComments = false;
    if (req.body.allowComments && req.body.status=='public') {
        allowComments = true;
    }

    const newStory = {

        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id



    }

    new Story(newStory)
        .save()
        .then((story) => {

            res.redirect(`/stories/show/${story.id}`);

        })

})

// edit story

router.get('/edit/:id', ensureAuthenticated, (req, res) => {

    Story.findOne({
        _id: req.params.id
    })

        .then((story) => {
            if (story.user != req.user.id) {

                res.redirect('/stories')

            } else {

                res.render('stories/edit', { story });
            }

        })


})
// story edit put route
router.put('/edit/:id', (req, res) => {
    let allowComments = false;

    Story.findOne({
        _id: req.params.id
    })

        .then((story) => {

            if (req.body.allowComments && req.body.status=='public') {
                allowComments = true;
            }


            // new values  
            story.title = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowComments = allowComments;
            story.user = req.user.id;

            story.save().then((story) => {

                res.redirect('/dashboard');
            })





        })





})

// show story

router.get('/show/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then((story) => {

            if(story.status=='public'){

                res.render('stories/show', { story });
            }else{
                if(req.user && req.user.id===stroy.user.id){


                    res.render('stories/show',{story});

                }else{

                    res.redirect('/stories');
                }



            }
           
        })

})

// delete story route

router.delete('/delete/:id', (req, res) => {

    Story.findByIdAndRemove(req.params.id)
        .then(() => {

            res.redirect('/dashboard');

        });

});


//  add comment route

router.post('/comment/:id', (req, res) => {


    let newComment = {

        commentBody: req.body.commentBody,
        date: Date.now(),
        commentUser: req.user,
    }


    Story.findById(req.params.id)
        .then((story) => {

            story.comments.unshift(newComment);




            story.save()
                .then((story) => {

                    res.redirect(`/stories/show/${story.id}`);
                });

        });

});








module.exports = router;