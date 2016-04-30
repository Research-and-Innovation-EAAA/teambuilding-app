angular.module('leukemiapp').controller('frontpageController', FrontpageController);

function FrontpageController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.activeModules = Modules;

   console.log('activeModules are: ', vm.activeModules);

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });
}

