Template.track.showTrack = function(){
  return Session.get('currentPage') == 'showTrack';
}

Template.ExercisePerformedList.exercises = function(){
  return Exercises.find({user: Meteor.userId()});
};

Template.ExercisePerformance.exercisesperformed = function () {
  return ExercisesPerformed.find({exerciseId: Session.get('currentExerciseId'),user: Meteor.userId()});    
};

Template.SetPerformedList.setsperformed = function(){
  return SetsPerformed.find({parent: this._id,user: Meteor.userId()});
};

Template.ExercisePerformedList.events({
  'click .exercise-name' : function() {
    Session.set('currentExerciseId', this._id);
  }
});