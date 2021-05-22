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

router.get('/', function(request, response) {
  let list = User.getAllCrushes("mario@gmail.com")
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("users/index.ejs", {crushList: list});
});

router.get('/create', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("users/newCrush.ejs");
});

router.get('/login', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login.ejs");
});

router.get('/:crush', function(request, response){
  response.status(200);
  let crush = request.params.crush
  let info = User.getCrush("mario@gmail.com", crush)
  response.setHeader('Content-Type', 'text/html')
  if (info = []) {
    response.render("error.ejs")
  }
  else {
    response.render("users/crushDetails.ejs", {crushInfo: info});
  }
})

router.get('/:crush/edit', function(request, response){
  response.status(200);
  let crush = request.params.crush
  let info = User.getCrush("mario@gmail.com", crush)
  // TODO: Add error page possibility
  response.setHeader('Content-Type', 'text/html')
  response.render("users/editCrush.ejs", {crushInfo: info});
})

router.post('/loginAction', function(request, response) {
  response.redirect('/')
})
router.post('/newCrush', function(request, response){
  let info = [request.body.name, request.body.number]
  User.addCrush("mario@gmail.com", info)
  response.redirect('/')
})
router.get('/signup', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("users/signup.ejs");
});

router.post('/signupAction', function(request, response) {
  response.redirect('/')
})

router.put('/:id', function(request, response){
  User.updateCrush("mario@gmail.com", request.params.id, [request.body.name, request.body.number])
  response.redirect('/')
})

router.delete('/:id', function(request, response){
  User.deleteCrush("mario@gmail.com", request.params.id)
  response.redirect('/')
})

module.exports = router
