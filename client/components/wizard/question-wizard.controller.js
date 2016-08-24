angular.module('leukemiapp').controller('questionWizardController', QuestionWizardController);

function QuestionWizardController($scope, $reactive, $ionicPopup, $ionicScrollDelegate, $translate, $rootScope, WizardHandler) {
   $reactive(this).attach($scope);
   var vm = this;

   // ** Data structure **
   // vm.modules = {
   //   moduleName: {
   //      stepName: stepTemplate || stepTemplate.url;
   //      ...
   //   }
   //   ...
   //}
   vm.modules = {};

   for (moduleNumber = 0; moduleNumber < Modules.length; moduleNumber++) {
      var moduleSteps = {};
      moduleSteps["Tid"] = "client/components/wizard/timestamp/qw-timestamp.html";

      var module = Modules[moduleNumber];

      for (stepNumber = 0; stepNumber < module.wizard.steps.length; stepNumber++) {
         var stepName = module.wizard.steps[stepNumber].stepName;
         var stepTemplate = module.wizard.steps[stepNumber].stepTemplate;

         if (stepTemplate.url !== undefined) {
            stepTemplate = stepTemplate.url;
         }

         moduleSteps[stepName] = stepTemplate;
      }

      vm.modules[module.name] = moduleSteps;
   }

   vm.dataType = Session.get('registrationType');
   vm.viewTitle = $translate.instant(vm.dataType);
   vm.steps = Object.keys(vm.modules[vm.dataType]);
   vm.stepNumber = 0; //First template, goes from 0 .. x
   vm.stepName = "";

   vm.helpers({
      isLoggedIn: () => {
         return Meteor.userId() !== null;
      }
   });

   //Check if registration is newly created or updated
   $scope.$on('$ionicView.enter', () => {
      $ionicScrollDelegate.$getByHandle('wizardStepContent').freezeScroll(false);

      var registration = Session.get('registration');
      if (registration != null && registration.updating) {

         var validated = Session.get('regValidated');
         if (validated == null) {
            validated = [];
            validated[0] = true;
         }
         Session.set('regValidated', validated);

         //Skips timestamp registration
         vm.stepNumber = 1;
         WizardHandler.wizard().goTo(vm.stepNumber);
      }
   });

   vm.validateData = () => {
      var validated = Session.get('regValidated');
      //goes from 1 .. x
      var stepNumber = WizardHandler.wizard().currentStepNumber();

      if (!validated[stepNumber - 1] && vm.errorPopup === undefined) {

         if (stepNumber == 1) {
            vm.errorPopup = $ionicPopup.confirm({
               title: 'Update registration',
               template: 'There already exists a registration with that timestamp! Do you wish to update it?'
            }).then((res) => {
               if (res) {
                  //update initiated
                  validated[0] = true;
                  Session.set('regValidated', validated);
                  WizardHandler.wizard().next();
                  vm.stepNumber = vm.stepNumber + 1;
                  vm.errorPopup = undefined;
               } else {
                  //update cancelled
                  vm.errorPopup = undefined;
               }
            });
         } else {
            vm.errorPopup = $ionicPopup.alert({
               title: 'Error',
               template: 'Et eller flere felter er enten ikke udfyldt, eller ikke udfyldt korrekt!'
            }).then(function (res) {
               vm.errorPopup = undefined;
            });
         }
      }

      return validated[stepNumber - 1];
   };

   vm.finishButtonText = () => {
      var registration = Session.get('registration');
      if (registration != null)
         return registration.updating ? 'Opdater' : 'Gem';
      else
         return '';
   };

   vm.finishWizard = function () {
      if (vm.validateData()) {
         var registration = Session.get('registration');

         console.log('vm.finishWizard is called!');
         for (var property in registration) {
            if (registration.hasOwnProperty(property)) {
               if (registration[property] == null) {
                  registration[property] = '-';
               }
            }
         }

         if (registration.updating) {
            registration.updating = undefined;
            Meteor.call('updateRegistration', registration, (error, result) => {
               if (error) {
                  saveError();
               } else {
                  updateOk();
               }
            });
         } else {
            Meteor.call('addRegistration', registration, vm.dataType, (error, result) => {
               if (error) {
                  saveError();
               } else {
                  saveOk();
               }
            });
         }

      }
   };

   vm.cancelRegistration = () => {
      Session.set('registration', undefined);
      Session.set('regValidated', undefined);
      $rootScope.$ionicGoBack();
   };

   vm.stepLoaded = () => {
      $scope.$broadcast('stepLoaded', {
         dataType: vm.dataType,
         stepNumber: vm.stepNumber
      });
   };

   function saveOk() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Registrering gemt!'
      });
      Session.set('registration', undefined);
      Session.set('regValidated', undefined);

      var analyticsSettings = Settings.findOne({key: 'analytics'});
      if (!!analyticsSettings.value) {
         analytics.track("Registration Completed " + vm.dataType, {
            type: vm.dataType
         });
      }
   }

   function saveError() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Failed to save registration'
      });
   }

   function updateOk() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Registrering opdateret!'
      });
      Session.set('registration', undefined);
      Session.set('regValidated', undefined);

      var analyticsSettings = Settings.findOne({key: 'analytics'});
      if (!!analyticsSettings.value) {
         analytics.track("Registration Updated " + vm.dataType, {
            type: vm.dataType
         });
      }
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