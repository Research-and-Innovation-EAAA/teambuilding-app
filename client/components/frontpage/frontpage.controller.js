angular.module('leukemiapp').controller('frontpageController', FrontpageController);

function FrontpageController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });
}

