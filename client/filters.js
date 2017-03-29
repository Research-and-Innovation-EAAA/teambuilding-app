angular.module('leukemiapp')
    .filter('nameFromEmail', function () {
        return function (input) {
            var email = input || '';

            console.log("input is: " + email);
            console.log(email);
            console.log("input was: " + input);
            return email.substring(0, email.indexOf("@"));
        }
    });