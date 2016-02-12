angular.module('leukemiapp').directive('notes', function () {
   return {
      restrict: 'E',
      templateUrl: 'client/components/notes/notes.html',
      controllerAs: 'notes',
      controller: NotesController
   }
});

function NotesController($scope, $reactive) {
   $reactive(this).attach($scope);
   var vm = this;

   vm.selectedDate = new Date();

   vm.helpers({
      noteForDay() {
         vm.selectedDate = moment(Session.get('selectedDate')).startOf('day').toDate();
         vm.note = Notes.findOne({timestamp: vm.selectedDate});
         return vm.note;
      }
   });

   var txaNotes = document.getElementById('txaNotes');
   txaNotes.addEventListener('blur', saveNote, true);

   function saveNote() {
      if (vm.note.timestamp === undefined) {
         Notes.insert({
            timestamp: vm.selectedDate,
            description: vm.note.description
         });
         console.log('Succesfully inserted new note');
      } else {
         Notes.update({timestamp: vm.note.timestamp}, {
            $set: {
               description: vm.note.description
            }
         }, (error) => {
            if (error) {
               console.log('Unable to update note');
            } else {
               console.log('Succesfully updated note');
            }
         });
      }
   }
}