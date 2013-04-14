Template.track.showTrack = function(){
  return Session.get('currentPage') == 'showTrack';
}

Template.ExercisePerformedList.exercises = function(){
  return Exercises.find({user: Meteor.userId()});
};

Template.ExercisePerformance.exercisesperformed = function () {
  return ExercisesPerformed.find({exerciseId: Session.get('currentExerciseId'),user: Meteor.userId()});    
};

Template.ExercisePerformance.currentExercise = function(){
	currentExercise = Session.get('currentExerciseName');
	return currentExercise;
}

Template.ExercisePerformance.id = function() {
  return Meteor.user().services.facebook.id;
}

Template.SetPerformedList.setsperformed = function(){
  return SetsPerformed.find({parent: this._id,user: Meteor.userId()});
};

Template.ExercisePerformedList.events({
  'click .side-nav-item' : function(evt) {
    Session.set('currentExerciseId', this._id);
    Session.set('currentExerciseName',this.name);
    $('.side-nav-item').removeClass('side-nav-selected');
    var currentTarget = $(evt.currentTarget);
    $(currentTarget).addClass('side-nav-selected');
  }
});