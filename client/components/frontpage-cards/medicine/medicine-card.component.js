angular.module('leukemiapp').directive('medicineCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/medicine/medicine-card.html',
      controllerAs: 'medcard',
      controller: MedicineCardController
   }
});

function MedicineCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('moduleData', () => [Modules[0].name]);

   vm.helpers({
      latestMedicineRegistration: () => {
         //var selectedDate = Session.get('selectedDate');
         return Registrations.findOne(
            {
               moduleName: Modules[0].name
            }, {
               sort: {
                  timestamp: -1,
                  createdAt: -1
               }
            });
      }
   });

   vm.newRegistration = () => {
      Session.set('registrationType', 'Medicine');
      $location.path("questionwizard");
   };

   vm.showGraphData = () => {
      Session.set('graphDataType', 'Medicine');
      $location.path("graphdata")
   };

   //Get properties
   //http://stackoverflow.com/questions/25638834/mutable-variable-is-accessible-from-closure

   for (i = 0; i < Modules[0].frontPageProperties.length; i++) {
      (function(){
         var propertyName = Modules[0].frontPageProperties[i];
         vm["row" + i] = () => {
            var registration = vm.latestMedicineRegistration;
            if (registration !== undefined && registration[propertyName] != null)
               return registration[propertyName];
            else return ' - ';
         }
      })();
   }
}