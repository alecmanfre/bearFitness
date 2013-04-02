Exercises = new Meteor.Collection('exercises');
WorkOuts = new Meteor.Collection('workouts');
WorkOutsPerformed = new Meteor.Collection('workoutsperformed');
ExercisesPerformed = new Meteor.Collection('exercisesperformed');
SetsPerformed = new Meteor.Collection('setsperformed');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

var Router = Backbone.Router.extend({
  initialize: function(){
    if(!Meteor.userId()){
      Session.set('currentPage', 'showLogin');
    }
    Meteor.subscribe('userData');
  },

  routes: {
    "": "plan",
    "record": "record",
    "track": "track",
    "login": "login",
    "layout": "layout"
  },

  main: function(){
  },

  record: function(){
    Session.set('currentPage', 'showRecord');
  },

  plan: function(){
    Session.set('currentPage', 'showPlan');
  },

  track: function(){
    Session.set('currentPage', 'showTrack');
  },

  login: function(){
    Session.set('currentPage', 'showLogin');
  },

  layout: function(){
    Session.set('currentPage', 'showLayout');
  }
});

var app = new Router;

Meteor.startup(function(){
  Backbone.history.start({pushstate: true});
})

  
