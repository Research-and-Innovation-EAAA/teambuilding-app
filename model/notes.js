Notes = new Mongo.Collection("notes");

Meteor.methods({
   addNewNote: (note) => {
      if (!Meteor.userId()) {
         throw new Meteor.Error('not-authorized');
      }
      note.createdBy = Meteor.userId();

      Notes.insert(note);
   },
   updateNote: (noteId, description) => {
      Notes.update({_id: noteId}, {
         $set: {
            description: description
         }
      }, (error) => {
         if (error) {
            console.log('Unable to update note');
         } else {
            console.log('Succesfully updated note');
         }
      });
   }
});

