<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to = "a.deepak.2000@gmail.com";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "<h2>Contact Form Submission</h2>
             <p>Name: $name</p>
             <p>Email: $email</p>
             <p>Subject: $subject</p>
             <p>Message: $message</p>";

    mail($to, $subject, $body, $headers);

    header("Location: index.html");
    exit;
?>