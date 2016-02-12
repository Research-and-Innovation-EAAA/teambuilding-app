angular.module('leukemiapp').directive('mucositisCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/mucositis/mucositis-card.html',
      controllerAs: 'mucositiscard',
      controller: MucositisCardController
   }
});

function MucositisCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.newRegistration = () => {
      $location.path("questionwizard");
   }
}


