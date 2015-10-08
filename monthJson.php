
<?php

//header('Content-Type: application/json');
date_default_timezone_set('Europe/London');

$monthArray = array();

function build_calendar($month,$year,$dateArray) {
//https://css-tricks.com/snippets/php/build-a-calendar-table/

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
    $week = 1;

    $monthArray['year'] = $year;
    $monthArray['month'] = $month;
    $currentDay = 1;

    $month = str_pad($month, 2, "0", STR_PAD_LEFT);

    while ($currentDay <= $numberDays) {

        if ($dayOfWeek === 7) {
            $week++;
            $dayOfWeek = 0;
        }

    	$currentDayRel = str_pad($currentDay, 2, "0", STR_PAD_LEFT);
        $date = "$year-$month-$currentDayRel";
		$dayText = date('l', strtotime($date));
		$dayInt = date('w', strtotime($date));
        $dayInt = (int)$dayInt;

        $monthArray['date'] = $date;
        $monthArray['currentDay'] = $currentDay;
        $monthArray['dayText'] = $dayText;
        $monthArray['dayInt'] = $dayInt;
        $monthArray['week'] = $week;

        // echo $date;
        // echo "\n";
        // echo $dayInt;
        // echo "\n";

        // if ($dayInt === '0') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day1'] = true;
        // } else if ($dayInt === '1') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day2'] = true;
        // } else if ($dayInt === '2') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day3'] = true;
        // } else if ($dayInt === '3') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day4'] = true;
        // } else if ($dayInt === '4') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day5'] = true;
        // } else if ($dayInt === '5') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day6'] = true;
        // } else if ($dayInt === '6') {
        //     // echo $dayInt;
        //     // echo "\n";
        //     $monthArray['day7'] = true;
        // }

        if ($week === 1) {
            $monthArray['week1'] = true;
        } else if ($week === 2) {
            $monthArray['week2'] = true;
        } else if ($week === 3) {
            $monthArray['week3'] = true;
        } else if ($week === 4) {
            $monthArray['week4'] = true;
        } else if ($week === 5) {
            $monthArray['week5'] = true;
        }

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
//$month = 10;
//$year = 2015;

$json = build_calendar($month,$year,$dateArray);

file_put_contents('dateList.json', json_encode($json));
echo json_encode($json);

?>