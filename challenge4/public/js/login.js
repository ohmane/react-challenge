/*
 * This file should contain code for the following tasks:
 * 1. Create a new account.
 * 2. Sign in an existing account.
 * 3. Redirect a user to chat.html once they are logged in/signed up.
 */
// Store our DOM elements
var loginForm = document.getElementById("login-form");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginButton = document.getElementById("login-button");

var signedup = false;

// When the user logs in, send the email and password to firebase.
// Firebase will determine whether or not the user logged in correctly.
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = loginEmail.value;
    var password = loginPassword.value;

    // If the login was successful, the .then callback will be called.
    // Otherwise, the .catch callback will be called,
    // with an error object containing the error message.
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      console.log("Logged in successfully!");
    })
    .catch(function(error) {
      console.log(error.message);
    });
});

var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-email");
var signupPassword = document.getElementById("signup-password");
var signupPasswordConfirm = document.getElementById("signup-password-confirm");
var signupError = document.getElementById("signup-error");

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    signupError.classList.remove('active');

    var displayName = signupName.value;
    var email = signupEmail.value;
    var password = signupPassword.value;
    var passwordConfirm = signupPasswordConfirm.value;
    var photoURL2 = "https://www.gravatar.com/avatar/" + md5(email);
    

    console.log(displayName);
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);

    if (password !== passwordConfirm) {
        signupError.textContent = 'Passwords do not match.';
        signupError.classList.add('active');
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            signedup = true;
        })

        .catch(function (error) {
            signupError.textContent = error.message;
            signupError.classList.add('active');
        });
    }
});

// This callback is called whenever the user's logged in state changes,
// e.g. when the page first loads, when a user logs in, when a user logs out.
firebase.auth().onAuthStateChanged(function(user) {
  // If the user parameter is truthy,
  // the user is logged in.
  if (user) {
      console.log("signed in");
    if (signedup) {
        // Update their display name and profile picture
         user.updateProfile({
            displayName: signupName.value,
            photoURL: "https://www.gravatar.com/avatar/" + md5(signupEmail.value)
         })
         .then(function() {             
            // Send verification email
            return user.sendEmailVerification(); 
         })
         .then(function() {            
            console.log(user);
            window.location.href = "chat.html";
         })

    }else {
        window.location.href = "chat.html";
    }
  } else {
    // Otherwise, they have not signed in.
    console.log("signed out");
  }
});
