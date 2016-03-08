angular.module('leukemiapp').controller('questionWizardController', QuestionWizardController);

function QuestionWizardController($scope, $reactive, $ionicPopup, $ionicScrollDelegate, $translate, WizardHandler) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.modules = {
      "Medicine": {
         "Tid": "client/components/wizard/timestamp/qw-timestamp.html",
         "Medicin": "client/components/wizard/medicine/qw-medicine-01.html"
      },
      "Bloodsample": {
         "Tid": "client/components/wizard/timestamp/qw-timestamp.html",
         "Blodprøve": "client/components/wizard/bloodsample/qw-bloodsample-01.html"
      },
      "Pain": {
         "Tid": "client/components/wizard/timestamp/qw-timestamp.html",
         "Morfin": "client/components/wizard/pain/qw-pain-01.html",
         "Type": "client/components/wizard/pain/qw-pain-02.html",
         "Styrke": "client/components/wizard/pain/qw-pain-03.html"
      },
      "Mucositis": {
         "Tid": "client/components/wizard/timestamp/qw-timestamp.html",
         "Mundsår": "client/components/wizard/mucositis/qw-mucositis-01.html",
         "Kvalme": "client/components/wizard/mucositis/qw-mucositis-02.html"
      }
   };

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