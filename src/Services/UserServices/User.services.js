const REGISTER_URL = 'http://127.0.0.1:5002/register_user';

export function userRegister(username, email, password){
    var json = {
        'username': username,
        'email' : email,
        'password' : password
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", REGISTER_URL);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send(JSON.stringify(json));
  }