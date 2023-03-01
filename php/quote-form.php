<?php

require(__DIR__.'/../vendor/phpmailer/phpmailer/src/Exception.php');
require(__DIR__.'/../vendor/phpmailer/phpmailer/src/PHPMailer.php');
require(__DIR__.'/../vendor/phpmailer/phpmailer/src/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$form_data = array(
    'name' => $_POST['name'],
    'phone' => $_POST['phone'],
    'email' => $_POST['email'],
    'address' => $_POST['address'],
    'city' => $_POST['city'],
    'state' => $_POST['state'],
    'zip' => $_POST['zip'],
    'type' => '',
    'style' => '',
    'is_new' => $_POST['is_new'],
    'builder' => $_POST['builder'],
    'desc' => $_POST['description'],
    'budget' => $_POST['budget'],
    'start_date' => $_POST['date'],
    'comments' => $_POST['comments']
);

echo(print_r($form_data));

if (isset($_POST['type']))
    $form_data['type'] = get_checkbox_as_string($_POST['type']);
if (isset($_POST['style']))
    $form_data['style'] = get_checkbox_as_string($_POST['style']);

$token = $_POST['token-response'];
$ipaddress = $_SERVER['REMOTE_ADDR'];
$secret = "6LfuSRskAAAAABCcbfA5yT30wnZy_UHsz8UC-FDk";

$data = array('secret' => $secret, 'response' => $token, 'remoteip' => $ipaddress);
$options = array(
    'http' => array(
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data),
    ),
);

$context = stream_context_create($options);
$verify_response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
$response_data = json_decode($verify_response, true);

$valid = true;

if ($response_data['success'] && $response_data > 0.4) {
    $valid = true;
} else {
    $valid = false;
}

if ($valid) {
    // passing true in constructor enables exceptions in PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = false; // for detailed debug output
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->Username = 'cmcgrath@greenwayyard.com';
        $mail->Password = 'nqniltozuxzasnbh';

        // Sender and recipient settings
        $mail->setFrom('cmcgrath@greenwayyard.com', 'Website Quote Form');
        $mail->addAddress('info@greenwayyard.com', 'Greenway Yard');
        $mail->addReplyTo($form_data['email'], $form_data['name']); // to set the reply to

        // Setting the email content
        $mail->IsHTML(true);
        $mail->Subject = "Website Quote Request";
        $mail->Body = build_email_body($form_data);

        $mail->send();
        echo
            '
                <script>
                    window.onload = function() {
                        alert("Thank you for contacting us. We will be in touch soon!");
                        location.href = "/";
                    }
                </script>
            ';
    } catch (Exception $e) {
        error_log($mail->ErrorInfo);
        echo
            '
            <script>
                window.onload = function() {
                    alert("We\'re sorry, there was an error processing your form. Please try again and if the issue persists, please email us directly at info@greenwayyard.com.");
                    location.href = "/contact";
                }
            </script>
            ';
    }
} else {
    // Recaptcha Not Verified
    error_log(print_r($response_data));
    echo
        '
        <script>
            window.onload = function() {
                alert("Google Recaptcha has identified this as spam. If this isn\'t the case, we apologize and ask that you please email us directly at info@greenwayyard.com.");
                location.href = "/contact";
            }
        </script>
        ';
}



function build_email_body($details)
{
    $content = [
        "<tr><td>Name</td><td>{$details["name"]}</td>",
        "<tr><td>Email</td><td>{$details['email']}",
        "<tr><td>Phone</td><td>{$details['phone']}",
        "<tr><td>Address</td><td>{$details['address']} {$details['city']}, {$details['state']} {$details['zip']}",
        "<tr><td>Type</td><td>{$details['type']}",
        "<tr><td>Style</td><td>{$details['style']}",
        "<tr><td>New Construction</td><td>{$details['is_new']}",
        "<tr><td>Builder</td><td>{$details['builder']}",
        "<tr><td>Description</td><td>{$details['desc']}",
        "<tr><td>Budget</td><td>{$details['budget']}",
        "<tr><td>Start Date</td><td>{$details['start_date']}",
        "<tr><td>Comments</td><td>{$details['comments']}",
    ];
    $body = '<html><body>';
    $body .= '<table rules="all" style="border-color: black;" cellpadding="10">';
    $body .= join("<br>", $content);
    $body .= '</table>';
    $body .= '</body></html>';
    $body = wordwrap($body, 70, "\r\n");
    return $body;
}

function get_checkbox_as_string($checkbox_arr)
{
    $arr = array();
    if (!empty($checkbox_arr)) {
        foreach ($checkbox_arr as $value) {
            $arr[] = $value;
        }
    }
    return implode(", ", $arr);
}