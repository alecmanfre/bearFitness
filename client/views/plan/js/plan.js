Template.plan.showPlan = function(){
  return Session.get('currentPage') == 'showPlan';
}

Template.WorkOutContainer.workouts = function () {
  return WorkOuts.find({user: Meteor.userId()});
};

Template.exercises.exercises = function () {
  return Exercises.find({parent: Session.get('newWorkoutId'), user: Meteor.userId()});
};

Template.savedExercises.exercises = function () {
  return Exercises.find({parent: this._id, user: Meteor.userId()});
};

Template.newWorkOut.createWorkout = function(){
  return Session.get('createNewWorkout');
}

Template.newWorkOut.insertName = function(){
  return Session.get('insertName');
}

Template.addExercises.workOutName = function(){
  var newWorkOutNameQuery = WorkOuts.find({user: Meteor.userId(), _id: Session.get('newWorkoutId')});
  var newWorkOutNameArray = newWorkOutNameQuery.fetch();
  var newWorkOutName = newWorkOutNameArray[0].name;
  return newWorkOutName;
}

Template.newWorkOut.events({
  'click #create-new-workout' : function() {
    Session.set('createNewWorkout',true);
    Session.set('insertName',1);
  },
  'click #save-workout-name' : function(){
    var workout = $('#workout-input').val();

    Session.set('newWorkoutJson',{
      name: workout,
      exercise: []
    });

    var newWorkoutId = WorkOuts.insert({
      name: workout,
      user: Meteor.userId()
    });
    Session.set('insertName',0);
    Session.set('newWorkoutId',newWorkoutId);
  },
  'click .add-exercise' : function(evt) {
    Exercises.insert({
      name: '',
      parent: Session.get('newWorkoutId'),
      user: Meteor.userId()
    });
  },
  'click #submit-new-workout' : function(){
    Session.set('createNewWorkout',false);
  },
  'click #cancel-new-workout' : function(){
    Session.set('createNewWorkout',false);
  }
});

Template.addExercises.events({
})

Template.WorkOutContainer.events({
  'click .delete' : function(){
    WorkOuts.remove(this._id);
    Exercises.remove({parent: this._id});
  }
})

Template.exercise.events({
  'blur .exercise-name-input' : function(evt){
    var exercise = $('.exercise-name-input', $(evt.currentTarget.parentElement)).val();
    Exercises.update({_id: this._id},{$set:{
      name: exercise,
    }});
    Session.get('newWorkoutJson').exercise;
  },
  'click .delete' : function(){
    Exercises.remove(this._id);
  }
})