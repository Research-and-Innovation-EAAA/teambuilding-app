angular.module('leukemiapp').directive('painCard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/pain/pain-card.html',
      controllerAs: 'paincard',
      controller: PainCardController
   }
});

function PainCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('moduleData', () => [Modules[2].name]);

   vm.helpers({
      latestPainRegistration: () => {
         //var selectedDate = Session.get('selectedDate');
         return Registrations.findOne(
            {
               moduleName: Modules[2].name
            }, {
               sort: {
                  timestamp: -1,
                  createdAt: -1
               }
         });
      }
   });
   console.log(vm.latestPainRegistration);

   vm.newRegistration = () => {
      Session.set('registrationType', 'Pain');
      $location.path("questionwizard");
   };

   vm.showGraphData = () => {
      Session.set('graphDataType', 'Pain');
      $location.path("graphdata");
   };

   if (Modules[2].frontPageProperties === undefined) {
      if (Modules[2].frontPageFunction !== undefined) {
         vm["row"] = (rowNumber) => {
            var registration = vm.latestPainRegistration;
            return Modules[2].frontPageFunction(registration,rowNumber);
         }
      }
   }

   //vm.painType = () => {
   //   var registration = vm.latestPainRegistration;
   //   var message = 'Ingen data';
   //   if (registration !== undefined) {
   //      message = registration.painType;
   //      message = message.charAt(0).toUpperCase() + message.slice(1);
   //   }
   //   return message;
   //};
   //
   //vm.painScore = () => {
   //   var registration = vm.latestPainRegistration;
   //   var message = 'Ingen data';
   //   if (registration !== undefined)
   //      message = registration.painScore;
   //   return message;
   //};
   //
   //vm.morphineDose = () => {
   //   var registration = vm.latestPainRegistration;
   //   var message = 'Ingen data';
   //   if (registration !== undefined) {
   //      if (registration.morphineDose !== undefined && registration.morphineDose > 0)
   //         message = registration.morphineDose;
   //      else
   //         message = 'Ingen morfin';
   //   }
   //   return message;
   //};
   //
   //vm.morphineMeasureUnit = () => {
   //   var registration = vm.latestPainRegistration;
   //   var message = '';
   //   if (registration !== undefined) {
   //      if (registration.morphineMeasureUnit !== undefined)
   //         message = registration.morphineMeasureUnit;
   //   }
   //   return message;
   //}
}