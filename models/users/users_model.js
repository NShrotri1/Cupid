var fs = require('fs');

exports.getAllCrushes = function(id) {
  let u = fs.readFileSync('data/users/data.json', 'utf8');
  let userData = JSON.parse(u)
  return userData[id].crushes;
}

exports.getAllUsers = function() {
  let u = fs.readFileSync('data/users/data.json', 'utf8');
  let userData = JSON.parse(u)
  return userData
}
exports.getUser = function(id) {
  let userData = exports.getAllUsers();

  if (userData[id]) return userData[id];

  return {};
}

exports.getCrush = function(userId, id) {
  let userData = exports.getUser(userId)
  let crushList = userData.crushes
  // NOTE: ideally when the google sign-in API is added there won't be overlap between two users
  for(let i of crushList){
    if(i[0] == id){
      return i;
    }
  }
  return []
}

exports.addCrush = function(id, newUser) {
  let userData = exports.getAllUsers();
  userData[id].crushes.push(newUser)
  fs.writeFileSync('data/users/data.json', JSON.stringify(userData));
}

exports.updateCrush = function(userId, id, newInfo) {
  let userData = exports.getAllUsers()
  for(let i = 0; i < userData[userId].crushes.length; i++){
    if(userData[userId].crushes[i][0] == id){
      userData[userId].crushes[i] = newInfo
      break
    }
  }
  fs.writeFileSync('data/users/data.json', JSON.stringify(userData));
}

exports.deleteCrush = function(userId, id) {
  let userData = exports.getAllUsers();
  for(let i = 0; i < userData[userId].crushes.length; i++){
    if(userData[userId].crushes[i][0] == id){
      userData[userId].crushes.splice(i,1)
      break
    }
  }
  fs.writeFileSync('data/users/data.json', JSON.stringify(userData));
}
