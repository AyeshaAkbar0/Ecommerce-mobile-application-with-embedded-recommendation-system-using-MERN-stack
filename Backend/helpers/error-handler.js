 function errorHandler(err,req,res,next){
    //Unauthorized error for user who donot have token
    if(err.name==='UnauthorizedError'){
        return res.status(401).json({message:"The user is not authorized!"})
    }
    //Validation Error if pdf not required but uploaded etc
    if(err.name==='ValidationError'){
        return res.status(401).json({message:err})
    }
    //general error
    return res.status(500).json(err)
}
module.exports= errorHandler;