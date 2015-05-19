var FIREBASE_URL = 'https://best-auth-demo.firebaseio.com/';
var fb = new Firebase('https://best-auth-demo.firebaseio.com/?page=Auth');
var content = $(".onLoggedIn");
var onLogOut = $(".onLoggedOut");
var logInForm = $(".login");
var logoutButton = $(".onLoggedIn button");
var registerButton = $(".login button");
var registrationForm = $(".register");
var backToLoginForm = $(".register button")
var registerSubmit = $(".register form input[type=submit]")
var actualRegistrationForm = $(".register form")

actualRegistrationForm.submit(function () {
  event.preventDefault();
  var email = $(".register form input[type='email']")
  var password = $(".register form input[type='password']:nth-child(3)")
  var password2 = $(".register form input[type='password']:nth-child(4)")
  fb.createUser(
    {email: email.val(), password: password.val()}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
     });
  email.val('');
  password.val('');
  password2.val('');

})


registerButton.click(function () {
     toggleRegisterLogin();
});

backToLoginForm.click(function () {
  toggleRegisterLogin();
})

logoutButton.click(function () {
  fb.unauth();
  toggleContentBasedOnLogin();
})

toggleContentBasedOnLogin();

var form = document.querySelector('form');
logInForm.submit(function () {
  var email = $('input[type="email"]');
  var psswrd = $('input[type="password"]');
  fb.authWithPassword({email: email.val(), password: psswrd.val()}, function (err, authData) {
    if (err) {alert("You suck! That password was wrong!")}
    else {
      toggleContentBasedOnLogin();
      email.val('');
      psswrd.val('');
      var h1 = $('.onLoggedIn h1').text(`Hello ${authData.password.email}!`)
      $.ajax({
        method: 'PUT',
        url: FIREBASE_URL + /users/ + authData.uid + "/profile.json",
        data: JSON.stringify(authData),
        success: function () {
          console.log('It works!');
        }
      });
    }
               })
  event.preventDefault();
  });

function toggleContentBasedOnLogin () {
  if (fb.getAuth()) {
    content.removeClass('hidden');
    onLogOut.addClass('hidden');
  } else {
    content.addClass('hidden');
    onLogOut.removeClass('hidden');
    logInForm.removeClass('hidden');
  }
};

function toggleRegisterLogin () {
  logInForm.toggleClass("hidden");
  registrationForm.toggleClass("hidden");
}




