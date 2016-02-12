angular.module('leukemiapp').directive('calendarDate', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/calendar-date/calendar-date.html',
      controllerAs: 'caldate',
      controller: CalendarDateController
   }
});

function CalendarDateController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   var monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
      "Juli", "August", "September", "Oktober", "November", "December"
   ];
   var dayOfWeekNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"
   ];

   vm.helpers({
      selectedDate() {
         return moment(Session.get('selectedDate')).date();
      },
      selectedDayOfWeek() {
         return dayOfWeekNames[moment(Session.get('selectedDate')).day()];
      },
      selectedMonth() {
         return monthNames[moment(Session.get('selectedDate')).month()];
      }
   });
}