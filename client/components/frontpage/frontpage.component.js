angular.module('leukemiapp').directive('frontpage', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage/frontpage.html',
      controllerAs: 'frontpage',
      controller: FrontpageController
   }
});

function FrontpageController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });
}

