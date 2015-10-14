var ref = new Firebase('https://flickering-fire-9049.firebaseio.com/');
var fireGroups = new Firebase('https://flickering-fire-9049.firebaseio.com/groups');
var fireUsers = new Firebase('https://flickering-fire-9049.firebaseio.com/users');
var userId = null;
var userExists = false;
var groupData = null;
var currentCal = null;
var monthDates = null;

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

	var datesLength = $dates.length;
	//console.log('datesLength');
	//console.log(datesLength);
	$.each($dates, function (i) {
		var $date = $(this)[0];
		//console.log($date);

		if (!$date || $date.length < 1) {
			console.log('ERROR: populateCal() - no $date');
			return;
		}

		var week = $date.week;
		var day = $date.dayInt;
		var fullDate = $date.date;

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
			$dayBtn.attr('data-calendar-full-date', fullDate);
			$dayBtn.attr('data-calendar-year', year);
			$dayBtn.attr('data-calendar-month', month);
			$dayBtn.attr('data-calendar-date-day', currentDay);
		} else {
			$day.text(currentDay);
		}

		$cal.attr('data-calendar-current-month', month);
		$cal.attr('data-calendar-current-year', year);

		if (i + 1 === datesLength) {
			//console.log('end of dates');
			bindDateBtn();
		}
	});
}

function bindDateBtn() {
	var $dateBtn = $('.action-calendar-day-btn');
	$dateBtn.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var date = $this.attr('data-calendar-full-date');
		var year = $this.attr('data-calendar-year');
		var month = $this.attr('data-calendar-month');
		var day = $this.attr('data-calendar-date-day');

		if (!currentCal || currentCal.length < 1) {
			console.log('ERROR: bindDateBtn() - btn click - no currentCal');
			return;
		}

		var groupDate = new Firebase(fireGroups + '/' + currentCal + '/dates/' + year + '/' + month + '/' + day);
		groupDate.once('value', function(snapshot) {
			var dayLength = snapshot.numChildren();
			if (!dayLength || dayLength.length < 1) {
				console.log('No date entry');
				addDateEntry(groupDate);
			} else {
				var user = snapshot.val();
				console.log('user');
				console.log(user);

				var groupDateUser = new Firebase(fireGroups + '/' + currentCal + '/dates/' + year + '/' + month + '/' + day + '/' + userId);
				groupDateUser.once('value', function(snapshot) {
					var userEntry = snapshot.val();
					var active = null;
					if (userEntry) {
						active = snapshot.val().active;
					} else {
						addDateEntry(groupDate);
					}

					if (!active) {
						addDateEntry(groupDate);
					} else {
						removeDateEntry(groupDate, $this);
					}
				});
			}
		});
	});
}

function addDateEntry(groupDate) {
	if (!groupDate) {
		console.log('ERROR: addDateEntry() - no groupDate');
		return;
	}

	if (!currentCal || currentCal.length < 1) {
		console.log('ERROR: addDateEntry() - no currentCal');
		return;
	}

	var groupDateUserRef = new Firebase(groupDate + '/' + userId);
	groupDateUserRef.set({
		active: true
	});
	loadCalendarData(currentCal);
}

function removeDateEntry(groupDate, $btn) {
	if (!groupDate) {
		console.log('ERROR: removeDateEntry() - no groupDate');
		return;
	}

	if (!currentCal || currentCal.length < 1) {
		console.log('ERROR: removeDateEntry() - no currentCal');
		return;
	}

	var childCount = 0;
	groupDate.once('value', function (snap) {
		childCount = snap.numChildren();
		console.log('childCount');
		console.log(childCount);

		var userEntryRef = new Firebase(groupDate + '/' + userId);
		userEntryRef.remove(dateEntryRemovalComplate(childCount, $btn));
	});
}

function dateEntryRemovalComplate(childCount, $btn, error) {
	if (error) {
		console.log('Synchronization failed');
	} else {
		//console.log('Synchronization succeeded');
		if (childCount === 1) {
			var $btnCount = $btn.find('.calendar-date-user-count');
			$btnCount.remove();
		} else {
			loadCalendarData(currentCal);
		}
	}
}

