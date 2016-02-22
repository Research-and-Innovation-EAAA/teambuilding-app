angular.module('leukemiapp').controller('timestampController', TimestampController);

function TimestampController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   if (vm.timePickerObj === undefined)
      vm.timePickerObj = {
         displayValue: function () {
            return formatTime(vm.timePickerObj.inputEpochTime);
         },
         inputEpochTime: (new Date().getHours() * 60 * 60 + Math.floor(new Date().getMinutes() / 5) * 5 * 60),  //Optional
         step: 5,  //Optional
         format: 24,  //Optional
         titleLabel: 'Tidspunkt',  //Optional
         setLabel: 'Vælg',  //Optional
         closeLabel: 'Luk',  //Optional
         setButtonType: 'button-positive',  //Optional
         closeButtonType: 'button-stable',  //Optional
         callback: function (val) {    //Mandatory
            if (val) {
               vm.timePickerObj.inputEpochTime = val;
               updateRegistrationTimestamp();
            }
         }
      };

   if (vm.datePickerObj === undefined)
      vm.datePickerObj = {
         titleLabel: 'Dato',  //Optional
         todayLabel: 'I dag',  //Optional
         closeLabel: 'Luk',  //Optional
         setLabel: 'Vælg',  //Optional
         setButtonType: 'button-positive',  //Optional
         todayButtonType: 'button-stable',  //Optional
         closeButtonType: 'button-stable',  //Optional
         inputDate: new Date(),  //Optional
         mondayFirst: true,  //Optional
         //disabledDates: disabledDates, //Optional
         weekDaysList: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"], //Optional
         monthList: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], //Optional
         templateType: 'popup', //Optional
         showTodayButton: 'true', //Optional
         modalHeaderColor: 'bar-positive', //Optional
         modalFooterColor: 'bar-positive', //Optional
         //from: new Date(2012, 8, 2), //Optional
         //to: new Date(2018, 8, 25),  //Optional
         callback: function (val) {  //Mandatory
            if (val) {
               vm.datePickerObj.inputDate = val;
               updateRegistrationTimestamp();
            }
         },
         dateFormat: 'dd-MM-yyyy', //Optional
         closeOnSelect: false //Optional
      };

   function formatTime(inputEpochTime) {
      var selectedTime = new Date(inputEpochTime * 1000);
      var hours = selectedTime.getUTCHours();
      var minutes = selectedTime.getUTCMinutes();
      return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes;
   }

   function updateRegistrationTimestamp() {
      var date = vm.datePickerObj.inputDate;
      var hours = Math.floor(vm.timePickerObj.inputEpochTime / 3600);
      var minutes = Math.floor((vm.timePickerObj.inputEpochTime - hours * 3600) / 60);
      date.setHours(hours, minutes, 0, 0);

      var registration = Session.get('registration');
      if (registration === undefined)
         registration = {};
      registration.timestamp = date;
      Session.set('registration', registration);

      var validated = Session.get('regValidated');
      if (validated === undefined)
         validated = [];
      validated[0] = registration.timestamp !== undefined;
      Session.set('regValidated', validated);
      console.log('regValidated session variable updated');

      console.log(Session.get('registration'));
   }

   updateRegistrationTimestamp();
}