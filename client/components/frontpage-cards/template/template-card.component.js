angular.module('leukemiapp').directive('templateCard', function () {
   return {
      scope: {
         moduleName: "@"
      },
      restrict: 'E',
      templateUrl: 'client/components/frontpage-cards/template/template-card.html',
      controllerAs: 'vm',
      controller: TemplateCardController
   }
});

function TemplateCardController($scope, $reactive, $location) {
   $reactive(this).attach($scope);
   var vm = this;

   var module = {};

   for (moduleIndex = 0; moduleIndex < Modules.length; moduleIndex++) {
      if (Modules[moduleIndex].name === $scope.moduleName) {
         module = Modules[moduleIndex];
      }
   }

   console.log('moduleName for template is ', $scope.moduleName);

   vm.subscribe('moduleData', () => [module.name]);

   vm.helpers({
      latestRegistration: () => {
         return Registrations.findOne({
            moduleName: module.name
         });
      }
   });

   vm.moduleTitle = module.name;

   vm.newRegistration = () => {
      Session.set('registrationType', module.name);
      $location.path("app/questionwizard");
   };

   vm.showGraphData = () => {
      Session.set('graphDataType', module.name);
      $location.path("app/graphdata")
   };

   if (module.frontPage !== undefined) {
      vm.iconUrl = module.frontPage.iconUrl;
      vm.barClass = module.frontPage.barClass;

      vm.rowProperty = (rowNumber) => {
         var registration = vm.latestRegistration;
         if (module.frontPage.properties !== undefined) {
            if (rowNumber >= module.frontPage.properties.length)
               return "";

            var propertyName = module.frontPage.properties[rowNumber];
            if (registration !== undefined && registration[propertyName] != null)
               return registration[propertyName];
            else return ' - ';
         } else if (module.frontPage.propertyFunction !== undefined) {
            return module.frontPage.propertyFunction(registration, rowNumber);
         } else return "";
      };

      vm.rowDescription = (rowNumber) => {
         if (module.frontPage.propertyDescription !== undefined) {
            if (rowNumber >= module.frontPage.propertyDescription.length)
               return "";

            return module.frontPage.propertyDescription[rowNumber];
         } else return "";
      };

      vm.rowMeasurement = (rowNumber) => {
         if (module.frontPage.propertyMeasurement !== undefined) {
            if (rowNumber >= module.frontPage.propertyMeasurement.length)
               return "";

            return module.frontPage.propertyMeasurement[rowNumber];
         } else return "";
      };
   }

}