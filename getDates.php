<?php
	// Set timezone
	date_default_timezone_set('UTC');

	// Start date
	$date = '2015-09-01';
	// End date
	$end_date = '2020-12-31';

	$dateArray = array();

	while (strtotime($date) <= strtotime($end_date)) {
		$date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
		$dayNumber = date ("w", strtotime("+1 day", strtotime($date)));
		$monthNumber = date ("n", strtotime("+1 day", strtotime($date)));
		$yearNumber = date ("Y", strtotime("+1 day", strtotime($date)));
		$dateArray['date'] = $date;
		$dateArray['dayNumber'] = $dayNumber;
		$dateArray['monthNumber'] = $monthNumber;
		$dateArray['yearNumber'] = $yearNumber;

		// $dateArray[$yearNumber] = array(

		// 	$monthNumber => $date
		// );

		// $key = date('m', $date);
		// $name = date('F', $date);
		// $months[$key] = $name;


		$data[] = $dateArray;
	}

	// $groupedDatesYear = array();
	// foreach ($data as $item) {
	//     $key = $item['yearNumber'];

	//     if (!isset($groupedDatesYear[$key])) {
	//         $groupedDatesYear[$key] = array(
	//             //'date' => array($item['date'])
	//         );
	//     } else {
	//         $groupedDatesYear[$key][] = $item;
	//     }
	// }

	// $groupedDatesMonth = array();
	// $count = 0;
	// foreach ($data as $item) {
	// 	$monthKey = $item['monthNumber'];
	// 	$yearKey = $item['yearNumber'];

	// 	if (!isset($groupedDatesMonth[$monthKey]) && !isset($groupedDatesMonth[$yearKey])) {
	//         $groupedDatesMonth[$monthKey] = array(
	//             //'date' => array($item['date'])
	//         );
	//     } else {
	//         $groupedDatesMonth[$yearKey][] = $item;
	//     }

	//     $count++;
	// }

	// $groups = array();
	// foreach ($data as $item) {
	// 	$key = $item['key_to_group'];
	// 	if (!isset($groups[$key])) {
	// 	    $groups[$key] = array(
	// 	        'items' => array($item),
	// 	        'count' => 1,
	// 	    );
	// 	} else {
	// 	    $groups[$key]['items'][] = $item;
	// 	    $groups[$key]['count'] += 1;
	// 	}
	// }

	chmod('getDates.php', 0644);

	// file_put_contents('dates.json', json_encode($groupedDatesMonth));
	// file_put_contents('years.json', json_encode($groupedDatesYear));
	file_put_contents('simpleDates.json', json_encode($data));

?>

<?php

$monthArray = array();

function build_calendar($month,$year,$dateArray) {

    // What is the first day of the month in question?
    $firstDayOfMonth = mktime(0,0,0,$month,1,$year);

    // How many days does this month contain?
    $numberDays = date('t',$firstDayOfMonth);

    // Retrieve some information about the first day of the
    // month in question.
    $dateComponents = getdate($firstDayOfMonth);

    // What is the name of the month in question?
    $monthName = $dateComponents['month'];
    $dayOfWeek = $dateComponents['wday'];

    $monthArray['year'] = $year;
    $monthArray['month'] = $month;
    $currentDay = 1;

    $month = str_pad($month, 2, "0", STR_PAD_LEFT);

    while ($currentDay <= $numberDays) {

    	$currentDayRel = str_pad($currentDay, 2, "0", STR_PAD_LEFT);
        $date = "$year-$month-$currentDayRel";
		$dayText = date('l', strtotime($date));
		$dayInt = date('w', strtotime($date));

		$monthArray['date'] = $date;
		$monthArray['currentDay'] = $currentDay;
		$monthArray['dayText'] = $dayText;
		$monthArray['dayInt'] = $dayInt;

		$monthJson[] = $monthArray;
        $currentDay++;
        $dayOfWeek++;

    }

     return $monthJson;
}

?>

<?php
    $dateComponents = getdate();
    $month = $dateComponents['mon'];
    $year = $dateComponents['year'];

    $json = build_calendar($month,$year,$dateArray);

    file_put_contents('dateList.json', json_encode($json));
    // This will get dates for given month and year. Need to have this just return the JSON and use as a web service.

?>