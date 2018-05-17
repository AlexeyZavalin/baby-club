<?php
header("Content-Type: text/html; charset=utf-8");

function filterData($data)
{
        $data = trim($data);
        if (empty($data))
                return NULL;
        if ($data)
                if (gettype($data) != "string")
                        return NULL;
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        $data = addslashes($data);
        return $data;
}

if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $name = filterData($name);
}

if (isset($_POST['phone'])) {
        $phone = $_POST['phone'];
        $phone = filterData($phone);
}
if ($phone == NULL)
        die('Нет телефона!');

if (isset($_POST['club'])) {
    $club = $_POST['club'];
    $club = filterData($club);
}

if (isset($_POST['age'])) {
    $age = $_POST['age'];
    $age = filterData($age);
}



// $mail_address[] = "101-112@mail.ru";  // Заказчик
$mail_address[] = "is@pf27.ru"; //pf27
$mail_address[] = "az@pf27.ru";

$subject = 'Запись';
$message .= "<p>Имя: " . $name . "</p><p>Телефон: " . $phone . "</p><p>Клуб: " . $club . "</p><p>Возраст ребенка: " . $age . "</p>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: <robot@baby-club.ru>\r\n";

foreach ($mail_address as $key => $address) {
        mail($address, $subject, $message, $headers);
}