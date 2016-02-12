angular.module('leukemiapp').directive('questionWizard', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/wizard/question-wizard.html',
      controllerAs: 'qwiz',
      controller: QuestionWizardController
   }
});

function QuestionWizardController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.modules = {
      "Mucositis": {
         "Mundsår": "client/components/wizard/mucositis/qw-mucositis-01.html",
         "Kvalme": "client/components/wizard/mucositis/qw-mucositis-02.html"
      }
   };

   vm.dataType = "Mucositis";
   vm.steps = Object.keys(vm.modules[vm.dataType]);
   vm.stepNumber = 0; //First template
   vm.stepName = "";

   console.log(vm.steps);
   console.log(vm.modules[vm.dataType]);
   console.log(vm.modules[vm.dataType][vm.stepNumber]);
   console.log(vm.getReactively(vm.stepName));

   //$scope.hideIndicators = Object.keys($scope.questions[$scope.dataType]).length <= 1;

}