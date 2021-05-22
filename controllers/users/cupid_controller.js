let express = require('express')
  , router = express.Router();
let request = require('request');

let User = require('../../models/users/users_model')
let Mod = require('../../models/mods/mods_model.js')

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/', loggedIn, async function(request, response, next) {
  try{
  let list = User.getAllCrushes(request.user._json.email)
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("users/index.ejs", {crushList: list});
}
catch (error) {
    response.redirect('/error?code=500');
  }
});

router.get('/create', loggedIn, async function(request, response, next) {
  try{
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("users/newCrush.ejs");
}
catch (error) {
    response.redirect('/error?code=500');
  }
});

router.get('/login', function(request, response) {
  try{response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login.ejs");}
  catch (error) {
    response.redirect('/error?code=500');
  }
});

router.get('/:crush', loggedIn, async function(request, response, next){
  try{response.status(200);
  let crush = request.params.crush
  let info = User.getCrush(request.user._json.email, crush)
  response.setHeader('Content-Type', 'text/html')
  if (info = []) {
    response.render("error.ejs")
  }
  else {
    response.render("users/crushDetails.ejs", {crushInfo: info});
  }}
  catch (error) {
    response.redirect('/error?code=500');
  }
})

router.get('/:crush/edit', loggedIn, async function(request, response, next){
  try{response.status(200);
  let crush = request.params.crush
  let info = User.getCrush(request.user._json.email, crush)
  // TODO: Add error page possibility
  response.setHeader('Content-Type', 'text/html')
  response.render("users/editCrush.ejs", {crushInfo: info});}
  catch (error) {
    response.redirect('/error?code=500');
  }
})

router.post('/newCrush', function(request, response){
  let info = [request.body.name, request.body.number]
  User.addCrush(request.user._json.email, info)
  response.redirect('/')
})


router.put('/:id', function(request, response){
  User.updateCrush(request.user._json.email, request.params.id, [request.body.name, request.body.number])
  response.redirect('/')
})

router.delete('/:id', function(request, response){
  User.deleteCrush(request.user._json.email, request.params.id)
  response.redirect('/')
})

module.exports = router
