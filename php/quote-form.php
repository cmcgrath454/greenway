<?php
echo ("Test");
if (false) {

    $form_data = array(
        $name => $_POST['name'],
        $email => $_POST['email'],
        $phone => $_POST['phone'],
        $address => $_POST['address'],
        $city => $_POST['city'],
        $state => $_POST['state'],
        $zip => $_POST['zip'],
        $type => get_checkbox_as_string($_POST['type']),
        $style => get_checkbox_as_string($_POST['style']),
        $is_new => $_POST['isnewhome'],
        $builder => $_POST['builder'],
        $desc => $_POST['description'],
        $budget => $_POST['budget'],
        $start_date => $_POST['date'],
        $comments => $_POST['comments']
    );

    // $is_new_bool = $_POST['isnewhome'];
    // if ($is_new_bool) {
    //     $is_new = "Yes";
    // } else {
    //     $is_new = "No";
    // }



    // $token = $_POST['token-response'];
    // $ipaddress = $_SERVER['REMOTE_ADDR'];
    // $secret = "6LfefK8gAAAAABiGxmd3Y6IRuKuwIlTllZ-Y1_Zx";

    // $data = array('secret' => $secret, 'response' => $token, 'remoteip' => $ipaddress);
    // $options = array(
    //     'http' => array(
    //         'header' => "Content-type: application/x-www-form-urlencoded\r\n",
    //         'method' => 'POST',
    //         'content' => http_build_query($data),
    //     ),
    // );

    // $context = stream_context_create($options);
    // $verify_response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    // $response_data = json_decode($verify_response, true);
    $valid = true;

    // if ($response_data['success'] && $response_data > 0.4) {
    //     $valid = true;
    // } else {
    //     $valid = false;
    // }

    if ($valid) {
        $to = 'greenway_grounds@yahoo.com';
        $server_email = 'paul@greenwayyard.com';
        $subject = 'Website Quote Request:';
        $subject .= $fname;
        $subject .= " ";
        $subject .= $lname;
        $addl_headers = ['From' => $server_email, 'Content-type' => 'text/html; charset=iso-8859-1'];
        $body = build_email_body($form_data);

        // if (mail($to, $subject, $body, $addl_headers)) {
        if (true) {
            // mail('cmcgrath454@gmail.com', $subject, $body, $addl_headers);
            echo ($body);
            // echo
            // '
            //         <script>
            //             window.onload = function() {
            //                 alert("Thank you for contacting us. We will be in touch soon!");
            //                 location.href = "index";
            //             }
            //         </script>
            //     ';
        } else {
            echo
            '
                    <script>
                        window.onload = function() {
                            alert("There was an error processing your form. Please try again");
                            location.href = "contact";
                        }
                    </script>
                ';
        }
    } else {
        echo
        '
                    <script>
                        window.onload = function() {
                            alert("Our system has identified this as spam. If this isn\'t the case, we apologize and ask that you please email us directly at greenway_grounds@yahoo.com.");
                            location.href = "contact";
                        }
                    </script>
                ';
    }
}

function build_email_body($details)
{
    $content = [
        "<tr><td>Name</td><td>{$details["name"]}</td>",
        // "<tr><td>Email</td><td>{$email}",
        // "<tr><td>Phone</td><td>{$phone}",
        // "<tr><td>Address</td><td>{$address} {$city}, {$state} {$zip}",
        // "<tr><td>Type</td><td>{$type}",
        // "<tr><td>Style</td><td>{$style}",
        // "<tr><td>New Construction</td><td>{$is_new}",
        // "<tr><td>Builder</td><td>{$builder}",
        // "<tr><td>Description</td><td>{$desc}",
        // "<tr><td>Budget</td><td>{$budget}",
        // "<tr><td>Start Date</td><td>{$start_date}",
        // "<tr><td>Comments</td><td>{$comments}",
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