angular.module('leukemiapp').directive('bloodsampleCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/bloodsample/bloodsample-card.html',
      controllerAs: 'bloodcard',
      controller: BloodsampleCardController
   }
});

function BloodsampleCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('bloodsampleData');

   vm.helpers({
      latestBloodsampleRegistration: () => {
         //var selectedDate = Session.get('selectedDate');
         return Bloodsample.findOne(
            {
               //timestamp: {$lt: moment(selectedDate).toDate()}
            }, {
               sort: {
                  timestamp: -1,
                  createdAt: -1
               }
            });
      }
   });
   console.log(vm.latestBloodsampleRegistration);

   vm.newRegistration = () => {
      Session.set('registrationType', 'Bloodsample');
      $location.path("questionwizard");
   };

   vm.alat = () => {
      var registration = vm.latestBloodsampleRegistration;
      if (registration !== undefined)
         return registration.Alat;
      else return ' - ';
   };

   vm.hemoglobin = () => {
      var registration = vm.latestBloodsampleRegistration;
      if (registration !== undefined)
         return registration.Hemoglobin;
      else return ' - ';
   };

   vm.thrombocytter = () => {
      var registration = vm.latestBloodsampleRegistration;
      if (registration !== undefined)
         return registration.Thrombocytter;
      else return ' - ';
   }
}