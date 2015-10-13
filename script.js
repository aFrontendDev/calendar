var ref = new Firebase('https://flickering-fire-9049.firebaseio.com/');
var fireGroups = new Firebase('https://flickering-fire-9049.firebaseio.com/groups');
var fireUsers = new Firebase('https://flickering-fire-9049.firebaseio.com/users');
var userId = null;
var userExists = false;

function getMonth(month, year) {
	var jsDate = new Date();

	if (!month) {
		month = jsDate.getMonth();
		month++;
	}

	if (!year) {
		year = jsDate.getFullYear();
	}

	$.ajax({
		url: 'monthjson.php',
		type: 'POST',
		data: {
			month: month,
			year: year
		},
		dataType: "json",
		success: function ($data) {
			populateCal($data, month, year);
		},
		error: function (error) {
			console.log('error');
			console.log(error);
		}
	});
}

function populateCal($dates, month, year) {
	if (!$dates) {
		console.log('ERROR: populateCal() - no $dates');
		return;
	}

	var $cal = $('.calendar');

	if (!$cal || $cal.length < 1) {
		console.log('ERROR: populateCal() - no $cal');
		return;
	}

	var $calDay = $cal.find('.calendar-day');

	if ($calDay && $calDay.length > 0) {
		$calDay.each(function () {
			var $thisDay = $(this);
			var $dayBtn = $thisDay.find('.calendar-day-btn');

			if ($dayBtn && $dayBtn.length > 0) {
				$dayBtn.empty();
			} else {
				$thisDay.empty();
			}
		});
	}

	$.each($dates, function () {
		var $date = $(this)[0];
		//console.log($date);

		if (!$date || $date.length < 1) {
			console.log('ERROR: populateCal() - no $date');
			return;
		}

		var week = $date.week;
		var day = $date.dayInt;

		if (!week || !day) {
			console.log('ERROR: populateCal() - no week or no day');
			return;
		}

		var $currentMonth = $cal.find('.calendar-current-month');
		if ($currentMonth && $currentMonth.length > 0) {
			if (month && year) {
				$currentMonth.text(month + ' / ' + year);
			}
		}

		var $week = $cal.find('*[data-calendar-week="' + week + '"]');
		if (!$week || $week.length < 1) {
			console.log('ERROR: populateCal() - no $week');
			return;
		}

		var $day = $week.find('*[data-calendar-day="' + day + '"]');
		if (!$day || $day.length < 1) {
			console.log('ERROR: populateCal() - no $day');
			return;
		}

		var currentDay = $date.currentDay;
		if (!currentDay) {
			console.log('ERROR: populateCal() - no currentDay');
			return;
		}

		var $dayBtn = $day.find('.calendar-day-btn');

		if ($dayBtn && $dayBtn.length > 0) {
			$dayBtn.text(currentDay);
		} else {
			$day.text(currentDay);
		}

		$cal.attr('data-calendar-current-month', month);
		$cal.attr('data-calendar-current-year', year);
	});
}

function bindCalendarControl() {
	var $prev = $('.action-calendar-prev');
	var $next = $('.action-calendar-next');

	$prev.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var $cal = $this.closest('.calendar');
		var dataMonth = $cal.attr('data-calendar-current-month');
		var dataYear = $cal.attr('data-calendar-current-year');

		if (!dataMonth || !dataYear) {
			console.log('ERROR: bindCalendarControl() - $prev() click - no dataMonth or no dataYear');
			return;
		}

		dataMonth = parseInt(dataMonth, 10);
		dataYear = parseInt(dataYear, 10);

		if (dataMonth === 1) {
			dataMonth = 12;
			dataYear--;
		} else {
			dataMonth--;
		}

		getMonth(dataMonth, dataYear);
	});

	$next.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var $cal = $this.closest('.calendar');
		var dataMonth = $cal.attr('data-calendar-current-month');
		var dataYear = $cal.attr('data-calendar-current-year');

		if (!dataMonth || !dataYear) {
			console.log('ERROR: bindCalendarControl() - next() click - no dataMonth or no dataYear');
			return;
		}

		dataMonth = parseInt(dataMonth, 10);
		dataYear = parseInt(dataYear, 10);

		if (dataMonth === 12) {
			dataMonth = 1;
			dataYear++;
		} else {
			dataMonth++;
		}

		getMonth(dataMonth, dataYear);
	});
}

