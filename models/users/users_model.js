var fs = require('fs');
var admin = require("firebase-admin");

var serviceAccount = require("../../config/firebase_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create a database reference
var db = admin.firestore();

exports.getAllCrushes = function(username) {
  var cList = []
  var counter = 0
  db.collection('users').get()
  .then(function(snapshot){
    snapshot.forEach(function(doc){
      if(doc.id == username){
        var u = doc.data().crushes
        var v = doc.data().crushNumber
        for (var i = 0; i < u.length; i++) {
          cList.push([u[i], v[i]])
          counter += 1
        }
      }
    });
  })
  .catch(function(err){
    console.log('Error getting documents', err);
  });
  return cList;
}

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
  let personToUpdate = db.collection('users').doc(id);
  console.log(id);
  console.log(personToUpdate);
  if(personToUpdate.crushes){
    let info = personToUpdate.crushes
  info.push(newUser[0])
  let otherInfo = personToUpdate.crushNumber
  otherInfo.push(newUser[1])
  let updat = personToUpdate.update(
    {
      crushes: info,
      crushNumber: otherInfo
    }
  )}
  else {
    let setUpdate = personToUpdate.set({
    "id":12345,
    "username":id,
    "name":id,
    "number":123456789,
    "crushes":[newUser[0]],
    "crushNumber":[newUser[1]],
    "crushesAddedToday":0,
    "flagged":false}
  );
  }
}

exports.updateCrush = function(userId, id, newInfo) {
  let userData = exports.getAllUsers()
  for(let i = 0; i < userData[userId].crushes.length; i++){
    if(userData[userId].crushes[i][0] == id){
      userData[userId].crushes[i] = newInfo
      break
    }
  }
  let personToUpdate = db.collection('users').doc(userId);
  let updat = personToUpdate.update(
    {
      crushes: userData[userId].crushes
    }
  )
}

exports.deleteCrush = function(userId, id) {
  let userData = exports.getAllUsers();
  for(let i = 0; i < userData[userId].crushes.length; i++){
    if(userData[userId].crushes[i][0] == id){
      userData[userId].crushes.splice(i,1)
      break
    }
  }
  let personToUpdate = db.collection('users').doc(userId);
  let updat = personToUpdate.update(
    {
      crushes: userData[userId].crushes
    }
  )
}
