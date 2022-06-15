    function recordameMiddleware(req,res,next){
        next();
        if (req.cookies.recordame !=undefined && req.session.userToLogin==undefined){
            let userJSON=fs.readFileSync('users.json',{
                encoding:'utf-8'});
            let users;
            if(userJSON==""){
                users=[]
            }
            else{
                users=JSON.parse(userJSON)
            }
    
            for(let i=0;i<users.length;i++){
                if(users[i].email==req.cookies.recordame){
                    userToLogin=users[i];
                    break;
                }
                }
            }
            req.session.userLogged = userToLogin
            }
        
    


module.exports=recordameMiddleware;