function loadCalendarData(calGroup) {
	if (!calGroup) {
		console.log('ERROR: loadCalendarData() - no calGroup');
		return;
	}

	var $cal = $('.calendar');
	if (!$cal || $cal.length < 1) {
		console.log('ERROR: loadCalendarData() - no $cal');
		return;
	}

	var currentYear = $cal.attr('data-calendar-current-year');
	var currentMonth = $cal.attr('data-calendar-current-month');
	if (!currentYear || currentYear.length < 1 || !currentMonth || currentMonth < 1) {
		console.log('ERROR: loadCalendarData() - no current year or no current month');
		return;
	}

	currentCal = calGroup;
	var groupDates = new Firebase(fireGroups + '/' + calGroup + '/dates/' + currentYear + '/' + currentMonth);
	groupDates.once('value', function(snapshot) {
		var datesLength = snapshot.numChildren();
		if (!datesLength || datesLength < 1) {
			console.log('No dates for this month yet');
			return;
		}

		monthDates = snapshot.val();
		for (key in monthDates) {
			var date = key;
			var userCount = objectLength(monthDates[key]);
			var $dateBtn = $('*[data-calendar-date-day=' + date + ']');

			if (!$dateBtn || $dateBtn.length < 1) {
				console.log('ERROR: loadCalendarData() - for loop for month - no $date');
				return;
			}

			$dateBtn.attr('data-calendar-date-user-count', userCount);
			var $userCount = $dateBtn.find('.calendar-date-user-count');
			if ($userCount && $userCount.length > 0) {
				$userCount.text(userCount);
			} else {
				var $count = $('<span />', {
					'class': 'calendar-date-user-count',
					'text': userCount
				});
				$dateBtn.append($count);
			}
		}
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
				viewGroups();
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
				viewGroups();
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

	allowJoinCalendar();
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
	var hash = userId.hashCode();
	ref.child('user_index/' + hash).set(userId);

	var userPath = fireUsers.child(userId + '/');
	userPath.set({
		user: userId,
		firstName: firstName,
		surname: surname,
		fullName: fullName,
		photoURL: photo
	});
}

function viewGroups() {
	var $list = $('.calendar-groups');
	if (!$list || $list.length < 1) {
		console.log('ERROR: viewGroups() - no $list');
		return;
	}

	var groupsRef = new Firebase(fireUsers + '/' + userId + '/groups/');
	groupsRef.once('value', function(snapshot) {
		// Get all groups associated with user
		snapshot.forEach(function(childSnapshot) {
			var group = childSnapshot.key();
			var active = childSnapshot.val().active;

			// If group is still active get data on that group
			if (active) {
				var groupUsers = new Firebase(fireGroups + '/' + group + '/users');
				//getUserLength(groupUsers);
				groupUsers.once('value', function(snapshot) {
					usersLength = snapshot.numChildren();

					// Now we have the number of users get the group info and then get the user info
					var groupInfo = new Firebase(fireGroups + '/' + group);
					groupInfo.once('value', function(snap) {
						//console.log(snap.val());
						var $groupInfo = snap.val();
						groupData = snap;

						if ($groupInfo) {
							//addGroupDetails($groupInfo, $list);
							buildUserDetails($groupInfo, $list, usersLength, group);
						}
					});
				});
			}
		});
	});
}

function buildUserDetails($groupInfo, $list, usersLength, group) {
	if (!$groupInfo || !$list || !usersLength) {
		console.log('ERROR: buildUserDetails() - no $groupInfo or no $list or no usersLength or no group');
		return;
	}

	var count = 0;
	var userArray = [];
	for (key in $groupInfo.users) {
		var user = key;
		var active = $groupInfo.users[key].active;
		//console.log(user);
		if (user && active) {
			var userInfo = new Firebase(fireUsers + '/' + user);
			userInfo.once('value', function(snapshot) {
				var data = snapshot.val();
				//console.log('data');
				//console.log(data);
				userArray.push({
					user: user,
					fullname: data.fullName,
					img: data.photoURL
				});

				count++;
				if (count === usersLength) {
					//console.log('userArray');
					//console.log(userArray);
					addGroupDetails($groupInfo, userArray, $list, group);
				}
			});
		}
	}
}

function addGroupDetails($groupInfo, userArray, $list, group) {
	if (!$groupInfo || !userArray || !$list) {
		console.log('ERROR: addGroupDetails() - no $groupInfo or no userArray or no $list or no group');
		return;
	}

	var $data = {
		title: $groupInfo.name,
		desc: $groupInfo.description,
		group: group,
		members: userArray
	};

	var reqTemplate = null,
		template = 'templates/groupItem.hbs',
		templateHTML = null,
		$targetContainer = $list;

	reqTemplate = $.get(template, function(view) {
		// Create view from template and data
		templateHTML = view;
	});

	$.when(reqTemplate).done(function() {

		var template = Handlebars.compile(templateHTML),
			data = template($data),
			html = $targetContainer.append(data);

		bindCalendarBtn();
	});
}

function bindCalendarBtn() {
	var $calBtn = $('.action-calendar-view');
	$calBtn.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var calGroup = $this.attr('data-calendar-group');
		getMonth();
		loadCalendarData(calGroup);
	});
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
	var $groupPass = $form.find('#group-pass');

	if ((!$groupName || $groupName.length < 1) || (!$groupDesc || $groupDesc.length < 1) || (!$groupPass || $groupPass.length < 1) ) {
		console.log('ERROR: createGroup() - no $groupName or no $groupDesc or no $groupPass');
		return;
	}

	var groupName = $groupName.val();
	var groupDesc = $groupDesc.val();
	var groupPass = $groupPass.val();

	var d = Date.now();
	var groupHash = d.toString() + groupName;;
	groupHash = groupHash.hashCode();

	var groupPath = fireGroups.child(groupHash + '/');
	groupPath.set({
		name: groupName,
		description: groupDesc,
		password: groupPass,
		owner: userId
	});

	// set current calendar as the calendar id
	currentCal = groupHash;

	addUserToGroup(groupHash, userId);
	addGroupToUser(groupHash, userId);
}

