angular.module('leukemiapp').controller('painController', PainController);

function PainController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   //Init
   vm.registration = Session.get('registration');

   if (vm.registration.flaccvalue === undefined) {
      vm.registration.flaccvalue = [undefined, undefined, undefined];
   }
   vm.show = true;

   vm.updateRegistration = () => {
      if (vm.registration.morphineType !== undefined || vm.registration.morphineDose > 0) {
         if (vm.registration.morphineType == 'oral') {
            vm.registration.morphineMeasureUnit = 'mg/dag';
         }
      }

      Session.set('registration', vm.registration);
      console.log('Registration updated');
      console.log(vm.registration);
   };

   vm.selectPainType = (value) => {
      vm.registration.painType = value;
      vm.updateRegistration();
   };

   //flacc selection
   vm.selectFlacc = function (flaccnumber, newvalue) {
      if (vm.registration.flaccvalue[flaccnumber] !== undefined) {
         vm.registration.painScore -= vm.registration.flaccvalue[flaccnumber];
      }
      vm.registration.flaccvalue[flaccnumber] = newvalue;
      vm.registration.painScore += newvalue;
      vm.updateRegistration();
   };

   vm.changeScale = () => {
      vm.show = !vm.show;
      vm.registration.painScore = 0;
      vm.selectedSmiley = undefined;
      vm.registration.flaccvalue = [undefined, undefined, undefined];
      vm.smileyDescription = "";
   };

   //smiley selection
   vm.selectedSmiley = undefined;
   vm.smileyDescription = "";

   vm.selectSmiley = (smileynumber) => {
      vm.selectedSmiley = smileynumber;
      vm.registration.painScore = smileynumber;
      switch (smileynumber) {
         case 0:
            vm.smileyDescription = "Man kan gøre fuldstændig, som man plejer uden at tænke på, at det gør ondt.";
            break;
         case 2:
            vm.smileyDescription = "Man kan gøre, som man plejer, men af og til må man standse op, fordi det gør ondt.";
            break;
         case 4:
            vm.smileyDescription = "Man har mest lyst til at sidde stille og få læst en historie eller se fjernsyn, fordi det gør ondt.";
            break;
         case 6:
            vm.smileyDescription = "Man tænker på, at det gør ondt hele tiden.";
            break;
         case 8:
            vm.smileyDescription = "Man har så ondt, at man har lyst til at græde, fordi det gør ondt.";
            break;
         case 10:
            vm.smileyDescription = "Man har så ondt, at man slet ikke kan holde det ud."
            break;
         default:
            vm.smileyDescription = "";
      }
      vm.updateRegistration();
   };
}