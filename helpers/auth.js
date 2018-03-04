const ensureAuthenticated=function(req,res,next){
if(req.isAuthenticated()){

    return next();
}
res.redirect('/');
}

const ensureGuest=function(req,res,next){
    if(req.isAuthenticated()){
    
       res.redirect('/dashboard');
    }
     else{
        return  next();
     }
    }


module.exports={ensureAuthenticated,ensureGuest};