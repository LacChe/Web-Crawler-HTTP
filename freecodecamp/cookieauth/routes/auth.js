let express = require('express');
let router = express.Router();

router.get('/login', function(req, res, next) {
  console.log(11)
  let cookie_Stuff=req.signedCookies.user;
  // But the user is logging in for the first time so there won't be any appropriate signed cookie for usage.
  if(!cookie_Stuff) {
    console.log(22)
    let auth_Stuff=req.headers.authorization;
    if(!auth_Stuff) {
      console.log(33)
      res.setHeader("WWW-Authenticate", "Basic");
      res.sendStatus(401);
    } else {
      console.log(44)
      step1 = new Buffer.from(auth_Stuff.split(" ")[1], 'base64'); // Extracting username:password from the encoding Authorization: Basic username:password
      step2 = step1.toString().split(":"); // Extracting the username and password in an array
      if(step2[0]=='admin' && step2[1]=='admin') { // Correct username and password given
        console.log(55)
        console.log("WELCOME ADMIN");
        res.cookie('user', 'admin', // Store a cookie with name=user and value=username
        {
          signed: true,
          maxAge: 5000, 
          httpOnly: true,
        });
        res.send("Signed in the first time");
      } else { // Wrong authentication info, retry
        console.log(66)
        res.setHeader("WWW-Authenticate", "Basic");
        res.sendStatus(401);
      }
    }
  } else { // Signed cookie already stored
    console.log(77)
    if(req.signedCookies.user=='admin') {
      console.log(88)
      res.send("HELLO GENUINE USER");
    } else { // Wrong info, user asked to authenticate again
      console.log(99)
      res.setHeader("WWW-Authenticate", "Basic");
      res.sendStatus(401);
    }
  }
});

module.exports = router;
