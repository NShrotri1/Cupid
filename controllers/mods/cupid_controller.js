let express = require('express')
  , router = express.Router();
let request = require('request');

let User = require('../../models/users/users_model')
let Mod = require('../../models/mods/mods_model.js')

router.get('/user', function(request, response) {
  let list = Mod.getSuspiciousUsers('Toad')
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("mods/index.ejs", {susList: list});
});

router.get('/user/:id', function(request, response){
  response.status(200)
  response.setHeader('Content-Type', 'text/html')
  response.render("mods/userpage.ejs", {person: request.params.id})
})
router.put('/user/:id', function(request, response){
  Mod.notifyUser(request.params.id)
  response.redirect('/user')
})

router.delete('/user/:id', function(request, response){
  Mod.banUser(request.params.id)
  response.redirect('/user')
})
module.exports = router
