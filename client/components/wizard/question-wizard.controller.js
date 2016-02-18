angular.module('leukemiapp').controller('questionWizardController', QuestionWizardController);

function QuestionWizardController($scope, $reactive, $meteor, $ionicPopup, $location) {
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
      "Mucositis": {
         "Tid": "client/components/wizard/timestamp/qw-timestamp.html",
         "Mundsår": "client/components/wizard/mucositis/qw-mucositis-01.html",
         "Kvalme": "client/components/wizard/mucositis/qw-mucositis-02.html"
      }
   };

   vm.dataType = Session.get('registrationType');
   vm.steps = Object.keys(vm.modules[vm.dataType]);
   vm.stepNumber = 0; //First template
   vm.stepName = "";

   vm.helpers({
      isLoggedIn: () => {
         return Meteor.userId() !== null;
      }
   });

   vm.finishWizard = function () {

      //TODO: validation

      var registration = Session.get('registration');

      switch (vm.dataType) {
         case 'Mucositis':
            Meteor.call('addMucositisRegistration', registration);
            saveOk();
            break;
         case 'Medicine':
            Meteor.call('addMedicineRegistration', registration);
            saveOk();
            break;
         case 'Bloodsample':
            Meteor.call('addBloodsampleRegistration', registration);
            saveOk();
            break;
         default:
            saveError();
      }
   };

   function saveOk() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Registrering gemt!'
      }).then(function (res) {
         setTimeout(vm.$ionicGoBack);
      });
      Session.set('registration', undefined);
   }

   function saveError() {
      $ionicPopup.alert({
         title: vm.dataType,
         content: 'Failed to save registration'
      }).then(function (res) {
         setTimeout(vm.$ionicGoBack);
      });
   }

   //$scope.hideIndicators = Object.keys($scope.questions[$scope.dataType]).length <= 1;

}