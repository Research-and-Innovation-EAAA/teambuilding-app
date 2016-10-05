angular.module('leukemiapp').controller('bloodsampleController', BloodsampleController);

function BloodsampleController($scope, $reactive, WizardState, WizardStateAccessor) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.dataType = Session.get('registrationType');
   WizardState[vm.dataType] = WizardStateAccessor.getRegistration(vm.dataType);
   vm.registration = WizardState[vm.dataType];


   var module = Modules[1];

   //Init
   function initData() {
      if (vm.registration.leukocytes == undefined)
         vm.registration.leukocytes = NaN;
      if (vm.registration.neutrophiles == undefined)
         vm.registration.neutrophiles = NaN;
      if (vm.registration.thrombocytes == undefined)
         vm.registration.thrombocytes = NaN;
      if (vm.registration.hemoglobin == undefined)
         vm.registration.hemoglobin = NaN;
      if (vm.registration.alat == undefined)
         vm.registration.alat = NaN;
      if (vm.registration.crp == undefined)
         vm.registration.crp = NaN;

      WizardStateAccessor.registerValidateFunction(vm.dataType, validateData);
      /* if (vm.registration._validate == undefined)
         vm.registration._validate = validateData; */

      validateData();
      vm.init = true;
   }

   $scope.$on('stepLoaded', (event, data) => {
      if (data['dataType'] === Session.get('registrationType')) {
         console.log(data['dataType'], 'step loaded! Step number:', data['stepNumber']);

         if (data['stepNumber'] == 1 && !vm.init) {
            initData();
         }
      }
   });

   function validateData(registration, from, to) {
      var invalid = true;
      var start = (typeof from=="number"&&from>=0)?from:0;
      var end = (typeof to=="number" && to<=module.wizard.steps.length)?to:module.wizard.steps.length-1;

      if (registration) {
         for (i=start; i<=end; i++) {
            invalid = invalid && !module.wizard.steps[i].validation(registration);
         }
      }

      return !invalid;
   }

   if (!vm.init) {
      initData();
   }
}