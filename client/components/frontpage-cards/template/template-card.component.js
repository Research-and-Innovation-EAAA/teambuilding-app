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

function TemplateCardController($scope, $reactive, $location, $timeout, $ionicScrollDelegate) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.module = {};

   var subHandle = vm.subscribe('moduleData', () => [vm.module.name]);

   vm.helpers({
      latestRegistration: () => {
         return Registrations.findOne({
            moduleName: vm.getReactively('module.name')
         });
      }
   });

   //Find module from name
   function getModuleFromName() {
      for (moduleIndex = 0; moduleIndex < Modules.length; moduleIndex++) {
         if (Modules[moduleIndex].name === $scope.moduleName) {

            vm.module = Modules[moduleIndex];
            vm.moduleTitle = vm.module.name;

            subHandle = vm.subscribe('moduleData', () => [vm.module.name]);

            if (vm.module.frontPage !== undefined) {
               vm.iconStyle = {
                  content: 'url('+ vm.module.frontPage.iconUrl + ')'
               };
               vm.barClass = vm.module.frontPage.barClass;

               vm.rowProperty = (rowNumber) => {
                  var registration = vm.latestRegistration;
                  if (vm.module.frontPage.properties !== undefined) {
                     if (rowNumber >= vm.module.frontPage.properties.length)
                        return "";

                     var propertyName = vm.module.frontPage.properties[rowNumber];
                     if (registration !== undefined && registration[propertyName] != null)
                        return registration[propertyName];
                     else return ' - ';
                  } else if (vm.module.frontPage.propertyFunction !== undefined) {
                     return vm.module.frontPage.propertyFunction(registration, rowNumber);
                  } else return "";
               };

               vm.rowDescription = (rowNumber) => {
                  if (vm.module.frontPage.propertyDescription !== undefined) {
                     if (rowNumber >= vm.module.frontPage.propertyDescription.length)
                        return "";

                     return vm.module.frontPage.propertyDescription[rowNumber];
                  } else return "";
               };

               vm.rowMeasurement = (rowNumber) => {
                  if (vm.module.frontPage.propertyMeasurement !== undefined) {
                     if (rowNumber >= vm.module.frontPage.propertyMeasurement.length)
                        return "";

                     return vm.module.frontPage.propertyMeasurement[rowNumber];
                  } else return "";
               };
            }
         }
      }
      console.log('getModuleFromName() called! module is',vm.module);
      console.log('vm.moduleTitle is ',vm.moduleTitle);
   }

   vm.newRegistration = () => {
      Session.set('registrationType', vm.module.name);
      $location.path("app/questionwizard");
   };

   vm.showGraphData = () => {
      Session.set('graphDataType', vm.module.name);
      $location.path("app/graphdata")
   };

   $scope.$watch(
      function () {
         return $scope.moduleName;
      },
      function (newValue, oldValue) {
         if (newValue != oldValue) {
            console.log('Module name changed for component from ', oldValue,' to ',newValue);
            getModuleFromName();
         }
      }
   );

   Tracker.autorun(function () {
      //TODO: Add loading indicator which finishes when sub is ready
      if (subHandle != null && subHandle.ready()) {
         console.log('Subscription ready on card!');
         getModuleFromName();
      }
   });
}