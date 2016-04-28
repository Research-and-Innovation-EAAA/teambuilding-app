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

   vm.subscribe('moduleData', () => [Modules[3].name]);

   vm.helpers({
      latestMucositisRegistration: () => {
         //var selectedDate = Session.get('selectedDate');
         return Registrations.findOne(
            {
               moduleName: Modules[3].name
            }, {
               sort: {
                  timestamp: -1,
                  createdAt: -1
               }
            });
      }
   });
   console.log(vm.latestMucositisRegistration);

   vm.newRegistration = () => {
      Session.set('registrationType', 'Mucositis');
      $location.path("questionwizard");
   };

   vm.showGraphData = () => {
      Session.set('graphDataType', 'Mucositis');
      $location.path("graphdata")
   };

   if (Modules[3].frontPageProperties === undefined) {
      if (Modules[3].frontPageFunction !== undefined) {
         vm["row"] = (rowNumber) => {
            var registration = vm.latestMucositisRegistration;
            return Modules[3].frontPageFunction(registration,rowNumber);
         }
      }
   }

   //vm.diagnosis = (number) => {
   //   var message = 'Ingen data';
   //   var registration = vm.latestMucositisRegistration;
   //   if (registration === undefined)
   //      return message;
   //
   //   var diagnosis;
   //   switch (number) {
   //      case 0:
   //         diagnosis = registration.diagnosis[number];
   //         if (diagnosis === 0) {
   //            message = "Ingen smerter"
   //         }
   //         else if (diagnosis === 1) {
   //            message = "Lette smerter"
   //         }
   //         else if (diagnosis === 2) {
   //            message = "Moderate smerter"
   //         }
   //         else if (diagnosis === 3) {
   //            message = "Kraftige smerter"
   //         }
   //         else if (diagnosis === 4) {
   //            message = "Uudholdlige smerter"
   //         }
   //         break;
   //      case 1:
   //         diagnosis = registration.diagnosis[number];
   //         if (diagnosis === 0) {
   //            message = "Ingen sår"
   //         }
   //         else if (diagnosis === 1) {
   //            message = "Ingen sår, let rødmen"
   //         }
   //         else if (diagnosis === 2) {
   //            message = "Enkelte mindre sår"
   //         }
   //         else if (diagnosis === 3) {
   //            message = "Mange sår"
   //         }
   //         else if (diagnosis === 4) {
   //            message = "Udtalt rødmen + mange store sår"
   //         }
   //         break;
   //      case 2:
   //         diagnosis = registration.diagnosis[number];
   //         if (diagnosis === 0) {
   //            message = "Ingen påvirkning"
   //         }
   //         else if (diagnosis === 1) {
   //            message = "Spiser næsten normalt"
   //         }
   //         else if (diagnosis === 2) {
   //            message = "Spiser lidt fast føde"
   //         }
   //         else if (diagnosis === 3) {
   //            message = "Spiser flydende føde"
   //         }
   //         else if (diagnosis === 4) {
   //            message = "Behov for sondemad"
   //         }
   //         break;
   //   }
   //   return message;
   //}
}


