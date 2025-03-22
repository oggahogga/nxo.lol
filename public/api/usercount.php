<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$countFile = 'usercount.txt';
$count = (file_exists($countFile)) ? (int)file_get_contents($countFile) : 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $count = isset($_POST['count']) ? (int)$_POST['count'] : $count;
    file_put_contents($countFile, $count);
}

echo json_encode(['online_users' => $count]);
?>
