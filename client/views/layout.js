Template.layout.showTrack = function() {
	return 'showTrack' == Session.get('currentPage');
}

Template.layout.showPlan = function() {
	return 'showPlan' == Session.get('currentPage');
}

Template.layout.showRecord = function() {
	return 'showRecord' == Session.get('currentPage');
}

Template.layout.id = function() {
	return Meteor.user().services.facebook.id;
}