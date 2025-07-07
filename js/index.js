var nameInput = document.querySelector("input#name");
var emailInput = document.querySelector("input#email");
var passwordInput = document.querySelector("input#password");
var messageInput = document.querySelector("input#password+p");
var welcomeCard = document.querySelector("div.card h2");

var nameErrorMessage = "Name Can't be empty and can't have space and Minimum length is 6";
var emailErrorMessage = "please enter your gmail Ex:- tom@gmail.com";
var redundantEmailErrorMessage = "this email is used by another user please enter another email";
var passwordErrorMessage = "password must contain characters and digits and Minimum length is 6";
var loginErrorMessage = "incorrect email or password";

var users = [];

var emailRegExp = /[a-zA-z0-9]+@gmail\.com/;
var nameOrPasswordRegExp = /[a-zA-Z0-9]{6,}/;

if(localStorage.getItem("loggedInUser")){
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    welcomeCard.innerHTML = `Welcome ${loggedInUser.name}`;
}

function register(){
    if( validateInput(nameInput , nameOrPasswordRegExp, nameErrorMessage) &&
        validateInput(emailInput , emailRegExp, emailErrorMessage) &&
        validateInput(passwordInput , nameOrPasswordRegExp, passwordErrorMessage)
    ){
        var storedUsers = JSON.parse(localStorage.getItem("users"));
        var isUSerExist = storedUsers.find(function(user){
            return user.email == emailInput.value;
        });
        if(isUSerExist){
            emailInput.classList.add("is-invalid");
            emailInput.classList.remove("is-valid");
            messageInput.classList.replace("d-none","d-block");
            messageInput.innerHTML = redundantEmailErrorMessage;
        }
        else{
            var user={
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "index.html";
        }
    }
}
function validateInput(input , regExp , errorMessage){
    if(input.value != null && regExp.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        messageInput.classList.replace("d-block" , "d-none");
        return true;
    }
    else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        messageInput.classList.replace("d-none" , "d-block");
        messageInput.innerHTML = errorMessage;
        return false;
    }
}
function Login(){
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    var isUserExist = storedUsers.find(function(user){
      return user.email == emailInput.value && user.password == passwordInput.value;  
    });
    if(isUserExist)
    {
        window.location.href = "home.html";
        localStorage.setItem("loggedInUser" , JSON.stringify(isUserExist));
    }
    else
    {
        messageInput.innerHTML = loginErrorMessage;
        messageInput.classList.replace("d-none" , "d-block");
    }
}
function Logout(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}