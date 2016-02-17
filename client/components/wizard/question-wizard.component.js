angular.module('leukemiapp').directive('questionWizard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/wizard/question-wizard.html',
      controllerAs: 'qwiz',
      controller: QuestionWizardController
   }
});

function QuestionWizardController($scope, $reactive, $ionicPopup) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.modules = {
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

   vm.finishWizard = function () {

      //TODO: validation

      var registration = Session.get('registration');

      switch (vm.dataType) {
         case 'Mucositis':
            Mucositis.insert(registration);
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