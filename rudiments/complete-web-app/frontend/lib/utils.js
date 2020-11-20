require("isomorphic-fetch");
import BPromise from "bluebird";

function getFoodInfo(description) {
  return fetch(`http://localhost:8080/index?description=${description}`).then(function(resp){
    return resp.json();
  }) 
}

function handleError(error){
  console.warn(error);
  return null;
}

module.exports = {
  getInfo: function(food_name){
    return getFoodInfo(food_name).catch(handleError);
  }
};

