angular.module('leukemiapp')
    .filter('nameFromEmail', function () {
        return function (input) {
            var email = input || '';
            return email.substring(0, email.indexOf("@"));
        }
    });