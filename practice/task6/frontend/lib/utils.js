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
};

