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

   vm.helpers({
      remindersList: () => {
         return Reminders.findOne({isListReminders: {$exists: true}});
      },
      remindersForDay: () => {
         console.log('remindersForDay helper called');
         if (vm.selectedDate = Session.get('selectedDate')) {
            var formattedDate = moment(vm.selectedDate).startOf('day').toDate();
            return Reminders.find({date: formattedDate});
         } else {
            return Reminders.find({date: new Date()});
         }
      },
      syncReminders: () => {
         console.log('syncReminders helper called');
         if (vm.selectedDate = Session.get('selectedDate') && vm.reminders) {
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
         } else {
            loadReminders();
         }
         return remindersForDate;
      }
   });

   function loadReminders() {
      if (vm.reminders === undefined) {
         if (vm.remindersList) {
            vm.reminders = vm.remindersList.reminders;
            vm.reminders.forEach((reminder) => {
               reminder.isSelected = false;
            });
         }
         console.log('vm.reminders now loaded from DB:', vm.reminders, vm.remindersList);
      }
   }

   vm.addReminder = (number) => {
      var selectedDate = Session.get('selectedDate');
      var reminder = {
         date: moment(selectedDate).startOf('day').toDate(),
         description: vm.reminders[number].description
      };
      Meteor.call('addReminder', reminder);
   };

   vm.deleteReminder = (number) => {
      var abstractReminder = vm.reminders[number];
      var reminder = vm.remindersForDay.find((r) => {
         return r.description == abstractReminder.description;
      });
      console.log('deleteReminder called with params: ',
         'abstractReminder: ', abstractReminder,
         'reminder: ', reminder);
      Meteor.call('deleteReminder', reminder);
   };

   vm.updateReminder = (number) => {
      console.log('updateReminder called with number ', number);
      if (!Meteor.userId()) {
         vm.reminders[number].isSelected = false;
      } else {
         if (vm.reminders[number].isSelected) {
            console.log('addReminder called');
            vm.addReminder(number);
         } else {
            vm.deleteReminder(number);
         }
      }
   }
}