const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));

app.use(require('./controllers/auth'));
app.use(require('./controllers/mods/cupid_controller.js'));
app.use(require('./controllers/users/cupid_controller.js'));

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('localhost:'+port)
});
