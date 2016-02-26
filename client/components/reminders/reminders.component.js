angular.module('leukemiapp').directive('reminders', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/reminders/reminders.html',
      controllerAs: 'reminders',
      controller: RemindersController
   }
});

function RemindersController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   this.subscribe('reminders');

   if (vm.reminders === undefined) {
      vm.reminders = [];
      vm.reminders.push({
            description: 'Blodprøver',
            isSelected: false
         },
         {
            description: 'Højdosis',
            isSelected: false
         });
   }

   vm.helpers({
      remindersForDay: () => {
         console.log('remindersForDay helper called');
         var reminders = undefined;
         if (vm.selectedDate = Session.get('selectedDate')) {
            var formattedDate = moment(vm.selectedDate).startOf('day').toDate();
            return Reminders.find({date: formattedDate});
         } else {
            return Reminders.find({date: new Date()});
         }
      },
      syncReminders: () => {
         console.log('syncReminders helper called');
         if (vm.selectedDate = Session.get('selectedDate')) {
            var remindersForDate = _.pluck(vm.remindersForDay, 'description');
            console.log('remindersForDate are: ', remindersForDate);
            if (remindersForDate.length > 0) {
               vm.reminders.forEach((reminder) => {
                  reminder.isSelected = _.contains(remindersForDate, reminder.description);
               });
               console.log('vm.reminders after sync is: ', vm.reminders);
            } else {
               vm.reminders.forEach((reminder) => {
                  reminder.isSelected = false;
               });
            }
         }
         return remindersForDate;
      }
   });

   vm.addReminder = (number) => {
      var selectedDate = Session.get('selectedDate');
      var reminder = {
         date: moment(selectedDate).startOf('day').toDate(),
         description: vm.reminders[number].description
      };
      Meteor.call('addReminder', reminder);
   };

   vm.updateReminder = (number) => {
      console.log('updateReminder called with number ', number);
      if (vm.reminders[number].isSelected) {
         console.log('addReminder called');
         vm.addReminder(number);
      } else {

      }
   }
}