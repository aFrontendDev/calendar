
<?php

//header('Content-Type: application/json');
date_default_timezone_set('Europe/London');

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

$dateComponents = getdate();
// $month = $dateComponents['mon'];
// $year = $dateComponents['year'];

$month = $_POST['month'];
$year = $_POST['year'];

$json = build_calendar($month,$year,$dateArray);

file_put_contents('dateList.json', json_encode($json));
echo json_encode($json);

?>