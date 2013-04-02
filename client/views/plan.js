Template.plan.showPlan = function(){
  return Session.get('currentPage') == 'showPlan';
}

Template.WorkOutContainer.workouts = function () {
  return WorkOuts.find({user: Meteor.userId()});
};

Template.exercises.exercises = function () {
  return Exercises.find({parent: this._id, user: Meteor.userId()});
};

Template.newWorkOut.events({
  'click #add-work-out-btn' : function() {
    var workout = $('#work-out-input').val();
    WorkOuts.insert({
      name: workout,
      user: Meteor.userId()
    });
    $('#work-out-input').val('');
  }
});

Template.WorkOutContainer.events({
  'click .add-work-out-btn' : function(evt) {
    var exercise = $('.exercise-name-input', $(evt.currentTarget.parentElement)).val();
    Exercises.insert({
      name: exercise,
      parent: this._id,
      user: Meteor.userId()
    });
    $('.exercise-name-input').val('');
  },
  'click .delete' : function(){
    WorkOuts.remove(this._id);
    Exercises.remove({parent: this._id});
  }
})

Template.exercise.events({
  'click .delete' : function(){
    Exercises.remove(this._id);
  }
})