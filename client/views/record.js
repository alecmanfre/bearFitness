Template.record.showRecord = function(){
  return Session.get('currentPage') == 'showRecord';
}

Template.WorkOutList.workouts = function(){
  return WorkOuts.find({user: Meteor.userId()});
};

Template.ExerciseList.exercisesperformed = function () {
  if(Session.get('currentWorkoutId') != 0){
    return ExercisesPerformed.find({parent: Session.get('currentWorkoutId'),user: Meteor.userId()});    
  };
};  

Template.SetList.setsperformed = function(){
  return SetsPerformed.find({parent: this._id,user: Meteor.userId()});
};

Template.WorkOutList.events({
  'click .work-out-name' : function() {
    var workOutPerformedId = WorkOutsPerformed.insert({
      name: this.name,
      date: Date.now(),
      parent: this._id,
      user: Meteor.userId()
    })
    var exercises = Exercises.find({parent: this._id, user: Meteor.userId()});  
    exercises.forEach(function(exr){
      ExercisesPerformed.insert({
        name: exr.name,
        date: Date.now(),
        exerciseId: exr._id,
        parent: workOutPerformedId,
        user: Meteor.userId()
      })  
    })
    Session.set('currentWorkoutId', workOutPerformedId);
  }
});

Template.ExerciseList.events({
  'click .add-set' : function(){
    SetsPerformed.insert({
      date: Date.now(),
      reps: 0,
      weight: 0,
      active: false,
      parent: this._id,
      user: Meteor.userId()
    });
  },
  'click #save-workout' : function(){
    Session.set('currentWorkoutId',0);
  }
});

Template.SetList.events({
  'click .save' : function(evt){
    var currentTarget = $(evt.currentTarget.parentElement);
    var reps = $('.repetition-input',currentTarget).val();
    var weight = $('.weight-input',currentTarget).val();
    SetsPerformed.update({_id: this._id},{$set:{
      reps: reps,
      weight: weight,
      active: true
    }})
  },
  'click .delete' : function(){
    SetsPerformed.remove(this._id);
  }
})