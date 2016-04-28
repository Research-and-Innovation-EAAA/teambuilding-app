angular.module('leukemiapp').controller('questionWizardController', QuestionWizardController);

function QuestionWizardController($scope, $reactive, $ionicPopup, $ionicScrollDelegate, $translate, WizardHandler) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.modules = {};

   for (moduleNumber = 0; moduleNumber < Modules.length; moduleNumber++) {
      var moduleSteps = {};
      moduleSteps["Tid"] = "client/components/wizard/timestamp/qw-timestamp.html";

      for (stepNumber = 0; stepNumber < Modules[moduleNumber].steps.length; stepNumber++) {
         var stepName = Modules[moduleNumber].steps[stepNumber].stepName;
         var stepTemplate = Modules[moduleNumber].steps[stepNumber].stepTemplate;

         moduleSteps[stepName] = stepTemplate;
   }

      vm.modules[Modules[moduleNumber].name] = moduleSteps;
   }
   console.log("vm.modules after loop is finished: ", vm.modules);


   vm.dataType = Session.get('registrationType');
   vm.viewTitle = $translate.instant(vm.dataType);
   vm.steps = Object.keys(vm.modules[vm.dataType]);
   vm.stepNumber = 0; //First template
   vm.stepName = "";

   vm.helpers({
      isLoggedIn: () => {
         return Meteor.userId() !== null;
      }
   });

   vm.validateData = () => {
      var validated = Session.get('regValidated');
      var stepNumber = WizardHandler.wizard().currentStepNumber();

      console.log('wizardController validateData: ', validated[stepNumber - 1]);
      console.log('stepNumber: ', stepNumber);

      if (!validated[stepNumber - 1] && vm.errorPopup === undefined) {
         vm.errorPopup = $ionicPopup.alert({
            title: 'Error',
            content: 'Et eller flere felter er enten ikke udfyldt, eller ikke udfyldt korrekt!'
         }).then(function (res) {
            vm.errorPopup = undefined;
         });
      }

      return validated[stepNumber - 1];
   };

   vm.finishWizard = function () {
      if (vm.validateData()) {
         var registration = Session.get('registration');

         Meteor.call('addRegistration', registration, vm.dataType, (error, result) => {
            if (error) {
               saveError();
            } else {
               saveOk();
            }
         });
      }
   };

   function saveOk() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Registrering gemt!'
      });
      Session.set('registration', undefined);
      Session.set('regValidated', undefined);
   }

   function saveError() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Failed to save registration'
      });
   }

   $scope.$watch(
      function steps() {
         return vm.stepNumber;
      },
      function (newValue, oldValue) {
         if (newValue != oldValue) {
            $ionicScrollDelegate.scrollTop();
         }
      }
   );

   //$scope.hideIndicators = Object.keys($scope.questions[$scope.dataType]).length <= 1;

}