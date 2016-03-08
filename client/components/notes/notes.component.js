angular.module('leukemiapp').directive('notes', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/notes/notes.html',
      controllerAs: 'notes',
      controller: NotesController
   }
});

function NotesController($scope, $reactive, $translate) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.subscribe('notes');

   vm.helpers({
      noteForDay: () => {
         if (vm.selectedDate = Session.get('selectedDate')) {
            var formattedDate = moment(vm.selectedDate).startOf('day').toDate();
            vm.note = Notes.findOne({timestamp: formattedDate});
            return Notes.findOne({timestamp: formattedDate});
         } else {
            vm.note = Notes.findOne({timestamp: new Date()});
            return Notes.findOne({timestamp: new Date()});
         }
      },
      isLoggedIn: () => {
         return Meteor.userId() !== null;
      },
      placeholder: () => {
         return Meteor.userId() !== null ? $translate.instant('notesPlaceholderLoggedIn') : $translate.instant('notesPlaceholderLoggedOut');
      }
   });

   var txaNotes = document.getElementById('txaNotes');
   txaNotes.addEventListener('blur', saveNote, true);

   function saveNote() {
      if (Meteor.userId() === null || (vm.note.description == '' && vm.note._id === undefined))
         return;
      if (vm.noteForDay === undefined) {
         Meteor.call('addNewNote', {
            timestamp: moment(vm.selectedDate).startOf('day').toDate(),
            description: vm.note.description
         });
         console.log('Succesfully inserted new note');
      } else {
         Meteor.call('updateNote', vm.note._id, vm.note.description);
      }
   }

   vm.onFocus = () => {
      if (Meteor.userId() !== null) {
         txaNotes.placeholder = '';
      }
   };

   vm.onBlur = () => {
      txaNotes.placeholder = vm.placeholder;
   }
}