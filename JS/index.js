var signIn = document.getElementById("signIn");
var goToSignIn = document.getElementById("goToSignIn");
var signUp = document.getElementById("signUp");
var goToSignUp = document.getElementById("goToSignUp");
var signInName = document.getElementById("signInName");
var signInPassword = document.getElementById("signInPassword");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var users = [];
if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}
function goFromLoginToRegister() {
  signIn.classList.replace("d-block", "d-none");
  goToSignIn.classList.replace("d-none", "d-block");
  goToSignUp.classList.replace("d-block", "d-none");
  signUp.classList.replace("d-none", "d-block");
}
function goFromRegistrationToLogIn() {
  goToSignIn.classList.replace("d-block", "d-none");
  signIn.classList.replace("d-none", "d-block");
  signUp.classList.replace("d-block", "d-none");
  goToSignUp.classList.replace("d-none", "d-block");
}
function addsers() {
  if (emailExists() != true) {
      if ( validateInputs(signUpName) && validateInputs(signUpEmail) && validateInputs(signUpPassword)){
        var user = {
          Id: signUpName.value,
          Email: signUpEmail.value,
          Password: signUpPassword.value,
        };
      users.push(user);
      clearFormSignUp();
      localStorage.setItem("users", JSON.stringify(users));
      goFromRegistrationToLogIn();
    }
  } 
  else {
    signUpEmail.nextElementSibling.classList.replace("d-none", "d-block");
    signUpEmail.nextElementSibling.innerHTML = "This email exists";
  }
}
function clearFormSignUp() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}

function logInToTheAccount() {
  for (var i = 0; i < users.length; i++) {
    if (
      signInName.value == users[i].Email &&
      signInPassword.value == users[i].Password
    ) {
      localStorage.setItem("userName", users[i].Id);
      window.location.href = "./home.html";
      // signInPassword.nextElementSibling.classList.replace("d-block", "d-none");
    }
    else {
      signInPassword.nextElementSibling.classList.replace("d-none", "d-block");
    }
  }
}
function validateInputs(inputs) {
  var regex = {
    signUpName: /^[A-Z][a-z]{3,10}$/,
    signUpEmail: /^.{4,20}@.{3,7}(\.)com$/,
    signUpPassword: /^.{5,20}$/,
  };
  if (regex[inputs.id].test(inputs.value) == true) {
    inputs.classList.add("is-valid");
    inputs.classList.remove("is-invalid");
    inputs.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    inputs.classList.add("is-invalid");
    inputs.classList.remove("is-valid");
    inputs.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
function emailExists() {
  for(var i = 0; i < users.length; i++){
    if(users[i].Email == signUpEmail.value){
        return true;
    }else{
        return false;
    }
}
}
