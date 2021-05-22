var fs = require('fs');

exports.getAllUsers = function() {
  let list = {}
  db.collection('users').get()
  .then(function(snapshot){
    snapshot.forEach(function(doc){
      list[doc.id] = doc.data()
    });
  })
  .catch(function(err){
    console.log('Error getting documents', err);
  });
  return list
}

exports.getSuspiciousUsers = function(id) {
  let userData =db.collection('users').get()
  .then(function(snapshot){
    snapshot.forEach(function(doc){
      list[doc.id] = doc.data()
    });
  })
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
  }
}

exports.banUser = function(id) {
  // NOTE: Please don't use this method since creating new users involves the API which I have not added yet
  var userData = exports.getAllUsers();
  delete userData[id];
}