function addUserToGroup(groupId, user) {

	if (!groupId || !user) {
		console.log('ERROR: addUserToGroup() - no groupId or no user');
		return;
	}

	var groupPath = new Firebase(fireGroups + '/' + groupId + '/users/' + user + '/');
	groupPath.set({
		active: true
	});
}

function addGroupToUser(groupId, user) {

	if (!groupId || !user) {
		console.log('ERROR: addGroupToUser() - no groupId or no user');
		return;
	}

	var groupPath = new Firebase(fireUsers + '/' + userId + '/groups/' + groupId + '/');
	groupPath.set({
		active: true
	});
}

function allowJoinCalendar() {
	if (!userId || userId.length < 1) {
		console.log('ERROR: allowJoinCalendar() - user not logged in');
		return;
	}

	var $joinPassword = $('.join-calendar-password-input');
	if (!$joinPassword || $joinPassword.length < 1) {
		console.log('ERROR: allowJoinCalendar() - no $joinPassword');
		return;
	}

	var $joinBtn = $('.action-calendar-join-group');
	if (!$joinBtn || $joinBtn.length < 1) {
		console.log('ERROR: allowJoinCalendar() - no $joinBtn');
		return;
	}

	$joinPassword.prop('disabled', false);
	$joinBtn.prop('disabled', false);

	$joinBtn.on('click', function (e) {
		e.preventDefault();
		var password = $joinPassword.val();
		if (!password || password.length < 1) {
			console.log('ERROR: allowJoinCalendar() - no password');
			return;
		}

		loadCalendar(password);
	});
}

function loadCalendar(password) {
	if (!password) {
		console.log('ERROR: loadCalendar() - no password');
		return;
	}

	var calId = getUrlParams('calendar');
	if (!calId) {
		console.log('ERROR: loadCalendar() - no calId');
		return;
	}

	// set current calendar as the calendar id
	currentCal = calId;

	var groupRef = new Firebase(fireGroups + '/' + calId);
	groupRef.on('value', function(snap) {
		//console.log(snap.val().password);
		if (password === snap.val().password) {
			addUserToGroup(calId, userId);
			addGroupToUser(calId, userId);
		}
	});
}

$(document).on('ready', function () {
	getMonth();
	bindCalendarControl();
	firebaseAuth();
	bindGroupButton();
	allowJoinCalendar();
});

function getUrlParams(parameter) {
	var queryString = window.location.search;

	if (queryString !== undefined) {
		queryString = window.location.search.replace('?', '');

		var params = {},
			queryStringArray = queryString.split('&');

		for (var index in queryStringArray) {
			var query = queryStringArray[index].split('=');

			params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
		}

		if (parameter) {
			return params[parameter];
		} else {
			return params;
		}
	}
}

function objectLength(data) {
	var count = 0;

	for (key in data) {
		if (data.hasOwnProperty(key)) {
			++count;
		}
	}

	return count;
};

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