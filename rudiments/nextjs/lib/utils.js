require("isomorphic-fetch");
import BPromise from "bluebird";


function getCamp(name){
    return fetch(`http://35.190.190.219/api/info?q=${name}`).then(function(resp){
        return resp.json();
    })
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  getInfo: function (campground) {
    return getCamp(campground).catch(handleError);
  },
};