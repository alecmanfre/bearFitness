Template.login.showLogin = function(){
  return Session.get('currentPage') == 'showLogin';
}

Meteor.startup(function(){
	var winHeight = $(window).height();
	$('#login').css({'height': winHeight});


})
$(window).resize(function(){
	var winHeight = $(window).height();
	$('#login').css({'height': winHeight});
})