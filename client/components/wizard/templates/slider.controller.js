angular.module('leukemiapp').controller('sliderController', sliderController);

function sliderController($scope, $reactive, WizardHandler) {
   $reactive(this).attach($scope);
   var vm = this;

   var dataType = Session.get('registrationType');
   var stepNumber = WizardHandler.wizard().currentStepNumber();

   var step = {};
   var config = {};

   for (i = 0; i < Modules.length; i++) {
      if (Modules[i].name === dataType) {

         if (Modules[i].wizard.steps[stepNumber - 2] !== undefined) {
            step = Modules[i].wizard.steps[stepNumber - 2];

            if (step.stepTemplate.config !== undefined) {
               config = step.stepTemplate.config;
               console.log('Config defined as ',config);
            } else {
               console.error('No config defined for module ', dataType, ' step number ', stepNumber);
            }
         } else {
            console.error('Step undefined for module ', dataType, ' step number ', stepNumber);
         }
         break;
      }
   }

   vm.validateConfig = () => {
      console.log('validateConfig called, config is ', config);

      return (config.propertyName !== undefined &&
      typeof config.propertyName === 'string' &&
      config.question !== undefined &&
      typeof config.question === 'string' &&
      config.minValue !== undefined &&
      config.maxValue !== undefined &&
      config.step !== undefined)
   };

   vm.registration = Session.get('registration');

   function updateRegistration() {
      vm.registration[config.propertyName] = vm.slider.value;
      updateSessionVariables();
   }

   vm.question = config.question;
   console.log("config is ", config);
   console.log("vm.question is " + vm.question);

   vm.slider = {
      value: 0,
      options: {
         floor: config.minValue,
         ceil: config.maxValue,
         step: config.step,
         precision: (config.step % 1 == 0) ? 0 : 1, //decimal precision, 1 if step is a decimal
         hideLimitLabels: true,
         onEnd: updateRegistration
      }
   };
   console.log('vm.slider is ', vm.slider);

   function updateSessionVariables() {
      var validated = Session.get('regValidated');
      if (validated != null) {

         validated[stepNumber - 1] = step.validation(vm.registration);
         Session.set('regValidated', validated);
         console.log('regValidated session variable updated: ', validated);

         Session.set('registration', vm.registration);
         console.log('Registration updated: ', vm.registration);
      }
   }
}