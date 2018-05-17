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
if ($name == NULL)
        die('Нет имени!');

if (isset($_POST['phone'])) {
        $phone = $_POST['phone'];
        $phone = filterData($phone);
}
if ($phone == NULL)
        die('Нет телефона!');



// $mail_address[] = "101-112@mail.ru";  // Заказчик
$mail_address[] = "is@pf27.ru"; //pf27
$mail_address[] = "az@pf27.ru";

$subject = 'Пробное занаятие';
$message .= "<p>Имя: " . $name . "</p><p>Телефон: " . $phone . "</p>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: <robot@baby-club.ru>\r\n";

foreach ($mail_address as $key => $address) {
        mail($address, $subject, $message, $headers);
}