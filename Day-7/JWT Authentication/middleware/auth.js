const jwt = require("jsonwebtoken");    
const secret = "SamSecretKey";
function setUser( user) {
    return jwt.sign(user, secret);
    
}

function getUser(token){
    if (!token) return null;
    return jwt.verify(token, secret);
}

async function restrictToLoggedInUser(req, res, next) {

    const userUid = req.cookies.uid;

    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth (req, res, next){
    const userUid = req.cookies.uid;
   
    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth,
};