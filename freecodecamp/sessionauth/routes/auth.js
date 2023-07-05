var express = require('express');
var router = express.Router();
const session = require('express-session');

router.get('/login', (req, res, next) => {

  console.log('asdads');

  //THIS SETS A FAKE OBJECT - 'USER' 
  req.session.user = {
      uuid: '12234-2345-2323423'
  }

  req.session.save(err => {
      if(err){
          console.log(err);
      } else {
          res.send(req.session.user) // YOU WILL GET THE UUID IN A JSON FORMAT
      }
  }); //THIS SAVES THE SESSION.
});

module.exports = router;