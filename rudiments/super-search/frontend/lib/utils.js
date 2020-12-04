require("isomorphic-fetch");
import BPromise from "bluebird";

function getLoginInfo(user_info) {
  const header = {'Accept' : "application/json",
                  "Content-Type": "application/x-www-form-urlencoded"};
  const searchParams = new URLSearchParams(user_info);
  return fetch("http://localhost:8080/login",
  { method: "POST",
    headers: header,
    body: searchParams}).then(function (resp){
      return resp.json();
    }); 
}

function getRegisterInfo(user_info) {
  const header = {'Accept' : "application/json",
                  "Content-Type": "application/x-www-form-urlencoded"};
  const searchParams = new URLSearchParams(user_info);
  return fetch("http://localhost:8080/create",
  { method: "POST",
    headers: header,
    body: searchParams}).then(function (resp){
      return resp.json();
    }); 
}

function getCommunityLoggedInInfo(name,userName) {
  return fetch(`http://localhost:8080/search?name=${name}&screenname=${userName}`).then(function(resp){
    console.log(userName);
    return resp.json();
    })
}

function getCommunityNotLoggedInfo(name){
  return fetch(`http://localhost:8080/search?name=${name}`).then(function(resp){
      console.log(name);
      return resp.json();
    })

}

async function checkLogin(userpw){
  console.log(userpw);//{username: , password: }
  const info = await getLoginInfo(userpw);
  console.log(info);//{status: , screenname: }
  console.log(info.status);
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  createAccount: function (user_info) {
    console.log(user_info);
    return getRegisterInfo(user_info).catch(handleError);
  },
  getLogin: function (user_info) {
    console.log(user_info);//{username: , password: }
    return getLoginInfo(user_info).catch(handleError);
  },
  getLoggedInfo: function(community_info,user_info){
    return getCommunityLoggedInInfo(community_info,user_info).catch(handleError);
  },
  getScreenname: function (user_info) {
    console.log(user_info);
    return getRegisterInfo(user_info).catch(handleError);
  },
  getNotLogged: function(community_info){
    return getCommunityNotLoggedInfo(community_info).catch(handleError);
  }
};