function firebaseAuth() {
	// var ref = new Firebase('https://flickering-fire-9049.firebaseio.com/');

	var $loginFB = $('.action-login-facebook');
	var $loginG = $('.action-login-google');

	$loginG.on('click', function(e) {
		e.preventDefault();

		ref.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				userId = authData.uid;
				//viewGroups();
				setUser('google', authData);
			}
		});
	});

	$loginFB.on('click', function(e) {
		e.preventDefault();

		ref.authWithOAuthPopup("facebook", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				userId = authData.uid;
				//viewGroups();
				setUser('facebook', authData);
			}
		});
	});
}

function setUser(provider, authData) {
	if (!provider || !authData) {
		console.log('ERROR: setUser() - no provider or no authData');
		return;
	}

	if (!userId || userId.length < 1) {
		console.log('ERROR: setUser() - no userId');
		return;
	}

	var google = false;
	var facebook = false;

	if (provider === 'google') {
		google = true;
	} else if (provider === 'facebook') {
		facebook = true;
	} else {
		console.log('ERROR: setUser() - didnt recognise provider');
		return;
	}

	var firstName = null;
	var surname = null;
	var fullName = null;
	var photo = null;

	if (google) {
		firstName = authData.google.cachedUserProfile.given_name;
		surname = authData.google.cachedUserProfile.family_name;
		fullName = authData.google.displayName;
		photo = authData.google.profileImageURL;
	}

	if (facebook) {
		firstName = authData.facebook.cachedUserProfile.first_name;
		surname = authData.facebook.cachedUserProfile.last_name;
		fullName = authData.facebook.displayName;
		photo = authData.facebook.profileImageURL;
	}

	checkUserExists(firstName, surname, fullName, photo);
}

function checkUserExists(firstName, surname, fullName, photo) {
	var hash = userId.hashCode();
	ref.child('user_index/' + hash).once('value', function(snap) {
		//console.log(snap.val());
		if (!snap.val()) {
			addUser(firstName, surname, fullName, photo);
		}
	});
}

function addUser(firstName, surname, fullName, photo) {
	fireUsers.push({
		user: userId,
		firstName: firstName,
		surname: surname,
		fullName: fullName,
		photoURL: photo
	});
	var hash = userId.hashCode();
	ref.child('user_index/' + hash).set(userId);
}

function viewGroups() {
	var $list = $('.calendar-groups');
	if (!$list || $list.length < 1) {
		console.log('ERROR: viewGroups() - no $list');
		return;
	}

	// fireGroups.orderByChild('height').equalTo().on('value', function(snapshot) {
	// 	console.log(snapshot.val());
	// }, function (errorObject) {
	// 	console.log('The read failed: ' + errorObject.code);
	// });

	var $li = $('<li />');

	var $btn = $('<button />', {
		'type': 'button',
		'class': 'btn btn-style-a action-calendar-view'
	});

	var $span = $('<span />', {
		'text': 'group'
	});

	$btn.append($span);
	$li.append($btn);
	$list.append($li);
}

function bindGroupButton() {
	var $groupBtn = $('.action-calendar-create-group');
	if (!$groupBtn || $groupBtn.length < 1) {
		console.log('ERROR: bindGroupButton() - no $groupBtn');
		return;
	}

	$groupBtn.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		createGroup($this);
		// TODO - form validation
	});
}

function createGroup($btn) {
	if (!$btn) {
		console.log('ERROR: createGroup() - no $btn');
		return;
	}

	if (!userId || userId.length < 1) {
		console.log('ERROR: createGroup() - no userId');
		return;
	}

	var $form = $btn.closest('.form');
	if (!$form || $form.length < 1) {
		console.log('ERROR: createGroup() - no $form');
		return;
	}

	var $groupName = $form.find('#group-name');
	var $groupDesc = $form.find('#group-desc');

	if ((!$groupName || $groupName.length < 1) || (!$groupDesc || $groupDesc.length < 1) ) {
		console.log('ERROR: createGroup() - no $groupName or no $groupDesc');
		return;
	}

	var groupName = $groupName.val();
	var groupDesc = $groupDesc.val();

	fireGroups.push({
		name: groupName,
		description: groupDesc,
		owner: userId,
		users: userId
	});

	var groupId = fireGroups.push().key();
	console.log(groupId);
}

$(document).on('ready', function () {
	getMonth();
	bindCalendarControl();
	firebaseAuth();
	bindGroupButton();
});

String.prototype.hashCode = function() {
	var hash = 0, i, chr, len;

	if (this.length == 0) {
		return hash;
	}

	for (i = 0, len = this.length; i < len; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};