<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $adress = 'rean.krasmed@mail.ru';
    $subject = 'Cъемка с квадрокоптера';
    $name = $_POST['name'] ? $_POST['name'] : 'Аноним';
    $phone = $_POST['phone'] ? $_POST['phone'] : 'не указан';
    $email = $_POST['e-mail'] ? $_POST['e-mail'] : 'не указан';
    $orderType = $_POST['price'] ? $_POST['price'] : '???';
    $message = $name  . ' просит связаться с ним. Телефон:' . $phone . ' e-mail: '. $email .' инетересует заказ стоимотью '. $orderType .' рублей.';

    $result = mail($adress, $subject, $message);

    if ($result) {
        echo ('сообщение отправленно');
    } else {
        echo ('сообщение не отправленно');
    }

} else {
    require_once('MainPage.php');
}