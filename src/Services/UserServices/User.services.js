const REGISTER_URL = 'http://127.0.0.1:5002/register_user';
const GET_USERS_URL = 'http://127.0.0.1:5002/get_users';
const GET_USERS_EMAIL_URL = 'http://127.0.0.1:5002/get_users_email';
const LOGIN_URL = 'http://127.0.0.1:5002/login_user';
const RESET_PASSWORD_URL = 'http://127.0.0.1:5002/reset_password';
const FORGOT_PASSWORD_URL = 'http://127.0.0.1:5002/forgot_password';
export function register_user(state){
    console.log(state)
    var json = {
        'full_name': state.full_name,
        'username' : state.username,
        'password' : state.password,
        'email': state.email,
        'phone_number' : state.phone_number,
        'date_of_birth' : "1-1-1970"
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", REGISTER_URL);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(json));
    
}

export async function get_users(){
    fetch(GET_USERS_URL)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}
export async function get_users_email(email){
    let hostEmailData  = await fetch(GET_USERS_EMAIL_URL+"?email="+email)
    //use string literals
    let hostEmailJson = await hostEmailData.json();
    return hostEmailJson;

}

export function login_user(username, email, password){
    var json = {
        'username': username,
        'email' : email,
        'password' : password
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", LOGIN_URL+'?email='+email);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send(JSON.stringify(json));

}


export function reset_password(password){
    var json = {
        'password' : password
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", RESET_PASSWORD_URL+'?key='+email);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send(JSON.stringify(json));
}

export async function forgotPass(email){
    fetch(FORGOT_PASSWORD_URL+"?email="+email)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}