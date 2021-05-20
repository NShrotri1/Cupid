var fs = require('fs');

exports.getAllUsers = function() {
  let userData = fs.readFileSync('data/users/data.json', 'utf8');
  return JSON.parse(userData);
}

exports.getSuspiciousUsers = function(id) {
  let userData = fs.readFileSync('data/mods/data.json', 'utf8');
  let u = JSON.parse(userData);
  return u[id].usersToCheck
}

exports.getUser = function(id) {
  let userData = exports.getAllUsers();

  if (userData[id]) return userData[id];

  return {};
}

exports.notifyUser = function(id) {
  let userData = exports.getAllUsers();
  if (userData[id]) {
    userData[id].flagged = true
    fs.writeFileSync('data/users/data.json', JSON.stringify(userData));  
  }
}

exports.banUser = function(id) {
  // NOTE: Please don't use this method since creating new users involves the API which I have not added yet
  var userData = exports.getAllUsers();
  delete userData[id];
  fs.writeFileSync('data/users/data.json', JSON.stringify(userData));
}
