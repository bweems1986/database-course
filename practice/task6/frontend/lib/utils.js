require("isomorphic-fetch");
import BPromise from "bluebird";

function getJson(url) {
  return fetch(url).then(function (resp) {
    console.log(url, resp);
    return resp.json();
  });
}


function getCamp(url){
  return fetch(`http://localhost:3000/login`).then(function(resp){
      return resp.json();
  })
}

function handleError(error) {
console.warn(error);
return null;
}

module.exports = {
getLogin: function () {
  return getCamp().catch(handleError);
},
};
