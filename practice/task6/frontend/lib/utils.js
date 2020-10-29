require("isomorphic-fetch");
import BPromise from "bluebird";

function getJson(url) {
  return fetch(url).then(function (resp) {
    console.log(url, resp);
    return resp.json();
  });
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUsername(username){
  return getJson(`https://localhost:3000/login`)
}
function getPassword(password){
  return getJson(`https://localhost:3000/login`)
}

function getUserData(user_info){
  return BPromise.all([getUsername(user_info), getPassword(user_info)]).then(function
    ([username, password]){
      return {username, password};
  
  });
}

module.exports = {
  createAccount: function (user_info) {
    return getJson(user_info).catch(handleError);
  },
  getLogin: function (user_info) {
    return getUserData(user_info).catch(handleError);
  },
};
