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
			//console.log('success');
			//console.log($data);
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
		$calDay.empty();
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

		$day.text(currentDay);
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

$(document).on('ready', function () {
	getMonth();
	bindCalendarControl();
});