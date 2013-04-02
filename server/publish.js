Exercises = new Meteor.Collection('exercises');
WorkOuts = new Meteor.Collection('workouts');
WorkOutsPerformed = new Meteor.Collection('workoutsperformed');
ExercisesPerformed = new Meteor.Collection('exercisesperformed');
SetsPerformed = new Meteor.Collection('setsperformed');

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?width=40&height=40";
        user.profile = options.profile;
    }
    return user;
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId}, {fields: {'services': 1}});
});