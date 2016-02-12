angular.module('leukemiapp').directive('reminders', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/reminders/reminders.html',
      controllerAs: 'reminders',
      controller: RemindersController
   }
});

function RemindersController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

}