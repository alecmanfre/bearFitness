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
  'click .side-nav-item' : function() {
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