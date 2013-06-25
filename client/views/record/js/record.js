Template.record.showRecord = function(){
  return Session.get('currentPage') == 'showRecord';
}

Template.WorkOutList.workouts = function(){
  return WorkOuts.find({user: Meteor.userId()});
};

Template.ExerciseList.exercisesperformed = function () {
  if(Session.get('currentWorkoutId') == null){
    return 0
  }else{
    return ExercisesPerformed.find({parent: Session.get('currentWorkoutId'),user: Meteor.userId()});
  }
};

Template.ExerciseList.workoutName = function () {
  var workOutPerformedQuery = WorkOutsPerformed.find({_id: Session.get('currentWorkoutId')});
  var workOutPerformedArray = workOutPerformedQuery.fetch();
  return workOutPerformedArray[0].name;
};

Template.ExerciseList.dayOfWeek = function () {
  var workOutPerformedQuery = WorkOutsPerformed.find({_id: Session.get('currentWorkoutId')});
  var workOutPerformedArray = workOutPerformedQuery.fetch();
  return workOutPerformedArray[0].dayOfWeek;
};

Template.ExerciseList.todaysDate = function () {
  var workOutPerformedQuery = WorkOutsPerformed.find({_id: Session.get('currentWorkoutId')});
  var workOutPerformedArray = workOutPerformedQuery.fetch();
  return workOutPerformedArray[0].date;
};

Template.SetList.setsperformed = function(){
  return SetsPerformed.find({parent: this._id,user: Meteor.userId()});
};

Template.WorkOutList.events({
  'click .side-nav-item' : function() {
    var workOutPerformedId = WorkOutsPerformed.insert({
      name: this.name,
      date: todaysDate(),
      dayOfWeek: dayOfWeek(),
      parent: this._id,
      user: Meteor.userId()
    })
    var exercises = Exercises.find({parent: this._id, user: Meteor.userId()});  
    exercises.forEach(function(exr){
      ExercisesPerformed.insert({
        name: exr.name,
        date: todaysDate(),
        dayOfWeek: dayOfWeek(),
        exerciseId: exr._id,
        parent: workOutPerformedId,
        user: Meteor.userId()
      })  
    })
    Session.set('currentWorkoutId', workOutPerformedId);
  }
});

Template.ExerciseList.events({
  'click .add-new-set' : function(){
    var setValueQuery = SetsPerformed.find({parent: this._id,user: Meteor.userId()});
    var setValueArray = setValueQuery.fetch();
    var index = setValueArray.length - 1;
    var setNumber;
    var reps;
    var weight;

    if(index == -1){
      setNumber = 1;
      reps = 0;
      weight = 0;
    }else{
      setNumber = setValueArray[index].set + 1;
      reps = setValueArray[index].reps;
      weight = setValueArray[index].weight;
    }
    
    SetsPerformed.insert({
      date: Date.now(),
      set: setNumber,
      reps: reps,
      weight: weight,
      active: false,
      notes: '',
      parent: this._id,
      user: Meteor.userId()
    });
  },
  'click #save-workout' : function(){
    Session.set('currentWorkoutId',null);
  },
  'click #cancel-workout' : function(){
    Session.set('currentWorkoutId',null);
  }
});

Template.SetList.events({
  'blur .record-reps-input' : function(evt){
    var currentTarget = $(evt.currentTarget.parentElement);
    var reps = $('.record-reps-input',currentTarget).val();
    SetsPerformed.update({_id: this._id},{$set:{
      reps: reps,
    }})
  },
  'blur .record-weight-input' : function(evt){
    var currentTarget = $(evt.currentTarget.parentElement);
    var weight = $('.record-weight-input',currentTarget).val();
    SetsPerformed.update({_id: this._id},{$set:{
      weight: weight,
    }})
  },
  'blur .record-notes-input' : function(evt){
    var currentTarget = $(evt.currentTarget.parentElement);
    var notes = $('.record-notes-input',currentTarget).val();
    SetsPerformed.update({_id: this._id},{$set:{
      notes: notes,
    }})
  },
  'click .delete' : function(){
    SetsPerformed.remove(this._id);
  }
})

var todaysDate = function(){
  var monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var todaysDate = new Date();
  var month = todaysDate.getMonth();
  var day = todaysDate.getDate();
  var year = todaysDate.getFullYear();
  var dateString = monthArray[month] + ' ' + day + ', ' + year;

  return dateString;
}

var dayOfWeek = function(){
  var dayArray = ['Sun','Mon','Tue','Wed','Thu','Fru','Sat'];
  var todaysDate = new Date();
  var day = todaysDate.getDay();
  var dayOfWeekString = dayArray[day];

  return dayOfWeekString;
}